import React from "react";
import { Grid, Paper, Avatar, Typography, TextField, Button } from "@mui/material";
import * as Yup from "yup";
import {Formik,Form,Field,ErrorMessage} from "formik";
import Message from "./Message";
import axios from 'axios';
import {Link} from "react-router-dom"
import "./form.css"

const initialValues={
    fname:"",lname:"",email:"",password:"",address:"",mobile:""
}

const validationSchema= Yup.object({
    fname:Yup.string()
    .required("Required!")
    .matches(/^[aA-zZ\s]+$/,"Only alphabets are allowed"),
    lname:Yup.string()
    .required("Required!")
    .matches(/^[aA-zZ\s]+$/,"Only alphabets are allowed"),
    email:Yup.string()
    .required("Required!")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,"Invalid email format"),
    password:Yup.string()
    .required("Required!"),
    address:Yup.string()
    .required("Required!"),
    mobile:Yup.string()
    .required("Required!")
    .min(10,"Invalid Number!")
    .max(10,"Invalid Nummber!")
    .matches(/^\d+$/,"Only digits are allowed"),
})

async function onSubmit(values){
    try{
        await axios.post("http://localhost:7000/student/create",{
            firstname:values.fname,
            lastname:values.lname,
            email:values.email,
            password:values.password,
            address:values.address,
            mobile:values.mobile
        }).then((res)=>{
            console.log(res.data)
            const status=res.data.status;
            if(status===true)
            {
                alert("Student Registration Successfully");
            }
            else{
                alert("Email already exists")
            }
        });
        
    } catch(err){
        alert(err.message)
    }
}

const Signup = () => {
    const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: "green" }
    const btnstyle = { margin: "8px 0" }
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>

                    </Avatar>

                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant="caption">Please fill this form to create an account!</Typography>
                    <br></br><br></br>
                </Grid>
                <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
            <Form>
                    <Field
                    as={TextField}
                    fullWidth 
                    name="fname"
                    label="First Name" 
                    placeholder="Enter first name"
                    helperText={<ErrorMessage name="fname" component={Message}/>}
                     />
                    <br></br><br></br>
                    <Field
                    as={TextField}
                    fullWidth 
                    name="lname"
                    label="Last Name" 
                    placeholder="Enter last name" 
                    helperText={<ErrorMessage name="lname" component={Message}/>}
                    />
                    <br></br><br></br>
                    <Field
                    as={TextField}
                    fullWidth 
                    name="email"
                    label="Email" 
                    placeholder="Enter email" 
                    helperText={<ErrorMessage name="email" component={Message}/>}
                    />
                    <br></br><br></br>
                    <Field
                    as={TextField} 
                    fullWidth 
                    label="Password" 
                    name="password"
                    placeholder="Enter password" 
                    helperText={<ErrorMessage name="password" component={Message}/>}
                    />
                    <br></br><br></br>
                    <Field
                    as={TextField} 
                    fullWidth 
                    name="address"
                    label="Address" 
                    placeholder="Enter address" 
                    helperText={<ErrorMessage name="address" component={Message}/>}
                    />
                    <br></br><br></br>
                    <Field
                    as={TextField} 
                    fullWidth 
                    name="mobile"
                    label="Mobile" 
                    placeholder="Enter mobile" 
                    helperText={<ErrorMessage name="mobile" component={Message}/>}
                    />
                    <br></br><br></br>
                    <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    style={btnstyle}>Sign Up
                </Button>
                    </Form>    
                </Formik>
                <Typography style={{fontSize:"15px"}}>Already a user?
                    <Link to="/login" style={{textDecoration:"none"}}>
                        Sign In
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Signup;