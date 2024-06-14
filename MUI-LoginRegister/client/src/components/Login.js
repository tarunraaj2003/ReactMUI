import React from "react";
import { Grid, Paper, Avatar, TextField, Button, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock"
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import {Formik,Form,Field,ErrorMessage} from "formik";
import Message from "./Message";

const initialValues = {
    email: "", password: ""
}

const validationSchema = Yup.object({
    email: Yup.string()
        .required("Required!"),
    password: Yup.string()
        .required("Required!"),
})



const Login = () => {
    const navigate = useNavigate();
    async function onSubmit(values) {
        try {
            await axios
                .post("http://localhost:7000/student/login", {
                    email: values.email,
                    password: values.password
                })
                .then(
                    (res) => {
                        console.log(res);
                        const data = res.data;
                        if (data.data) {
                            alert("Login Successfully");
                            navigate("/home");
                            localStorage.setItem("token", data.data);
                        } else {
                            alert("Invalid Email/Password")
                        }
                    },
                    (fail) => {
                        console.error(fail);
                    }
                );
        } catch (err) {
            alert(err);
        }
    }

    const paperStyle = { padding: 20, height: "70vh", width: 260, margin: "65px auto",justifyContent:"center" }
    const avatarStyle = { backgroundColor: "green" }
    const btnstyle = { margin: "8px 0" }
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <LockIcon />
                    </Avatar>
                    <h2>Sign in</h2>
                </Grid>
                <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                >
                    <Form>
                <Field
                as={TextField} 
                label="Email" 
                name="email" 
                placeholder="Enter email" 
                helperText={<ErrorMessage name="email" component={Message}/>}
                fullWidth></Field>
                <br></br><br></br>
                <Field
                as={TextField} 
                label="Password" 
                name="password"
                placeholder="Enter password" 
                type="password" 
                helperText={<ErrorMessage name="password" component={Message}/>}
                fullWidth></Field>
                <br></br><br></br>
                <Button type="submit" variant="contained" color="primary" fullWidth
                    style={btnstyle}>Sign in
                </Button>
                    </Form>
                </Formik>
                <Typography>Do you have an account?
                    <Link to="/" style={{textDecoration:"none"}}>
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login;