import { useEffect, useState } from "react";
import { IUser } from "../../Interfaces/Interface";
import { GetUser } from "../../Services/Api";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './chatlist.css'
import { 
	Avatar, 
	IconButton, 
	Menu, 
	MenuItem, 
	Tooltip, 
	Typography } from "@mui/material";



type HomeProps = {
    conversation: {
		members:Array<string>
	},
    currentUser:String | null,
	searchCoversationUser:string
	DeleteMessage:()=> void,
	DeleteConversation:()=>void
  }
 

const ChatList = ({conversation,currentUser,searchCoversationUser,DeleteMessage,DeleteConversation}:HomeProps) => {

    const [user, setUser] = useState<IUser>()
	const [view, setView] = useState<boolean>(true)
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	
	const settings = ['Delete Chat','Delete Conversation'];
  
    //____________________ Getuser____________________

    useEffect(()=>{
        
		const friendId = conversation.members?.find((con) =>con !== currentUser)
		const getUser = async () => {
			try {
			  
			  const {data:res} = await GetUser(friendId);

			//   ____________Search Conversation___________

			  if(searchCoversationUser && !res.userName.toLowerCase().includes(searchCoversationUser.toLowerCase())){
				setView(false) 
				
			 }else{
				setView(true)
			 }
			
			  setUser(res)
				
			} catch (error) {
			  console.log(error);
			}
		  };
		  getUser()
	},[searchCoversationUser])
	
	const handleOpenUserMenu = (event:React.MouseEvent<HTMLButtonElement>) => {
		setAnchorElUser(event.currentTarget);
	  };

	//   __________Options____________

	  const handleCloseUserMenu = (event:React.MouseEvent<HTMLLIElement>) => {
		setAnchorElUser(null);
		switch((event.target as HTMLInputElement). id){

			case "Delete Chat" :
				const confirmBox = window.confirm(
					"Are You Sure to Delete Your Chat?"
				  )
				  if (confirmBox === true) {
					DeleteMessage()
				  }
				
			break;

			case "Delete Conversation" :
				const confirmBox2 = window.confirm(
					"Are You Sure to Delete Your Conversation?"
				  )
				  if (confirmBox2 === true) {
					
					DeleteConversation();
				  }
				

			break;
		}
	  };

	  const handleCloseMenu = () => {
		setAnchorElUser(null)
		
	  };



	return (
		<>{view?
		
				<div className={"chat_container"}>
				<div style={{display:"flex"}}>
					<Avatar sx={{height:"50px", width:"50px"}} src={user?.profile} />
					<div className={"chatInfo"}>
					<h2>{user?.userName}</h2>
					</div>
				</div>
					<div className={"setting"}>
									<Tooltip title="More">
							<IconButton onClick={(event)=>handleOpenUserMenu(event)} sx={{ p: 0 }}>
								<MoreVertIcon/>
							</IconButton>
							</Tooltip>
							<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseMenu}
							> 
							{settings.map((setting)=>(

								<MenuItem key={setting}  onClick={(event)=>handleCloseUserMenu(event)}>
								<Typography textAlign="center" id={setting}>{setting}</Typography>
								</MenuItem>
							))}
							
							</Menu>
					</div>
				</div>:null}
			
		</>
			
			
	);
};

export default ChatList;
