const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./db/connectdb");
const app = express();
// User Collection
const usersRoutes = require("./routes/findalluser");
// Menu Collection
const MenuRoutes = require("./routes/menuroutes");
const applyMiddlewares = require("./middlewares/applymiddlewares");
// authentication for generate token
// Cart Collection
const CartRoutes = require("./routes/cart/cartroutes")
const authentication = require("./routes/Authentication/authentication")
// middlewares
applyMiddlewares(app)

// User Routes
app.use(usersRoutes);
// Menu Routes
app.use(MenuRoutes);
// make a token for user
app.use(authentication)
// Cart Collection Routes
app.use(CartRoutes)

// Check the Server Is Up or Down
app.get("/health", (req, res) => {
  res.send("Bistro Boss is Serving Well");
});
// Global Routes
app.all("*", (req, res, next) => {
  const error = new Error(`The Requested URL is not valid: [${req.url}]`);
  error.status = 404;
  next(error);
});
// Error Handler Api
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});
// Connection To Database Function
const main = async () => {
  // Connecting to Database using ConnectDB Function
  console.log("Connecting To Database");
  await connectDB();
  app.listen(port, () => {
    console.log(`Bistro Boss Is Running On Port ${port}`);
  });
};

main();
