import { useState } from "react";
import { Link } from "react-router-dom";
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import pic from '../../Images/defaultpic1.jpg'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { ToastContainer, toast } from 'react-toastify';
import {User} from '../../Interfaces/Interface'
import { SignUpUser } from "../../Services/Api";
import "./signup.css"

const initialValues={
    userName: "",
    email: "",
    mobileNo:"",
    password: "",
    profile:""
}

const validationSchema=Yup.object({
    userName:Yup.string().required('Name Requried!!!')
              .min(3,"User Name must be Greter than 3 Charecter"),
	email:Yup.string().email('Invalide email Formate').required('Email Requried!!!'),
	mobileNo: Yup.string().matches(/^[0-9]{10}$/,"Enter Valid Mobile Number").required("Mobile Number Required"),
	password:Yup.string().required('Password Requried!!!')
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,"Password should be.. Ex.Abcd@123")

})

const SignUp = () => {


    const [error, setError] = useState<String>("");
	const [msg, setMsg] = useState<String>("");
    const [img,setImg]=useState<string>()

    const handleSubmit = async(data:User)=>{
        try {
            data.profile=img?img:""
			setError("")
			const { data: res } = await SignUpUser(data);
			setMsg(res.message);
			console.log(res.message)
			toast.success("User Account is Created Please Verify mail and Sign In",{position: "top-center"})
           
			
		} catch (error:any) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
                
			}
		}
		 
    }

    const profile=(data:any)=>{
		setImg(data)
	}

  return (
    <>
    <div className={"signup_container"}>
			<div className={"signup_form_container"}>
				<div className={"left-Sign"}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={"white_btn-Sign"}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={"right-Sign"}>
				<h1>Create Account</h1>
					<Formik initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={(e)=>handleSubmit(e)}>
						<Form>
                        <div className="upload">
							<img src={img?img:pic} width='100px' height = '100px'></img>
						<div className="round">
						<input
							type="file"
							onChange={(e:React.SyntheticEvent<EventTarget>) => {
                                const file = (e.target as HTMLFormElement).files[0];
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = function () {
                                    const image=reader.result
                                    profile(reader.result as ArrayBuffer)
                                };
                                reader.onerror = function (error) {
                                    console.log(error);
                                };
                        }}/>  
							<CameraAltIcon />
							
						</div>
							</div>
							
							<div>
								< Field type="text"
										placeholder="User Name" 
										id="userName" 
										name="userName"
										className="input-Sign"
										/>
							</div>
                            <div className="errorMsg">
								<ErrorMessage  name='userName' />

                            </div>
							<div>
								<Field  type="text"
									placeholder="Email "
									id="email"
									name="email"
									className="input-Sign"/>
							</div>
                            <div className="errorMsg">
                                <ErrorMessage name='email'/>
                            </div>
							<div>
								< Field type="text"
											placeholder="Mobile Number" 
											id="mobileNo" 
											name="mobileNo"
											className="input-Sign"
											/>
							</div>
                            <div className="errorMsg">
								<ErrorMessage name='mobileNo'/>
                            </div>
							<div>
								<Field  type="password"
								placeholder="Password"
								id="password"
								name="password"
								className="input-Sign"/>
							</div>
                            <div className="errorMsg">
								<ErrorMessage name='password'/>
                            </div>
							
							
							{error && <div className={"error_msg-Sign"}>{error}</div>}
							{msg && <div className={"success_msg-Sign"}>{msg}</div>}
							<div>
								<button type="submit" className="green_btn-Sign">
								Sign Up
								</button>
							</div>
						</Form>
					</Formik>
				</div>
			</div>
		</div>
		<ToastContainer/>
		</>
  )
}

export default SignUp