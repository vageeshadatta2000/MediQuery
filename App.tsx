
import React from 'react';
import ChatInterface from './components/ChatInterface';
import InfoPanel from './components/InfoPanel';

const App: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-4 font-sans">
      <div className="flex flex-col md:flex-row w-full max-w-6xl h-[90vh] max-h-[1024px] bg-white dark:bg-slate-900 shadow-2xl rounded-2xl overflow-hidden">
        <div className="w-full md:w-1/3 lg:w-1/4 bg-slate-50 dark:bg-slate-800/50 p-6 overflow-y-auto border-r border-slate-200 dark:border-slate-700">
          <InfoPanel />
        </div>
        <main className="flex-1 flex flex-col h-full">
          <ChatInterface />
        </main>
      </div>
    </div>
  );
};

export default App;
