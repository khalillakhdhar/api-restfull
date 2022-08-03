const db=require("../config")
const Users=db.users;
function validateName(name)
{
    var nameRegex = /^[a-zA-Z\-]+$/;
    var validfirstUsername  =name.match(nameRegex);
    if(validfirstUsername  == null){
        console.log("Your first name is not valid. Only characters A-Z, a-z and '-' are  acceptable.");
        return false;
}
else
{
    console.log("Your first name is  valid");

    return true;
}
}
function validateAge(age)
{
    const ag=age.parseInt();
    if(ag>20)
    console.log("correcte");
    else
    console.log("incorrecte");
}
function validatemail(email)
{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var mailvalid= email.match(mailformat)
    if(mailvalid == null)
    {
        console.log("mail malformated values missing @ or misplaced characters");
        return false;
    }
    else
    {
        console.log("valid email ");
        return true;
    }
}
function validateJob(job)
{
const jobList=['ingénieur','technicien', 'admin'];
if(jobList.includes(job))
{
    console.log("good job");
    return true;
}
else
{
    console.log("bad job not found");
    return false;
}
}


exports.create=(req,res) =>
{
    if(!req.body.firstName || !req.body.lastName)
    {
        res.status(400).send({message:"nom et prénom obligatoire"});
        return;
    }
   else if( !validateName(req.body.firstName) || !validateName(req.body.lastName))
    {
        res.status(400).send({message:"nom et prénom doivent être uniquement des caractéres!"});
        return;
    }
   else if( !validateJob(req.body.job))
    {
        res.status(400).send({message:"le métier doit être correcte!"});
        return;
    }
   else if(!validatemail(req.body.email))
    {
        res.status(400).send({message:"le mail doit être valide!"});
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
  
