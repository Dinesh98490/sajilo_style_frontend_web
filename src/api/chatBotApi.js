import instance from "./api"; 


export const sendChatQueryApi = (data) => {
  return instance.post("/chatbot/chat", data); 
};
