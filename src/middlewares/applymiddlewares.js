const cors = require("cors");
const express = require("express");

const applyMiddlewares = (app)=>{
    app.use(cors({
        origin:[process.env.LOCAL_CLIENT,process.env.CLIENT],
        credentials:true,
    }))
    app.use(express.json());
}

module.exports = applyMiddlewares;