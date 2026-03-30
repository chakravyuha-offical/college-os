'use client';

import { useState } from 'react';
import ComicCard from '@/components/ui/ComicCard';
import ComicInput from '@/components/ui/ComicInput';

const CONVERSATIONS = [
  { id: '1', name: 'Dr. Anuradha T.', role: 'Teacher', lastMsg: 'Your assignment is graded.', time: '10:42 AM', unread: 0 },
  { id: '2', name: 'Rahul Sharma', role: 'Student', lastMsg: 'Are we still meeting for the project?', time: 'Yesterday', unread: 2 },
  { id: '3', name: 'Study Group - CSE', role: 'Group', lastMsg: 'Aditya: Good luck for exams!', time: 'Mon', unread: 0 },
];

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(CONVERSATIONS[0]);

  return (
    <div className="h-[calc(100vh-8rem)] min-h-[500px] flex animate-pop-in">
      <div className="w-full md:w-80 border-r-2 border-gray-100 flex flex-col pt-0 bg-white comic-shadow rounded-[16px] md:rounded-r-none border-3 border-[var(--comic-border)] z-10 relative overflow-hidden">
        <div className="p-4 border-b-2 border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-black uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>Messages</h2>
            <button className="w-8 h-8 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-lg flex items-center justify-center font-black transition-transform hover:scale-110">
              <span className="material-symbols-outlined text-[18px]">edit_square</span>
            </button>
          </div>
          <ComicInput placeholder="Search messages..." />
        </div>
        
        <div className="flex-1 overflow-y-auto w-full">
          {CONVERSATIONS.map(chat => (
            <div 
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`p-4 border-b-2 border-gray-50 flex items-center gap-3 cursor-pointer transition-colors ${activeChat.id === chat.id ? 'bg-[var(--primary)]/5 border-l-4 border-l-[var(--primary)]' : 'hover:bg-gray-50 border-l-4 border-l-transparent'}`}
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0 font-black text-[var(--text-secondary)]">
                {chat.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`text-[0.8rem] truncate ${chat.unread > 0 ? 'font-black' : 'font-extrabold'}`}>{chat.name}</h3>
                  <span className="text-[0.6rem] font-bold text-[var(--text-muted)] shrink-0">{chat.time}</span>
                </div>
                <p className={`text-[0.7rem] truncate ${chat.unread > 0 ? 'font-bold text-[var(--text-primary)]' : 'font-bold text-[var(--text-muted)]'}`}>
                  {chat.lastMsg}
                </p>
              </div>
              {chat.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-[var(--primary)] flex items-center justify-center text-[0.6rem] font-black text-white shrink-0">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:flex flex-1 flex-col bg-gray-50 comic-border border-l-0 rounded-r-[16px] relative z-0">
        <div className="px-6 py-4 bg-white border-b-2 border-gray-100 flex justify-between items-center rounded-tr-[14px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0 font-black text-[var(--text-secondary)]">
              {activeChat.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-[0.9rem] font-extrabold">{activeChat.name}</h3>
              <p className="text-[0.65rem] font-bold text-[var(--text-muted)]">{activeChat.role}</p>
            </div>
          </div>
          <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          <div className="flex justify-center mb-6">
            <span className="px-3 py-1 bg-gray-200/50 rounded-full text-[0.6rem] font-bold uppercase tracking-wider text-[var(--text-muted)]">Today</span>
          </div>
          
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0 font-black text-[var(--text-secondary)] text-[0.7rem] mt-auto">
              {activeChat.name.charAt(0)}
            </div>
            <div className="bg-white comic-border px-4 py-3 rounded-[16px] rounded-bl-sm comic-shadow-sm max-w-[70%]">
              <p className="text-[0.8rem] font-bold">Hello Aditya, please check the feedback I left on your recent assignment submission.</p>
              <span className="text-[0.55rem] font-bold text-[var(--text-muted)] block mt-1 text-right">10:42 AM</span>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
             <div className="bg-[var(--primary)] px-4 py-3 rounded-[16px] rounded-br-sm comic-shadow-sm max-w-[70%] border-2 border-[var(--primary-dark)] text-white">
              <p className="text-[0.8rem] font-bold">Thank you Professor, I will review it right away and submit the revisions.</p>
              <span className="text-[0.55rem] font-bold text-white/70 block mt-1 text-right">10:55 AM</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border-t-2 border-gray-100 rounded-br-[14px]">
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors rounded-full hover:bg-gray-100">
              <span className="material-symbols-outlined">attach_file</span>
            </button>
            <div className="flex-1">
               <input 
                 className="w-full px-4 py-3 bg-gray-100 border-2 border-transparent focus:border-[var(--primary)] focus:bg-white rounded-full text-[0.85rem] font-bold outline-none transition-all placeholder:text-gray-400"
                 placeholder="Type a message..."
               />
            </div>
            <button className="w-10 h-10 flex items-center justify-center text-white bg-[var(--primary)] border-2 border-[var(--primary-dark)] transition-transform hover:scale-110 text-lg rounded-full comic-shadow-sm">
              <span className="material-symbols-outlined text-[16px]" style={{ transform: 'translateX(2px)' }}>send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
