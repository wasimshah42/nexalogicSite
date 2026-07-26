import React, { useState } from 'react';

// simple chat bubble SVG for button
const ChatIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4-.8L3 21l1.8-4A7.971 7.971 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);


interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = (text: string) => {
    if (!text) return;
    const userMessage: Message = { sender: 'user', text };
    setMessages((prev) => [...prev, userMessage]);

    // simple automated reply with contact information
    setTimeout(() => {
      const botMessage: Message = {
        sender: 'bot',
        text:
          '<p>Thanks for reaching out!</p>' +
          '<p>You can contact us via:</p>' +
          '<ul>' +
          '<li>WhatsApp: <a href="https://wa.me/923118895477" target="_blank" class="text-blue-600 underline">+923118895477</a></li>' +
          '<li>Telegram: <a href="https://t.me/smartlinker786" target="_blank" class="text-blue-600 underline">@smartlinker786</a></li>' +
          '<li>Email: <a href="mailto:sales@nexalogic.site" class="text-blue-600 underline">sales@nexalogic.site</a></li>' +
          '</ul>',
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="flex items-center justify-center rounded-full bg-blue-500 p-4 text-white shadow-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 animate-pulse"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
      >
        <ChatIcon />
      </button>

      {open && (
        <div className="mt-2 w-80 max-h-96 bg-white dark:bg-gray-800 shadow-2xl flex flex-col rounded-lg overflow-hidden">
          <div className="flex-1 p-2 overflow-auto">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={
                  m.sender === 'user' ? 'text-right mb-2' : 'text-left mb-2'
                }
              >
                <span
                  className={
                    'inline-block p-2 rounded max-w-[70%] break-words ' +
                    (m.sender === 'user'
                      ? 'bg-blue-100 text-black'
                      : 'bg-gray-100 dark:bg-gray-700 dark:text-white')
                  }
                  // bot messages may contain HTML
                  dangerouslySetInnerHTML={{ __html: m.text }}
                />
              </div>
            ))}
          </div>
          <ChatInput onSend={handleSend} />
        </div>
      )}
    </div>
  );
};

interface ChatInputProps {
  onSend: (text: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [text, setText] = useState('');

  const submit = () => {
    if (text.trim().length === 0) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <div className="border-t p-2 border-gray-200 dark:border-gray-600">
      <input
        className="w-full border p-1 rounded bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit();
        }}
        placeholder="Type a message..."
      />
    </div>
  );
};

export default Chatbot;
