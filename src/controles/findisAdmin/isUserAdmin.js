const User = require("../../models/users");

const isUserAdmin = async(req,res)=>{
    const email = req.params.email;
    //   if (email !== req.user?.email) {
    //     return res.status(403).send("Forbidden access");
    //   }
      const query = { email: email };
      const user = await User.findOne(query);
      let isadmin = false;
      if (user) {
        isadmin = user?.role === "Admin";
      }
      res.send({ isadmin });
}


module.exports = isUserAdmin;