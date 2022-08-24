import { useEffect, useState, useRef } from 'react'
import { Avatar, IconButton } from '@mui/material'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { AddNewConversation, AddNewMessage, DeleteConversation, DeleteMessage, GetAllConversation, GetAllMessage, GetAllUsers } from '../../Services/Api';
import { Button, TextField, Dialog, DialogContent, DialogTitle, List, ListItem, ListItemAvatar, ListItemText} from '@mui/material';
import { blue } from '@mui/material/colors';

import Message from '../ChatBox/Messages';
import ChatList from '../ChatList/ChatList';
import UpdateProfile from "../Update_Profile/UpdateProfile"
import EmptyChat from "../../Images/emptyChat.jpg"

import Picker from "emoji-picker-react"
import {  Conversation, IUser, SocketIoMsg  } from '../../Interfaces/Interface'; 
import { toast, ToastContainer } from 'react-toastify';
import { useSocket } from '../Socket/useSocket';
import "./home.css"



const Home = () => {

  const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userId")
		window.location.reload();
	};
  
  
	const userId=localStorage.getItem("userId")
  

  
  const [profile , setProfile] = useState()
  const [conversations, setConversations] = useState<string[]>()
  const [currentChat, setCurrentChat] = useState<Conversation>();
  const [messages, setMessages] = useState<string[]>();
  const [newMessage, setNewMessage] = useState<string>("");
  const [users, setAllUser] = useState<string[] | undefined>();
  const [currentChatUser, setcurrentChatUser] = useState<IUser>();
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [media, setMedia] = useState<string | ArrayBuffer>();
  const [img, setImg] = useState<string>("");
  const [searchCoversationUser,setSearchCoversationUser]=useState<string>("")
  const [searchUser,setSearchUser]=useState<string>("")
  const [arrivalMessage, setArrivalMessage] = useState<any | string>();
  const [typing, setTyping] = useState<string | null>();
  const [showtyping, setShowTyping] = useState<null>(null);
  
  
  
  const scrollRef = useRef<null | HTMLDivElement>(null);
  
  
  //_______________________________________Socket Implement_____________________________

  const socket = useSocket('ws://localhost:8080')
 
	useEffect(() => {
	  socket.on("welcome",message=>{
		  console.log(message)
	  })
	}, [socket])

  useEffect(()=>{
		socket.emit("addUser",userId);
		socket.on("getUsers",users=>{
			// console.log(users);
		})
	},[])


  useEffect(()=>{
	
		socket.on("getMessage", (data:SocketIoMsg) => {
			console.log("SenderId",data.senderId)
			setArrivalMessage({
			  senderId: data.senderId,
			  text: data.text,
			  media:data.media,
			  createdAt: Date.now(),
			});
		  });
	},[]);

  useEffect(() => {
		arrivalMessage &&
		  currentChat?.members.includes(arrivalMessage.senderId) &&
		  setMessages([...(messages as []), arrivalMessage]);
	  }, [arrivalMessage, currentChat]);


  // ___________Typing status_______

  useEffect(() => {
		
		socket.on("sendstatus", status=>{
			
			if(currentChat && status.chatId === currentChat?._id)
			{
				setShowTyping(status.frdId)
				setTyping("Typing...")	
			}
			
		})
    getMassages()
			
	  }, [currentChat]);

	useEffect(()=>{
		let typingTime = new Date().getTime()
		setTimeout(()=>{
			var currentTime = new Date().getTime();
			var timeDifference = currentTime - typingTime;
			if(timeDifference >=2500 && typing){
				setTyping(null);
			}
		}, 2500)
	},[typing])
  

	const OnchangeTyping = (frdId:string | null,chatId:String | undefined) =>{
		const data={frdId,chatId}
		socket.emit("typing",data);
	}
  
  // ___________________________________________________________________________




  // _______________Emoji___________________

  const handleEmojiPickerhideShow = () => {
		setShowEmojiPicker(!showEmojiPicker);
	};


  const handleEmojiClick = (event:React.MouseEvent<Element, MouseEvent>,emojiObject:any) => {
		 
		let message = newMessage;
		message += emojiObject.emoji;
		setNewMessage(message);
	  };


  // ____________Get Conversation_______________

  useEffect(()=>{
    const getConversations = async () => {
      try {
        const {data:res} = await GetAllConversation(userId);
        setConversations(res);

        
      } catch (error) {
        console.log(error);
      }
      };
      getConversations();
  },[])

  // _________________Get Message_______________

  const getMassages =async () => {
    try {
      const {data : res} = await GetAllMessage(currentChat?._id);
      setMessages(res);
    } catch (error) {
      console.log(error)
    }
  }

  //__________Search users____________

  useEffect(()=>{
		const allUser = async()=>{
			
			try {
				const {data : res} = await GetAllUsers();
				// console.log(res)
        const user=res;

				const data=user.filter((u:any)=>(
					u.userName.toLowerCase().includes(searchUser.toLowerCase())
				))
				setAllUser(data)
				
			} catch (err) {
				console.log(err);
			}
		};
		allUser()
	  },[searchUser])

  
     //________Current user Id___________

     const CurrentID = (c:any,members:Array<string>)=>{
       setCurrentChat(c)   
       const friendId = members.find((m)=>m !== userId)
       users?.map((user:any)=>{
    
       if(user._id === friendId ){
         setcurrentChatUser(user)	
       }
       
      })
     }

     useEffect(() => {
       users?.map((user:any)=>{
        if(user._id === userId)
        {
          setProfile(user.profile)
        }
       })
     
       
     }, [users])
     


    //_____________ addNewConversation_______________

    const addNewConversation =async (id:String) => {
      const member = {
				senderId: userId,
				receiverId: id
		  };

      
          try {
            const {data: res} = await AddNewConversation(member)
            // console.log(res)
            setConversations(...(conversations as []),res)
            handleClose();
            window.location.reload()
          } catch (error:any) {
            toast.error(error.response.data.message);
          }
      }

      // _______________Add New Message_______________

      const handleSubmit = async () =>{
        setShowEmojiPicker(false);
        setImg("")
        if(newMessage === '' && media === ''){
          toast.warning("Please type a message to continue")
        }else{
          
        const message = {
            sender: userId,
            text: newMessage,
            media:media,
            conversationId: currentChat?._id,
        }

        const receiverId = currentChat?.members.find(
          (member) => member !== userId
          );

          socket.emit("sendMessage", {
            senderId: userId,
            receiverId,
            media:media,
            text: newMessage,
            });

        try {

          const {data : res } = await AddNewMessage(message)
          setMessages([...(messages as []), res]);
			    setNewMessage("");
          setMedia("")
        } catch (error) {
          console.log(error);
        }
      }

      }

      //______________Delete Conversations_______________

	    const deleteConversation = async () => {
        try {
         const {data : res} = await DeleteConversation(currentChat?._id);
         window.location.reload()
         deleteMessage()
         } catch (error) {
          console.log(error);
        }
       };
        
      //______________ Delete Message_______________

      const deleteMessage = async () => {
        try {
          const {data : res} = await DeleteMessage(currentChat?._id);	
        
          getMassages();
        } catch (error) {
          console.log(error);
        }
        };


     //___________Scroll________ 

      useEffect(() => {
        
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        
        }, [messages]);

       

    

    //___________Dialog Box function____________

		const handleClickOpen = () => {
			setOpen(true);
		  };
		
		  const handleClose = () => {
			setOpen(false);
			setSearchUser("");
		  };
    
  


  return (
    <div>
        <div className={"main_container"}>

          <div className={"main_body"}>
            <div className={"message_container"}>
              <div className={"list_header"}>
              
                    <UpdateProfile Userprofile={profile} UserId={userId}/>
                    <div className={"right_header"}>
                      <IconButton >
                      <DonutLargeIcon/>
                      </IconButton>

                      <IconButton title="New Chat" onClick={()=>handleClickOpen()}>
                      <ChatIcon/>
                      </IconButton>

                      <IconButton title="Logout" onClick={()=>handleLogout()}>
                      <ExitToAppIcon/>
                      </IconButton>
                    </div>
              </div>

              <div className={"contact_search"}>
                  <div className={"search_container"}>
                    <SearchIcon/>
                    <input 
                       type="text" 
                       placeholder="Search or start a new chat" 
                       onChange={
                         (e)=>
                         setSearchCoversationUser(e.target.value)
                        }/>
                  </div>
              </div>

              <div className={"chats_container"}>

              <div>
                  <Button fullWidth sx={{fontSize:"20px", color:"black"}} onClick={handleClickOpen}>
                    Add New Chat
                  </Button>
                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Add New Conversation</DialogTitle>
                        <DialogContent> 
                        <TextField
                          sx={{width:"350px"}}
                          autoFocus
                          margin="dense"
                          id="name"
                          label="Search User"
                          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setSearchUser(e.target.value)}
                          autoComplete="off"
                          variant="standard"
                        />
                        <List sx={{ pt: 0 }}>
                        
                        {users?.map((user:any) => (
                          
                                  <div onClick={()=>addNewConversation(user._id)} key={user._id}>
                                      {userId !== user._id ? 
                                    <ListItem button onClick={handleClose}  >
                                    
                                      <ListItemAvatar>
                                      <Avatar  src={user.profile} sx={{ bgcolor: blue[100], color: blue[600]}}>
                                        
                                      </Avatar>
                                      </ListItemAvatar>
                                      <ListItemText primary={user.userName} />
                                      
                                    </ListItem>
                                      :null}
                                  </div>
                        
                        ))}
                            </List>
                            </DialogContent>
                            </Dialog>
		          </div>

                        {conversations?.map((c:any,index)=>(
                    <div onClick={()=>{CurrentID(c,c.members)}} key={index}>
                      
                    <ChatList 
                       conversation={c} 
                       currentUser={userId}
                       searchCoversationUser={searchCoversationUser}
                       DeleteMessage={()=>deleteMessage()}
                       DeleteConversation={()=>deleteConversation()}
                    />
                   
                    </div>
                  ))}
                    

                   
              </div>

            </div>

            <div className={"chatBoxWrapper"}>
                        
                        {currentChat?._id?(
                          <>
                          <div className={"chatBox_header"}>
                          <div className={"user_profile"}>
                            <Avatar src={currentChatUser?.profile} sx={{height:"50px", width:"50px"}}/>
                            {currentChatUser?.userName}
                            {typing && showtyping === currentChatUser?._id ?<span>{typing}</span>:null}
                          </div>
                        </div>

                        <div className={"chatBoxTop"}>
                         
                         
                          {messages?.map((m:any)=> (
                            <div ref={scrollRef} key={m._id}>
                              <Message 
                                 text={m.text} 
                                 media={m.media} 
                                 own={m.sender === userId} 
                                 createdAt={m.createdAt}
                               />
                            </div>
                          ))}
                          
                          
                          {showEmojiPicker &&
                             <Picker 
                                onEmojiClick={(event,emojiObject)=>
                                handleEmojiClick(event,emojiObject)
                                 }/>
                          }
                        </div>

                        <div className={"chatBoxBottom"}>
                          <IconButton onClick={()=>handleEmojiPickerhideShow()}>
                          <EmojiEmotionsIcon />
                          </IconButton>
                          <IconButton>
                            <div className={"round"}>
                            <input
							                 type="file"
							                 className="file"
							                 onChange={(e:React.SyntheticEvent<EventTarget>) => {
								               const file = (e.target as HTMLFormElement).files[0];
								               const reader = new FileReader();
								               reader.readAsDataURL(file);
								               reader.onload = function () {	
									                 setImg(file.name)
								                   setMedia(reader.result as ArrayBuffer); 
								               };
								               reader.onerror = function (error) {
								               console.log(error);
								            };
								           }}    
							            />
                              <AttachFileIcon/> 
                            </div>
                          </IconButton>
                        
                          <input
                            className={"chatMessageInput"}
                            placeholder="write something..."
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
                                        {setNewMessage(e.target.value);
                                          OnchangeTyping(userId,currentChat._id)
                                        }
                                      }
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>)=>{if(e.key === 'Enter'){
                                        handleSubmit();
                              }}}          
                            
                            disabled = {img ? true:false}
                            value={img ? img :newMessage}
                            
                          />
      
                    <button onClick={()=>handleSubmit()} className={"chatSubmitButton"} >
                      Send
                    </button>
                        
                        </div>
                        </>
                        ):(<img className={"emaptyimg"} src={EmptyChat}></img>)}
                          

            </div>

            

          </div>
       
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Home