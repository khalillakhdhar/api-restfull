const db=require("../config")
const Users=db.users;
exports.create=(req,res) =>
{
    if(!req.body.firstName || !req.body.lastName)
    {
        res.status(400).send({message:"nom et prénom obligatoire"});
        return;
    }
    const user=new Users({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        job:req.body.job,
        age:req.body.age,
        password:req.body.password,


    });
    user
    .save(user)
    .then((data)=>{
        res.send(data);
    }
    )
    .catch((err) => 
    res.status(500).send({
        message: err.message || "error while adding",
    }))
};
exports.findAll = (req, res) => {
    const firstName = req.query.firstName;
    var condition = firstName
      ? { firstName: { $regex: new RegExp(firstName), $options: "i" } }
      : {};
    Users.find(condition)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving users.",
        });
      });
  };
  
