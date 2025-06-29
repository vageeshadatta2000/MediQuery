
import React from 'react';
import type { Message } from '../types';
import { MessageRole } from '../types';
import BotIcon from './icons/BotIcon';
import UserIcon from './icons/UserIcon';

interface MessageBubbleProps {
  message: Message;
  isTyping?: boolean;
}

const SourceLink: React.FC<{ url: string; title: string; index: number }> = ({ url, title, index }) => {
  const domain = new URL(url).hostname.replace('www.', '');
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-teal-600 dark:text-teal-400 hover:underline flex items-center bg-slate-100 dark:bg-slate-700/50 p-2 rounded-lg transition-colors hover:bg-slate-200 dark:hover:bg-slate-700"
    >
      <span className="font-mono text-xs bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">{index + 1}</span>
      <span className="truncate">
        {title} <span className="text-slate-500 dark:text-slate-400">- {domain}</span>
      </span>
    </a>
  );
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isTyping = false }) => {
  const isBot = message.role === MessageRole.BOT;

  const textToHtml = (text: string) => {
    // Basic markdown for bold text **text** -> <strong>text</strong>
    const bolded = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Convert newlines to <br> tags
    return bolded.replace(/\n/g, '<br />');
  };

  return (
    <div className={`flex items-start gap-3 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isBot ? 'bg-teal-100 dark:bg-teal-900/50' : 'bg-slate-200 dark:bg-slate-700'}`}>
        {isBot ? <BotIcon className="w-6 h-6 text-teal-600 dark:text-teal-400" /> : <UserIcon className="w-6 h-6 text-slate-700 dark:text-slate-200" />}
      </div>
      <div className={`max-w-xl p-4 rounded-xl ${isBot ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none' : 'bg-teal-600 text-white rounded-tr-none'}`}>
        {isTyping ? (
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2.5 h-2.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2.5 h-2.5 bg-current rounded-full animate-bounce"></span>
          </div>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-strong:font-semibold" dangerouslySetInnerHTML={{ __html: textToHtml(message.text) }}></div>
        )}
        {message.sources && message.sources.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
            <h4 className="text-xs font-semibold mb-2 text-slate-600 dark:text-slate-300 uppercase tracking-wider">Sources</h4>
            <div className="space-y-2">
              {message.sources.map((source, index) => (
                <SourceLink key={index} url={source.uri} title={source.title} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
