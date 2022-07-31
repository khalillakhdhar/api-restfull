module.exports=mongoose=>
{
    var schema = mongoose.Schema(
        {
            firstName:String,
            lastName:String,
            email:String,
            age:Number,
            password:String,
        },
        {timestamp:true}
    );
schema.method("toJSON",function()
{
    const {__v,_id , ...object}=this.toObject();
    object.id=_id;
    return object;
    // detruire les objets aprés leur création
});
const User=mongoose.model("user",schema);
return User;
    }


