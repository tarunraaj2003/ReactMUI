var studentService=require("./studentService");
var studentModel=require("./studentModel");
const jwt=require("jsonwebtoken");

var createStudentControllerFn=async(req,res)=>{
    try{
        console.log(req.body);
        var status=await studentService.createStudentDBService(req.body);
        console.log(status);
        

        if(status==true){
            res.send({"status":true,"message":"Student created successfully"});
        } else{
            res.send({"status":false,"message":"Error creating user"});
       }
    }
    catch(err){
        console.log(err);
        res.send({"status":false,"message":"Error creating user"});
    }
}


var loginStudentControllerFn=async(req,res)=>{
    var result=null;
    try{
        result=await studentService.loginuserDBService(req.body);
        if(result){
            res.send({"data":result.data,"message":result.msg});
        } else{
            res.send({"message":result.msg});
        }
    } catch(error){
        console.log(error);
        res.send({"message":error.msg});
    }
}

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

module.exports={createStudentControllerFn,loginStudentControllerFn,authenticateToken};