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
            <form onSubmit={handleSubmit} className="chat-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message about anything..."
                    className="message-input"
                />
                <button type="submit" className="send-button" aria-label="Send message">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="send-icon"
                    >
                        <path
                            d="M4.16666 10H15.8333M15.8333 10L10 4.16669M15.8333 10L10 15.8334"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default Chatbox;
