module.exports=app=>{
    const users=require('../controllers/users.controller.js')
    var router=require('express').Router();
    router.get("/",users.findAll);
    router.post("/",users.create);
    app.use("/users",router);
}