import { useEffect,useState } from "react";
import {faTrash,faEdit} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {Formik,Form,Field,ErrorMessage} from "formik";
import Message from "./Message";
import Box from '@mui/material/Box';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding:5,
    marginLeft:20,
    marginRight:20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding:5,
    marginLeft:20,
    marginRight:20,
    border:"2px solid black"
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:nth-of-type(even)': {
    backgroundColor:"rgb(181, 222, 244)",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
   
  },
}));

function Hom(){
    const navigate=useNavigate();
    const [data,setData]=useState([]);
    const [button,setButton]=useState(false);
    const [fname,setFname]=useState("")
    const [lname,setLname]=useState("")
    const [address,setAddress]=useState("")
    const [mobile,setMobile]=useState("")
    const [userId,setUserId]=useState(null)
    useEffect(()=>{
        getAllUser();
    },[])

    
const validationSchema= Yup.object({
    fname:Yup.string()
    .required("Required!")
    .matches(/^[aA-zZ\s]+$/,"Only alphabets are allowed"),
    lname:Yup.string()
    .required("Required!")
    .matches(/^[aA-zZ\s]+$/,"Only alphabets are allowed"),
    address:Yup.string()
    .required("Required!"),
    mobile:Yup.string()
    .required("Required!")
    .min(10,"Invalid Number!")
    .max(10,"Invalid Nummber!")
    .matches(/^\d+$/,"Only digits are allowed"),
})

    const getAllUser=()=>{
        fetch("http://localhost:7000/users",{
            method:"GET"
        }).then(res=>res.json())
        .then(data=>{
            console.log(data,"userData")
            setData(data.data)
        })
    }
    const logout=()=>{
        localStorage.removeItem("token")
        navigate("/login")
      }

    const deleteUser=(id,fname)=>{
        if(window.confirm(`Are you sure you want to delete ${fname}`)){
            fetch("http://localhost:7000/deleteUser",{
                method:"POST",
                crossDomain:true,
                headers:{
                    "Content-Type":"application/json",
                    Accept:"application/json",
                    "Access-Control-Allow-Origin":"*",
                },
                body:JSON.stringify({
                    userid:id
                }),
            })
            .then(res=>res.json())
            .then(data=>{
                alert(data.data);
                getAllUser();
            });
        }else{

        }
    }

    function selectUser(index){
        setButton(true)
        const item=data[index]
        setFname(item.firstname)
        setLname(item.lastname)
        setAddress(item.address)
        setMobile(item.mobile)
        setUserId(item._id)
    }

    function updateUser(values){
        console.warn(fname,lname,address,mobile,userId)
        fetch(`http://localhost:7000/update/${userId}`,{
            method:"PUT",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                firstname:values.fname,
                lastname:values.lname,
                address:values.address,
                mobile:values.mobile
            })
        }).then((result)=>{
            result.json().then(resp=>{
                console.warn(resp)
                setButton(false)
                getAllUser();
            })
        })
    }
    return(
        <div
        style={{fontFamily:"'Times New Roman', Times, serif",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"}}
        >
        <h1 style={{fontFamily:"Georgia,'Times New Roman', Times, serif",
        color:"rgb(118,221,248)"}}>Users</h1>
      
        <TableContainer component={Paper} sx={{ minWidth: 300}}>
      <Table sx={{ minWidth: 300,height:100}} aria-label="customized table">
        <TableHead sx={{fontFamily:"sans-serif",textTransform:"uppercase"}}>
          <TableRow sx={{border:"2px solid black"}}>
            <StyledTableCell align="center">First Name</StyledTableCell>
            <StyledTableCell align="center">Last Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">Mobile</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ fontFamily:"sans-serif"}}>
          {data.map((i,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center">{i.firstname}</StyledTableCell>
              <StyledTableCell align="center">{i.lastname}</StyledTableCell>
              <StyledTableCell align="center">{i.email}</StyledTableCell>
              <StyledTableCell align="center">{i.address}</StyledTableCell>
              <StyledTableCell align="center">{i.mobile}</StyledTableCell>
              <StyledTableCell align="center"> <FontAwesomeIcon
                            icon={faEdit}
                            onClick={()=>selectUser(index)}
                            /></StyledTableCell>
              <StyledTableCell align="center"><FontAwesomeIcon 
                            icon={faTrash} 
                            onClick={()=>deleteUser(i._id,i.firstname)}/></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
       
        <br></br>
      
        {button?(
              <Box
              sx={{
                width: 220,
                height: 220,
                backgroundColor: 'lightgrey',
                '&:hover': {
                  backgroundColor: 'lightblue',
                  
                },
              }}
            >
        <Formik 
        initialValues={{fname,lname,address,mobile}}
        validationSchema={validationSchema}
        onSubmit={updateUser}
        >
            <Form>
                <div
                style={{ 
                  paddingLeft:"10px",
                  paddingTop:"2px",
                  padding:"10px",
                  textTransform:"capitalize"
                }}
                >
            <label>First name</label>
            <br></br>
                    <Field
                    id="fname"
                    name="fname"
                    placeholder="Enter First name"
                    />
                    <br></br>
                    <ErrorMessage name="fname" component={Message}/>

                    <label>Last name</label>
                    <br></br>
                    <Field
                    id="lname"
                    name="lname"
                    placeholder="Enter Last name"
                    />
                    <br></br>
                    <ErrorMessage name="lname" component={Message}/>

                    <label>Address</label>
                    <br></br>
                    <Field
                    id="address"
                    name="address"
                    placeholder="Enter Address"
                    />
                    <br></br>
                    <ErrorMessage name="address" component={Message}/>

                    <label>Mobile</label>
                    <br></br>
                    <Field
                    id="mobile"
                    name="mobile"
                    placeholder="Enter Mobile Number"
                    />
                    <br></br>
                    <ErrorMessage name="mobile" component={Message}/>
                    <br></br>

                    
                    <button type="submit">Update User</button>
                    &nbsp;&nbsp;
                    <button onClick={() => setButton(false)}>Close</button>
                    </div>

           </Form>     
        </Formik>
        </Box>):""}
       
        
      
       <br></br>
        <div>
        <Button type="submit" variant="contained" color="secondary" fullWidth
        onClick={logout}         
        >
         Logout
        </Button>
        </div>
        </div>
        
    )
}
export default Hom;