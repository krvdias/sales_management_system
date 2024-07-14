import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';

export default function ChatUser() {
    const { auth, messages } = usePage().props;
    const [newMessage, setNewMessage] = useState('');
    const [chatMessages, setChatMessages] = useState(messages);

    useEffect(() => {
        window.Echo.channel('chat')
            .listen('MessageSent', (e) => {
                setChatMessages((prevMessages) => [...prevMessages, e.message]);
            });
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        Inertia.post('/messages', { message: newMessage }, {
            onSuccess: () => setNewMessage('')
        });
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                {chatMessages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.user_id === auth.user.id ? 'sent' : 'received'}`}>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className="chat-input-form">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                    className="chat-input"
                />
                <button type="submit" className="chat-send-button">Send</button>
            </form>
        </div>
    );
}
