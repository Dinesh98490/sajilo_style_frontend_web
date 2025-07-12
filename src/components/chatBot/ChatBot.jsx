import React, { useState, useRef, useEffect } from "react";
import { X, MessageSquare, Minimize2, Maximize2 } from "lucide-react";
import { useChatbot } from "../../hooks/chatBotHooks";

const Chatbot = ({ onClose }) => {
  const { messages, sendMessage, isLoading } = useChatbot();
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMinimized) {
    return (
      <div className="fixed bottom-20 right-4 z-50 w-72 rounded-lg bg-white shadow-md border border-gray-300">
        <div className="flex justify-between items-center p-2 bg-blue-600 text-white">
          <h3 className="flex items-center gap-1 text-sm font-medium">
            <MessageSquare size={18} /> ChatBot
          </h3>
          <div className="flex gap-1">
            <button onClick={() => setIsMinimized(false)}>
              <Maximize2 size={16} />
            </button>
            <button onClick={onClose}>
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 w-80 h-[500px] bg-white shadow-lg rounded-lg border border-gray-300 flex flex-col">
      <div className="flex justify-between items-center p-3 bg-blue-600 text-white">
        <h3 className="flex items-center gap-2 font-semibold text-sm">
          <MessageSquare size={18} /> ChatBot
        </h3>
        <div className="flex gap-1">
          <button onClick={() => setIsMinimized(true)}>
            <Minimize2 size={16} />
          </button>
          <button onClick={onClose}>
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex mb-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`px-4 py-2 text-sm rounded-xl max-w-[75%] ${
              msg.sender === "user" ? "bg-blue-100 text-blue-900" : "bg-white border text-gray-800"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-sm text-gray-600">Bot is typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none"
          placeholder={isLoading ? "Sending..." : "Type your message..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm disabled:opacity-50"
          disabled={isLoading || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;


