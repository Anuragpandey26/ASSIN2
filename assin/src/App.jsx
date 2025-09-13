import React, { useState } from 'react';
import './App.css';

// Dummy data for chat list
const dummyChats = [
  { id: 1, name: 'Team Project', lastMessage: 'Let\'s finalize the report.', time: '2:30 PM' },
  { id: 2, name: 'Alice Smith', lastMessage: 'Meeting rescheduled to tomorrow.', time: 'Yesterday' },
  { id: 3, name: 'Design Team', lastMessage: 'New wireframes attached.', time: 'Monday' },
];

// Dummy AI responses
const dummySummary = 'This thread discusses project progress, UI updates, backend help, and scheduling a call.';
const dummySmartReply = 'Sounds good, I\'m available at 3 PM.';
const dummyIcebreaker = 'Hi! Excited to collaborate on this project. What\'s your current focus?';

function App() {
  const [view, setView] = useState('list'); // 'list', 'chat', 'new'
  const [selectedChat, setSelectedChat] = useState(null);
  const [newParticipant, setNewParticipant] = useState('');
  const [icebreaker, setIcebreaker] = useState('');
  const [summary, setSummary] = useState('');
  const [smartReply, setSmartReply] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setView('chat');
    // Load dummy messages or reset to empty for new interaction
    setMessages([
      { id: 1, sender: 'Me', text: 'Hey team, how\'s the progress?' },
      { id: 2, sender: 'Alice', text: 'Going well, just wrapping up the UI.' },
      { id: 3, sender: 'Bob', text: 'I need some help with the backend integration.' },
      { id: 4, sender: 'Me', text: 'Sure, let\'s hop on a call.' },
    ]);
    setSummary('');
    setSmartReply('');
    setInputMessage('');
  };

  const handleNewChat = () => {
    setView('new');
    setIcebreaker('');
  };

  const handleStartChat = () => {
    if (newParticipant) {
      const newChat = { id: Date.now(), name: newParticipant, lastMessage: '', time: 'Now' };
      setSelectedChat(newChat);
      setView('chat');
      setMessages([]);
      setNewParticipant('');
      setIcebreaker('');
    }
  };

  const handleGenerateIcebreaker = () => {
    setIcebreaker(dummyIcebreaker);
  };

  const handleSummarize = () => {
    setSummary(dummySummary);
  };

  const handleSmartReply = () => {
    setSmartReply(dummySmartReply);
    if (inputMessage === '') {
      setInputMessage(dummySmartReply);
    }
  };

  const handleBack = () => {
    setView('list');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: 'Me',
        text: inputMessage,
      };
      setMessages([...messages, newMessage]);
      setInputMessage(''); // Clear input after sending
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Smart Team Chat</h1>
        <div className="header-buttons">
          {view !== 'list' && (
            <button onClick={handleBack} className="back-button">Back</button>
          )}
          {view === 'list' && (
            <button onClick={handleNewChat} className="new-chat-button">New Chat</button>
          )}
        </div>
      </header>

      {view === 'list' && (
        <div className="chat-list">
          <h2>Chats</h2>
          <ul>
            {dummyChats.map((chat) => (
              <li key={chat.id} onClick={() => handleSelectChat(chat)} className="chat-item">
                <div className="chat-info">
                  <span className="name">{chat.name}</span>
                  <span className="last-message">{chat.lastMessage}</span>
                </div>
                <span className="time">{chat.time}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {view === 'chat' && selectedChat && (
        <div className="chat-window">
          <h2>{selectedChat.name}</h2>
          <div className="messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender === 'Me' ? 'me' : ''}`}>
                <span className="sender">{msg.sender}:</span> {msg.text}
              </div>
            ))}
          </div>
          <div className="ai-controls">
            <button onClick={handleSummarize}>Summarize Thread</button>
            {summary && <p className="ai-response">Summary: {summary}</p>}
            <button onClick={handleSmartReply}>Smart Reply Suggestion</button>
            {smartReply && <p className="ai-response">Suggested Reply: {smartReply}</p>}
          </div>
          <form className="input-area" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}

      {view === 'new' && (
        <div className="new-chat">
          <h2>Start New Chat</h2>
          <input
            type="text"
            placeholder="Enter participant name..."
            value={newParticipant}
            onChange={(e) => setNewParticipant(e.target.value)}
          />
          <div className="new-chat-buttons">
            <button onClick={handleGenerateIcebreaker}>Generate Icebreaker</button>
            <button onClick={handleStartChat} disabled={!newParticipant}>Start Chat</button>
          </div>
          {icebreaker && <p className="ai-response">Icebreaker: {icebreaker}</p>}
        </div>
      )}
    </div>
  );
}

export default App;