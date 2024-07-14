import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';

export default function ChatAdmin() {
    const { auth, messages, users } = usePage().props;
    const [newMessage, setNewMessage] = useState('');
    const [chatMessages, setChatMessages] = useState(messages);
    const [selectedUser, setSelectedUser] = useState(users[0].id);

    useEffect(() => {
        window.Echo.channel('chat')
            .listen('MessageSent', (e) => {
                setChatMessages((prevMessages) => [...prevMessages, e.message]);
            });
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        Inertia.post('/messages', { message: newMessage, user_id: selectedUser }, {
            onSuccess: () => setNewMessage('')
        });
    };

    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
        // Fetch messages for the selected user if needed
        Inertia.get(route('chat.admin', { user_id: e.target.value }));
    };

    return (
        <div className="chat-container">
            <div className="user-select">
                <label htmlFor="userSelect">Select User:</label>
                <select id="userSelect" onChange={handleUserChange} value={selectedUser}>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
            </div>
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
