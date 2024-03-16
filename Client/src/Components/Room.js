import React from 'react'

const Room = (props) => {
    
  return (
    
    <div className='Room2'>
      <h2>Join Room</h2>
      <form className='formroom' onSubmit={props.joinRoom}>
        <input type="text" onChange={(e)=>{props.Setname(e.target.value)}} placeholder='Name...' name='name' required/>
        <input type='number' onChange={(e)=>{props.Setroom(e.target.value)}} placeholder='Room id.. ' name='roomid' required/>
        <input type='submit' value='Join Room'/>
      </form>
    </div>
  )
}

export default Room
