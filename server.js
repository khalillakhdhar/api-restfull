const express =require('express')
const cors= require('cors')
const app = express();
var corsOptions=
{
    origin: "http://localhost:8080"
    //origin: "www.myfront.com"
    // origin: ["s1","s2"]
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true})); // lecture de l'application
//const db=require("./app/config/index");
const db=require("./app/config");
db.mongoose
.connect(db.url,
    
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>
    {console.log("connected to database!");}
    )
    .catch(err=>{
        console.log("connection problem ",err);
        process.exit();
    })





app.get("/",(req, res)=>{
res.send({message:"welcome to the app"})
});
require("./app/routes/users.routes")(app);
const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>
{
    console.log('Server listening on '+PORT);
})