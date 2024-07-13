
// import React, { useState, useEffect, useRef } from 'react';
// import './Chatbot.css';
// import axios from 'axios';
// import chatboticon from '../assets/chatbot.png';
// import usericon from '../assets/user.png';
// import { Link } from 'react-router-dom';

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [sessionName, setSessionName] = useState("");
//   const [showModal, setShowModal] = useState(true);
//   const [sessionActive, setSessionActive] = useState(false);
//   const messagesEndRef = useRef(null);

//   const name = localStorage.getItem('name');

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     setMessages((prevMessages) => [...prevMessages, { id: prevMessages.length + 1, text: input, type: "user" }]);
//     setInput("");

//     try {
//       const result = await axios.post(`http://127.0.0.1:5000/queryFineTune`, {
//         query_text: input,
//       });

//       setMessages((prevMessages) => [...prevMessages, { id: prevMessages.length + 2, text: result.data.response, type: "bot" }]);
//     } catch (error) {
//       setMessages((prevMessages) => [...prevMessages, { id: prevMessages.length + 2, text: error.response?.data?.error || 'There was an error processing your request.', type: "bot" }]);
//     }
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSessionSubmit = (e) => {
//     e.preventDefault();
//     if (!sessionName.trim()) return;
//     setShowModal(false);
//     setSessionActive(true);
//     setMessages([{ id: 1, text: "Thanks for getting in touch with us today. 😊 We are here to help you build your wellness so that you are healthy today and tomorrow.", type: "bot" }]);
//   };

//   const handleEndSession = async () => {
//     const email = localStorage.getItem('email');
//     if (!email) {
//       console.error('No user email found in local storage.');
//       return;
//     }

//     try {
//       await axios.post(`http://127.0.0.1:5000/saveSession`, {
//         email,
//         sessionName,
//         messages
//       });
//       setSessionActive(false);
//     } catch (error) {
//       console.error('There was an error ending the session:', error);
//     }
//   };

//   const handleStartNewSession = () => {
//     setMessages([]);
//     setSessionName("");
//     setShowModal(true);
//   };

//   return (
//     <div className="chatbot">
//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Enter Session Name</h2>
//             <form onSubmit={handleSessionSubmit}>
//               <input 
//                 type="text" 
//                 value={sessionName} 
//                 onChange={(e) => setSessionName(e.target.value)} 
//                 placeholder="Session Name" 
//               />
//               <button type="submit">Start Session</button>
//             </form>
//           </div>
//         </div>
//       )}
//       <header className="navbar">
//         <img src={chatboticon} alt="chatbot-icon" className="logo" />
//         <div className='title'>ASTRO</div>
//         <ul>
//           <Link to='/'>
//             <li>Home</li>
//           </Link>
//           <li>Session Name: {sessionName}</li>
//         </ul>
//         <div>
//           {sessionActive ? (
//             <button className='end-session' onClick={handleEndSession}>End Session</button>
//           ) : (
//             <button className='end-session' onClick={handleStartNewSession}>Start New Session</button>
//           )}
//         </div>
//         <div className='name'>{name}</div>
//         <img src={usericon} alt="user-icon" className='toggle-icon' />
//       </header>
//       <div className="chatbot-messages">
//         {messages.map(message => (
//           <div key={message.id} className={`message ${message.type}`}>
//             <p>{message.text}</p>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="chatbot-footer">
//       {sessionActive ? (
//         <div className="message-input-container">
//           <textarea 
//             className="message-input" 
//             value={input} 
//             onChange={(e) => setInput(e.target.value)} 
//             placeholder="Type your message..." 
//           />
//           <button className="send-button" onClick={handleSend} disabled={!sessionActive}>Send</button>
//         </div>
//           ) : (
//             <></>
//           )}
        
//       </div>
//     </div>
//   );
// };

// export default Chatbot;


import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import axios from 'axios';
import chatboticon from '../assets/chatbot.png';
import usericon from '../assets/user.png';
import { Link } from 'react-router-dom';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [sessionActive, setSessionActive] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [showChatHistoryModal, setShowChatHistoryModal] = useState(false);
  const [isSessionSelected, setIsSessionSelected] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [tempSession, setTempSession] = useState(null);
  const messagesEndRef = useRef(null);

  const name = localStorage.getItem('name');
  const firstName = name?.split(' ')[0];

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prevMessages) => [...prevMessages, { id: prevMessages.length + 1, text: input, type: "user" }]);
    setInput("");

    try {
      const result = await axios.post(`http://127.0.0.1:5000/queryFineTune`, {
        query_text: input,
      });

      setMessages((prevMessages) => [...prevMessages, { id: prevMessages.length + 2, text: result.data.response, type: "bot" }]);
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { id: prevMessages.length + 2, text: error.response?.data?.error || 'There was an error processing your request.', type: "bot" }]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSessionSubmit = (e) => {
    e.preventDefault();
    if (!sessionName.trim()) return;
    setShowModal(false);
    setSessionActive(true);
    setMessages([{ id: 1, text: "Thanks for getting in touch with us today. 😊 We are here to help you build your wellness so that you are healthy today and tomorrow.", type: "bot" }]);
  };

  const handleEndSession = async () => {
    const email = localStorage.getItem('email');
    if (!email) {
      console.error('No user email found in local storage.');
      return;
    }

    try {
      await axios.post(`http://127.0.0.1:5000/saveSession`, {
        email,
        sessionName,
        messages
      });
      setSessionActive(false);
    } catch (error) {
      console.error('There was an error ending the session:', error);
    }
  };

  const handleStartNewSession = () => {
    setMessages([]);
    setSessionName("");
    setShowModal(true);
    setIsSessionSelected(false);
  };

  const handleUserIconClick = () => {
    setShowUserMenu((prev) => !prev);
  };

  const handleChatHistory = async () => {
    const email = localStorage.getItem('email');
    if (!email) {
      console.error('No user email found in local storage.');
      return;
    }

    try {
      const result = await axios.post(`http://127.0.0.1:5000/getSessions`, { email });
      setSessions(result.data.sessions);
      setShowUserMenu(false);
      setShowChatHistoryModal(true);
      console.log(result)
    } catch (error) {
      console.error('There was an error retrieving the sessions:', error);
    }
  };

  const handleSessionSelect = (selectedSession) => {
    if (sessionActive) {
      setTempSession({ sessionName, messages });
    }
    setMessages(selectedSession.messages);
    setSessionName(selectedSession.sessionName);
    setIsSessionSelected(true);
    setShowModal(false);
    setShowChatHistoryModal(false);
  };

  const handleGoToCurrentSession = () => {
    if (tempSession) {
      setMessages(tempSession.messages);
      setSessionName(tempSession.sessionName);
      setTempSession(null);
      setIsSessionSelected(false);
    }
  };

  return (
    <div className="chatbot">
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Enter Session Name</h2>
            <form onSubmit={handleSessionSubmit}>
              <input 
                type="text" 
                value={sessionName} 
                onChange={(e) => setSessionName(e.target.value)} 
                placeholder="Session Name" 
              />
              <button type="submit">Start Session</button>
            </form>
          </div>
        </div>
      )}
      {showChatHistoryModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select a Session</h2>
            <ul>
              {sessions.map((session) => (
                <li key={session.sessionName} onClick={() => handleSessionSelect(session)}>
                  {session.sessionName}
                </li>
              ))}
            </ul>
            <button onClick={() => setShowChatHistoryModal(false)}>Cancel</button>
          </div>
        </div>
      )}
      <header className="navbar">
        <img src={chatboticon} alt="chatbot-icon" className="logo" />
        <div className='title'>ASTRO</div>
        <ul>
          <Link to='/'>
            <li>Home</li>
          </Link>
          <li>Session Name: {sessionName}</li>
        </ul>
        <div>
          {sessionActive ? (
            <button className='end-session' onClick={handleEndSession}>End Session</button>
          ) : (
            <button className='end-session' onClick={handleStartNewSession}>Start New Session</button>
          )}
        </div>
        <div className='name'>{firstName}</div>
        <img src={usericon} alt="user-icon" className='toggle-icon' onClick={handleUserIconClick} />
        {showUserMenu && (
          <div className="flex flex-col user-menu">
            <ul className='flex flex-col gap-4'>
              <li>Name: {name}</li>
              <li onClick={handleChatHistory}>Chat History</li>
              <Link to='/auth'>
              <li>Logout</li>
              </Link>
            </ul>
            {/* <button onClick={handleChatHistory}>Show Chat History</button> */}
          </div>
        )}
      </header>
      <div className="chatbot-messages">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.type}`}>
            <p>{message.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-footer">
        {sessionActive && !isSessionSelected ? (
          <div className="message-input-container">
            <textarea 
              className="message-input" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Type your message..." 
            />
            <button className="send-button" onClick={handleSend} disabled={!sessionActive}>Send</button>
          </div>
        ) : (
          !isSessionSelected && <></>
        )}
        {isSessionSelected && (
          <button className="end-session b1" onClick={handleGoToCurrentSession}>Go to Current Session</button>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
