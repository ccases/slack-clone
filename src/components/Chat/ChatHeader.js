import React from 'react'


function ChatHeader({chat, chatType}) {
    return (
        <div>
            {chatType === "User" ? (
                <div className="chat-title">
               <h1> {chat.uid}</h1>
                </div>
            ): (
                <div className="chat-title">
               <h1> {chat.name}</h1>
                </div>
            )}  
        </div>
    )
}

export default ChatHeader
