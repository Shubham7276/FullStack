export interface User{
    _id?:String | undefined,
    userName?:String,
    email?:String;
    mobileNo?:String,
    profile?:String,
    password?:String | undefined;
}


export interface Conversation{
    _id?: String | undefined
    members:Array<string>
	
}

export interface Members{
    senderId: String | null,
    receiverId: String | null
}



export interface IUser {
	_id:string;
	userName: string;
	profile:string;
    mobileNo:string
    email:string
}



export interface ChatMessage{
    _id?: String | undefined,
    sender?: String | null,
	text?: String,
	media?:String | ArrayBuffer| null,
	conversationId?: String | undefined,
}


export interface SocketIoMsg{
    senderId: string,
	text: String,
	media:String | ArrayBuffer| null,
	createdAt: number 
}




