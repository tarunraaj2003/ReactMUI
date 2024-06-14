var express=require("express");

var studentController=require("../src/student/studentController");
const router=express.Router();

router.route('/student/login').post(studentController.loginStudentControllerFn);
router.route('/student/create').post(studentController.createStudentControllerFn);

module.exports=router