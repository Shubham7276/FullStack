import { useEffect, useState } from 'react';
import { Button, Avatar, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { IUser, User } from '../../Interfaces/Interface';
import { GetUserById, UpdateUser } from '../../Services/Api';
import { ToastContainer, toast } from 'react-toastify';
import './updateprofile.css'


interface UpdateProps {
    UserId:String | null,
    Userprofile:string | undefined
}



const ProfileUpdateDaialog = ({UserId, Userprofile}:UpdateProps) => {

    const [open, setOpen] = useState(false);
    const [media, setMedia] = useState<string>();
    const [updateData, setUpdateData] = useState<IUser >()


    const initialValues={
        profile: updateData ? updateData.profile :"",
        userName: updateData ? updateData.userName : "",
        mobileNo:updateData ? updateData.mobileNo :"",
        email: updateData ? updateData.email :""
    }
    
    const validationSchema=Yup.object({
        userName:Yup.string().required('Name Requried!!!')
                  .min(3,"User Name must be Greter than 3 Charecter"),
        email:Yup.string().email('Invalide email Formate').required('Email Requried!!!'),
        mobileNo: Yup.string().matches(/^[0-9]{10}$/,"Enter Valid Mobile Number").required("Mobile Number Required"),
        
    
    })

    useEffect(() => {
        const handleClick = async() => {
           
            try {

                const {data: res} = await GetUserById(UserId);
                
                setUpdateData(res);
                  
            } catch (err) {
                console.log(err);
            }
          };
          handleClick()
    
      
    }, [])
    

    const handleClickOpen = async() => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


      const handleSubmit = async(data:User)=>{
        if(updateData?.userName === data.userName && updateData?.profile === data.profile && updateData?.email === data.email && updateData?.mobileNo === data.mobileNo )
        {
          toast.warning("Opps! You Do not any Changes in Your profile ");
        }else{
          try {
             data.profile=media ? media :updateData? updateData.profile : ""
              const {data: res} = await UpdateUser(UserId,data)
              toast.success("Update your profile please login again",{position: "top-center"})
              setOpen(false);
          } catch (error) {
              toast.error("something went wrong")
              console.log(error)
          }
        }
      }

      const profile=(data:any)=>{
		setMedia(data)
	}

  return (
    <div>
      <Avatar src={Userprofile} onClick={handleClickOpen}/>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update profile</DialogTitle>
        <DialogContent sx={{width:'400px'}}>
         <Formik initialValues={initialValues}
                 validationSchema={validationSchema}
                 onSubmit={(e)=>handleSubmit(e)}
                 >

           <Form>
                    <div className={"upload"}>
                    <img src={media ? media :updateData? updateData.profile : ""} width='100px' height = '100px'></img>
						<div className={"round"}>
                          <input
							type="file" 
							className="file"
							onChange={(e:React.SyntheticEvent<EventTarget>) => {
								const file = (e.target as HTMLFormElement).files[0];
								const reader = new FileReader();
								reader.readAsDataURL(file);
								reader.onload = function () {	
									profile(reader.result as ArrayBuffer)
                                    
							};
							reader.onerror = function (error) {
								console.log(error);
							};
							}}    
			  			/>

							<CameraAltIcon />
							
						</div>
					</div>
                    <div>
								< Field type="text"
										placeholder="User Name" 
										id="userName" 
										name="userName"                  
										className="update-input"
										/>
							</div>
                            <div className="errorMsg">
								<ErrorMessage  name='userName' />
                            </div>
                            <div>
								< Field type="text"
											placeholder="Mobile Number" 
											id="mobileNo" 
											name="mobileNo"
											className="update-input"
											/>
							</div>
                            <div className="errorMsg">
								<ErrorMessage name='mobileNo'/>
                            </div>
                            <div>
								<Field  type="text"
									placeholder="Email "
									id="email"
									name="email"
									className="update-input"/>
							</div>
                            <div className="errorMsg">
                                <ErrorMessage name='email'/>
                            </div>

            <DialogActions>
               <Button variant="contained" color="error" onClick={handleClose}>Cancel</Button>
               <Button variant="contained" type='submit'>Update</Button>
            </DialogActions>
            </Form>
        </Formik>
        </DialogContent>
      </Dialog>
      <ToastContainer/>
    </div>
  )
}

export default ProfileUpdateDaialog