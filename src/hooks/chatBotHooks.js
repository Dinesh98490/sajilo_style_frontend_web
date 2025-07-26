// import { useState } from "react";
// import { sendChatQueryApi } from "../api/chatBotApi";

// export const useChatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const sendMessage = async (text) => {
//     if (!text.trim()) return;

//     const userMessage = { sender: "user", text };
//     setMessages((prev) => [...prev, userMessage]);
//     setIsLoading(true);

//     try {
//       const { data } = await sendChatQueryApi({ prompt: text }); // fixed function call
//       const botMessage = { sender: "bot", text: data.response || "No response." };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "An error occurred. Please try again." },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return {
//     messages,
//     sendMessage,
//     isLoading,
//   };
// };



// src/hooks/chatBotHooks.js
// chatbothooks

import { useState, useEffect } from "react";
import { sendChatQueryApi } from "../api/chatBotApi";

export const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // This effect runs once when the chatbot is opened to get the initial greeting.
  useEffect(() => {
    const getInitialGreeting = async () => {
      setIsLoading(true);
      try {
        // We send an initial "Hello" query to trigger the bot's welcome message.
        // The history is empty for the first message.
        const { data } = await sendChatQueryApi({ query: "Hello", history: [] });

        // Your ApiResponse nests the actual data under a 'data' property.
        // So we access it via data.data.reply
        const botMessage = {
          sender: "bot",
          text: data.data.reply || "Hello! How can I help you?",
        };
        setMessages([botMessage]);
      } catch (err) {
        setMessages([
          { sender: "bot", text: "I'm having trouble connecting. Please try again." },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    getInitialGreeting();
  }, []); // The empty array [] ensures this effect runs only once.

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { sender: "user", text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Prepare the conversation history for the API.
      // The API expects a `role` ('user' or 'model') and `text`.
      const chatHistory = newMessages.slice(0, -1).map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        text: msg.text,
      }));

      // ===================================================================
      // THE CRITICAL FIX IS HERE:
      // The object sent to the API must have a `query` property.
      const { data } = await sendChatQueryApi({
        query: text,
        history: chatHistory,
      });
      // ===================================================================

      // Access the nested reply from your ApiResponse structure
      const botMessage = {
        sender: "bot",
        text: data.data.reply || "Sorry, I didn't get a response.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "An error occurred. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    isLoading,
  };
};