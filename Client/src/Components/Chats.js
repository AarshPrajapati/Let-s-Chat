import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';



const Chats = (props) => {
  return (
    <div className='chat'>
      <div className="chat-header">Live Chat</div>
      <div className="chat-body">
      <ScrollToBottom className='message-container'>
        {props.messageList.map((message)=>{
          return <div className='message' >
            <div className='message-content' id={props.name===message.name?'you':'other'}>
                {message.message}
            </div>
            <div className='message-metadata' id={props.name===message.name?'you':'other'}>
                {message.time} , {message.name}
            </div>
            </div>;
        })}
    </ScrollToBottom>

      </div>
      <div className="chat-footer">
        <form class="input-group mb-3" onSubmit={props.SendMessage}>
              <input type='text' name='message' value={props.message} onChange={(e)=>{props.Setmessage(e.target.value)}} placeholder='Enter message...' required className="form-control"/>
              <button className="btn btn-outline-secondary" type="Submit" id="button-addon2">&#9658;</button>
        </form>
      </div>
    </div>
  )
}

export default Chats
