import './messages.css'
import {format} from 'timeago.js'

interface HomeProps{
    text:string,
    media:string | undefined,
    createdAt:Date,
    own:boolean
}



const Message = ({text,media,createdAt,own}:HomeProps) => {

    
  return (
    <>
    
    <div className={own ?"message own" : "message"}>
      <div className="messageTop">
      {text !=="" ?(<p className="messageText">{text}</p>):null}
      {media ?(<p className="messageMedia"><img src={media} width="200px" height="200px" /></p>):null}
      </div>
      <div className="messageBottom">{format(createdAt)}</div>
      
    </div>
    </>
  )
}

export default Message