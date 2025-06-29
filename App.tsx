
import React from 'react';
import Chat from './components/Chat';

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen font-sans bg-gray-50 text-gray-800">
      <header className="bg-white shadow-md z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
            🩺 MediQuery: AI Healthcare Chatbot
          </h1>
          <p className="text-sm text-gray-500 mt-1">Your AI-powered health information assistant</p>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <Chat />
      </main>
    </div>
  );
};

export default App;