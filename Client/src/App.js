// import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import Room from './Components/Room';
import { useEffect, useState } from 'react';
import Chats from './Components/Chats';

const socket = io.connect( process.env.REACT_APP_SOCKET); 

function App() {
    const [name,Setname]=useState();
    const [room,Setroom]=useState();
    const [message,Setmessage]=useState();
    const [roomjoined,Setroomjoined]=useState(false);
    const [messageList,SetmessageList]=useState([]);

    //Join Room
    const joinRoom=async(e)=>{
        e.preventDefault();
        if(name!==""&&room!==""){
            const join_data={
                name:name,
                room:room,
                time:new Date(Date.now()).getHours()+ ":" + new Date(Date.now()).getMinutes(),
                message: name + ' Joined the Chat'
            }
            await socket.emit('Join_Room',join_data);
            Setroomjoined(true);
        }
        else{
            Setroomjoined(false);
            alert("Please enter the room details");
        }
    }

    //Send Message
    const SendMessage=async(e)=>{
        e.preventDefault();
        if(message!==""){
            const messagedata={
                name:name,
                room:room,
                time:new Date(Date.now()).getHours()+ ":" + new Date(Date.now()).getMinutes(),
                message:message
            }
            await socket.emit("Send_message",messagedata);
            SetmessageList((list)=>[...list,messagedata]);
            Setmessage('');

        }
    }

    
    
    useEffect(()=>{
        socket.on("Receive_message",(data)=>{
            SetmessageList((list)=>[...list,data]);
        })
    },[socket])
    return (
        <div className='Room'>
        {roomjoined?
        <Chats name={name} Setmessage={Setmessage} Setroom={Setroom} messageList={messageList} SendMessage={SendMessage} message={message}/>:
        <Room  Setname={Setname} Setroom={Setroom} joinRoom={joinRoom}/>
        }
        </div>
    );
}

export default App;
