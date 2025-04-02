import React, { useState } from 'react';
import './chatbox.css';

const Chatbox = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            // TODO: Handle sending the message
            console.log('Sending message:', message);
            setMessage('');
        }
    };

    return (
        <div className="chatbox">
            <h2 className="message-prompt">Message about anything</h2>
            <form onSubmit={handleSubmit} className="chat-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="message-input"
                />
                <button type="submit" className="send-button">
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chatbox;
