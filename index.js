// const express = require("express");
// const app = express();
// const cors = require("cors");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const port = process.env.PORT || 5000;

// app.use(cors({
//   origin:["http://localhost:5173"],
//   credentials: true
// }));
// app.use(express.json());
// // Verify the user
// const tokenVerify = (req, res, next) => {
//   console.log("token from the middleware", req.headers.authorization);
//   if (!req.headers.authorization) {
//     return res.status(401).send({ message: "Unauthorized Access Request" });
//   }
//   const token = req?.headers?.authorization?.split(" ")[1];

//   jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({ message: "Unauthorized access Detected" });
//     }
//     req.user = decoded;
//     next();
//   });
// };

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t245pno.mongodb.net/?retryWrites=true&w=majority`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     await client.connect();
//     const menuCollection = client.db("BistroBoss").collection("menu");
//     const cartCollection = client.db("BistroBoss").collection("carts");
//     const userCollection = client.db("BistroBoss").collection("users");
//     // Check user is admin or not
//     app.get("/user/admin/:email", tokenVerify, async (req, res) => {
//       const email = req.params.email;
//       if (email !== req.user?.email) {
//         return res.status(403).send("Forbidden access");
//       }
//       const query = { email: email };
//       const user = await userCollection.findOne(query);
//       let isadmin = false;
//       if (user) {
//         isadmin = user?.role === "Admin";
//       }
//       res.send({ isadmin });
//     });
//     // get the menu food list
//     app.get("/menu", async (req, res) => {
//       try {
//         const result = await menuCollection.find().toArray();
//         res.send(result);
//       } catch (error) {
//         console.log(error);
//       }
//     });

//     // get the food list on cart of logged in user..
//     app.get("/carts", async (req, res) => {
//       try {
//         const email = req.query.email;
//         const query = { userEmail: email };
//         const result = await cartCollection.find(query).toArray();
//         res.send(result);
//       } catch (error) {
//         console.log(error);
//       }
//     });
//     // verrify admin
//     const verifyAdmin = async (req, res, next) => {
//       try {
//         const email = req.user?.email;
//         const query = { email: email };
//         const user = await userCollection.findOne(query);
//         const isAdmin = user?.role === "Admin";
//         if (!isAdmin) {
//           return res.status(403).send({ message: "Forbidded Access" });
//         }
//         next();
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     // get users list for admin
//     app.get("/users", tokenVerify, verifyAdmin, async (req, res) => {
//       try {
//         const result = await userCollection.find().toArray();
//         res.send(result);
//       } catch (error) {
//         console.log(error);
//       }
//     });

//     // Add Item To menu
//     app.post("/menu", async (req, res) => {
//       try {
//         const item = req.body;
//         const result = await menuCollection.insertOne(item);
//         res.send(result);
//       } catch (error) {
//         console.log(error);
//       }
//     });

//     // make a token for successfully user login
//     app.post("/user/accessToken", async (req, res) => {
//       try {
//         const user = req.body;
//         const token = jwt.sign(user, process.env.TOKEN_SECRET, {
//           expiresIn: "1h",
//         });
//         console.log(req.body, token);
//         res.send({ token });
//       } catch (error) {
//         console.log(error);
//       }
//     });

//     // add food to cart..
//     app.post("/carts", async (req, res) => {
//       try {
//         const cartdata = req.body;
//         console.log(req.body);
//         const result = await cartCollection.insertOne(cartdata);
//         res.send(result);
//       } catch (error) {
//         console.log(error);
//       }
//     });

//     // add user to database after third party sign in or email signUP
//     app.post("/users", async (req, res) => {
//       try {
//         const userData = req.body;
//         console.log(userData);
//         const email = req.query.email;
//         const query = { email: email };
//         const existUser = await userCollection.findOne(query);
//         console.log(existUser);
//         console.log(email);
//         if (existUser) {
//           return res.send({ message: "user Already Exist" });
//         }
//         console.log(req.body);
//         const result = await userCollection.insertOne(userData);
//         res.send(result);
//       } catch (error) {
//         console.log(error);
//       }
//     });

//     // make a user admin
//     app.patch("/user/admin/:id", async (req, res) => {
//       try {
//         const id = req.params.id;
//         const query = { _id: new ObjectId(id) };
//         const updaterole = {
//           $set: {
//             role: "Admin",
//           },
//         };
//         const result = await userCollection.updateOne(query, updaterole);
//         res.send(result);
//       } catch (error) {
//         console.log(error);
//       }
//     });
//     // delete an item from user cart
//     app.delete("/carts/:id", async (req, res) => {
//       try {
//         const id = req.params.id;
//         const query = { _id: new ObjectId(id) };
//         const result = await cartCollection.deleteOne(query);
//         res.send(result);
//       } catch (error) {
//         console.log(error);
//       }
//     });
//     // Delete a menu item if admin
//     app.delete("/menu/:id", async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const result = await menuCollection.deleteOne(query);
//       res.send(result);
//     });
//     // delete a user if a admin want
//     app.delete("/users/:id", verifyAdmin, async (req, res) => {
//       try {
//         const id = req.params.id;
//         const query = { _id: new ObjectId(id) };
//         const result = await userCollection.deleteOne(query);
//         res.send(result);
//       } catch (error) {
//         console.log(error);
//       }
//     });

//     // Admin Stats
//     app.get("/admin-stats", tokenVerify, verifyAdmin, async (req, res) => {
//       const users = await userCollection.estimatedDocumentCount();
//       const menuitem = await menuCollection.estimatedDocumentCount();
//       const orders = await menuCollection.estimatedDocumentCount();
//       const result = await menuCollection
//         .aggregate([
//           {
//             $group: {
//               _id: null,
//               Revenue: {
//                 $sum: "$price",
//               },
//             },
//           },
//         ])
//         .toArray();
//       const TotalRevenue = result.length > 0 ? result[0].Revenue : 0;
//       res.send({
//         users,
//         menuitem,
//         orders,
//         TotalRevenue,
//       });
//     });
//     app.post("/create-payment-intent", async (req, res) => {
//       const { price } = req.body;
//       console.log(price);
//       const amount = parseInt(price * 100);
//       const paymentIntent  = await stripe.paymentIntents.create({
//         amount:amount,
//         currency:'usd',
//         payment_method_types:["card"]
//       })
//       res.send({
//         clientSecret :paymentIntent.client_secret
//       })
//     });

//     // Send a ping to confirm a successful connection
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//   }
// }
// run().catch(console.dir);

// app.get("/", (req, res) => {
//   res.send("Bistro Boss Is Setting!");
// });

// app.listen(port, () => {
//   console.log(`Bistro Boss Eating In Port ${port}`);
// });
