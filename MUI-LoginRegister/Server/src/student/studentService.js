var studentModel=require("./studentModel");
var key='123456789trytryrtyr';
var encryptor=require("simple-encryptor")(key);

module.exports.createStudentDBService=async (studentDetails)=>{
    return new Promise(async function myFn(resolve,reject){
        var studentModelData=new studentModel();

        studentModelData.firstname=studentDetails.firstname;
        studentModelData.lastname=studentDetails.lastname;

        var check=await studentModel.findOne({email:studentDetails.email});
        if(!check)
        {
        studentModelData.email=studentDetails.email;
        }
        studentModelData.password=studentDetails.password;
        var encrypted=encryptor.encrypt(studentDetails.password);
        studentModelData.password=encrypted;

        studentModelData.address=studentDetails.address;
        studentModelData.mobile=studentDetails.mobile;
        

        studentModelData.save().then(res=>{
            if(res){resolve(true)}
        })
        .catch(err=>{if(err){reject(false)}});
    });
}

module.exports.loginuserDBService=(studentDetails)=>{   
    return new Promise(function myFn(resolve,reject){
        studentModel.findOne({email:studentDetails.email}).then(res=>{
            if(res!=null)
            {
                var decrypted=encryptor.decrypt(res.password);
                if(decrypted==studentDetails.password)
                {
                    const token = res.generateAuthToken();
                    resolve({data:token,msg:"Student validated successfully"})
                }
                else{
                    reject({msg:"Invalid Email or password"})
                }
            }
            else{
                reject({msg:"Invalid Email or password"})
            }
        }) 
})
}