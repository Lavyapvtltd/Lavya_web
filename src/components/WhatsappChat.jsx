import React, { useState } from 'react';
import './style.css';

const WhatsAppChat = () => {
  const [showInput, setShowInput] = useState(false);
  const [message, setMessage] = useState('');
  const phoneNumber = '917014054590';

  const handleClick = () => {
    setShowInput(!showInput);
  };

  const handleClose = () => {
    setShowInput(false);
  };


  // const handleSend = () => {
  //   if (message.trim() !== '') {
  //     const url = `https://web.whatsapp.com/send?text=${encodeURIComponent(message)}&phone=${phoneNumber}`;
  //     window.open(url, '_blank'); 
  //     setMessage(''); 
  //   }
  // };
  
  const handleSend = () => {
    if (message.trim() !== '') {
      const isMobile = /Mobi|Android/i.test(navigator.userAgent); 
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`; 

      if (isMobile) {
        window.open(url, '_blank'); 
      } else {
        window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(message)}&phone=${phoneNumber}`, '_blank'); 
      }
      
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="whatsapp-chat-container">
      <button className="whatsapp-icon" onClick={handleClick} title="WhatsApp">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="whatsapp-logo"
        />
      </button>

      {showInput && (
        <div className={`whatsapp-chat-content ${showInput ? 'open' : ''}`}>
          <button className="close-button" onClick={handleClose}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>

          <div className="user-message">
            <p>{`<p>How can I help you?:)</p>`}</p>
          </div>

          <div className="whatsapp-input-container justify-content-between">
            <input
              type="text"
              value={message}
              onKeyDown={handleKeyDown}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              className="whatsapp-input"
            />
            <div class="chaty-whatsapp-button">
              <button className="whatsapp-send-button" onClick={handleSend}>
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M48 448l416-192L48 64v149.333L346 256 48 298.667z"></path></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppChat;
