import { useState } from "react";
import axios from "axios";
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { useNavigate, Link } from "react-router-dom";
import { LogInField } from '../../Interfaces/Interface';
import "./login.css"

const initialValues={
    email: "",
    password: ""
}

const validationSchema=Yup.object({
	email:Yup.string().email('Invalide email Formate').required('Email Requried!'),
	password:Yup.string().required('Password Requried!!!')
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,"Minimum 5 characters, Include 1 letter 1 number & 1 special character:")

}) 

const Login = () => {

	const navigate= useNavigate()
	const [error, setError] = useState("");
	// const User : SignUp[]
	
	const handleSubmit = async (data:LogInField) => {
		
		try {
			const url = "http://localhost:8080/api/auth/login";
			const { data: res } = await axios.post(url,data);
			localStorage.setItem("token", res.data);
			localStorage.setItem("profile", res.profile);
			localStorage.setItem("userId",res.userId)
			// window.location = "/";
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

return (
    <div className={"login_container"}>
        <div className={"login_form_container"}>
            <div className={"left"}>
                <h1 >Login to Your Account</h1>
                <Formik initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}>
                    <Form>
                        <div>
                            <Field  type="text"
                                placeholder="Email "
                                id="email"
                                name="email"
                                className="input"/>

                        </div>
							<div className="errorMsg">
                                <ErrorMessage name='email'/>
                            </div>
                        <div>
                            <Field  type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                            className="input"/>
                            
                        </div>
						<div className="errorMsg">
								<ErrorMessage name='password'/>
                            </div>
                        {error && <div className={"error_msg"}>{error}</div>}
                        <div>
                            <button type="submit" className={"green_btn"}>
                                Sign In
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>

            <div className={"right"}>
                <h1>New Here ?</h1>
                <Link to="/signup">
                    <button type="button" className={"white_btn"}>
                        Sign Up
                    </button>
                </Link>
            </div>
        </div>
    </div>
);

}

export default Login;
