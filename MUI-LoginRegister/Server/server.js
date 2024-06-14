const express=require("express");
const app=express();
const mongoose=require("mongoose");
var routes=require("./route/routes");
const cors=require("cors");
const jwt=require("jsonwebtoken")
const loginModel=require("./src/student/studentModel");
require("dotenv").config();
app.use(express.json());
app.use(cors(
    {
        origin:"http://localhost:3000"
    }
));


mongoose.connect("mongodb://localhost:27017/form").then(res=>{console.log("Connected to Mongodb")});

const authenticateToken=(req,res,next)=>{
    const authHeader=req.headers["authorization"];
    const token =authHeader && authHeader.split(' ')[1];
    if(!token) return res.sendStatus(401);


    jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
        if(err){
            return res.sendStatus(403);
        }
        req.user=user;
        next();
    })
}

app.get('/posts',authenticateToken,(req,res)=>{
    console.log(req.user.firstname);
    console.log(req.user.lastname);
    console.log(req.user.email);
    console.log(req.user.address);
    console.log(req.user.mobile);
    res.json({"firstname":req.user.firstname,"lastname":req.user.lastname,
    "email":req.user.email,"address":req.user.address,"mobile":req.user.mobile});
})

app.put('/update/:id',(req, res) => {
    let data = {
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      address:req.body.address,
      mobile:req.body.mobile
    };
    console.log(req.params.id);
    // console.log(req.user._id);
    // if(req.params.id!=req.user._id){
    //     return res.json("User not authorized");
    // }
    loginModel.updateOne({_id: req.params.id}, data ).then(
      () => {
        res.status(201).json({
          message: 'Data updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

  app.delete('/delete/:email', authenticateToken,(req, res) => {
    console.log(req.params.email);
    console.log(req.user.email);
    if(req.params.email!=req.user.email){
        return res.json("User not authorized");
    }
    loginModel.deleteOne({email: req.params.email}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

app.get("/users",async(req,res)=>{
  try{
    const allUser=await loginModel.find({});
    res.send({status:"ok",data:allUser})
  }catch(error){
    console.log(error)
  }
})

app.post("/deleteUser",async(req,res)=>{
  const userid=req.body.userid;
  try{
    loginModel.deleteOne({_id:userid}).then(
      ()=>{res.send({status:"ok",data:"Deleted"})
    })
  }
  catch(error){
    console.log(error)
  }
})


app.listen(7000,function check(err)
{
    if(err)
    console.log("error")
    else
    console.log("started")
})


app.use(routes);

module.exports={authenticateToken}

