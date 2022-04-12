import React,{ useState } from "react";
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { addUser } from "../Service/api";
import { validName, validuserName, validEmail, validPhone } from "../constant/regEx";

const initialValue = {
    name: '',
    username: '',
    email : '',
    phone : ''
}
const initialIsValidValue = {
    isname: '',
    isusername: '',
    isemail: '',
    isphone: ''
}

const useStyles = makeStyles({
    container: {
        width: '30%',
        margin: '5% 0 0 60%',
        '& > *': {
            marginTop: 20
        }
    }
})

const AddUser = () =>{

    const [user, setUser] = useState(initialValue)
    const {name,username,email,phone}= user;

    const [isValid,setIsValid] = useState(initialIsValidValue);
    const {isname,isusername, isemail,isphone} = isValid;

    const classes = useStyles();
    

    const validationMessageCSS = {color:'red',marginBottom:'20px'}

    let history = useHistory();

    const onValueChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    const onValidate = (e,regEx)=>{
        const RegExobj=new RegExp(regEx);
        const isValidKey='is'+e.target.name;   

        if(e.target.value==="" || RegExobj.test(e.target.value))
        {
            setIsValid({...isValid,[isValidKey]:''})
            setUser({...user,[e.target.name]:e.target.value});
        }
        else{
            setIsValid({...isValid,[isValidKey]:'Invalid input..!!'});
            
        }
    }

    var flag=true;
    const validateDetailsFlag = Object.values(isValid).every(value => {
        if (value!==null && value!=='') {
            flag=false;
        }
        return flag;
    });

    function validateDetails(){
        if(validateDetailsFlag)
        {
            
        }
        else{
            alert("Invalid input..!!");
        }
    }
    
    
    

    const addUserDetails = async()=>{
       
        await addUser(user);
        
        history.push('./all');

        
    }


    return(
        <FormGroup className={classes.container}>
            <Typography variant="h4">Add User</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} onBlur={(e) => onValidate(e,validName)}   name='name' value={name} id="my-input" />
                <div style={validationMessageCSS}>{isname}</div>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Username</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='username' value={username} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Phone</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='phone' value={phone} id="my-input" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" disabled={name.length===0 || username.length===0 || email.length===0 || phone.length===0} onClick={() => addUserDetails()}>Add User</Button>
            </FormControl>
        </FormGroup>
    )
}
export default AddUser;