// import { RouterProvider } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import { router } from '../src/routers/appRouter';
// import ReactQueryProvider from '../src/providers/reactQueryProvider';

// const App = () => (
//   <ReactQueryProvider>
//     <ToastContainer position="top-center" autoClose={3000} />
//     <RouterProvider router={router} />
//   </ReactQueryProvider>
// );

// export default App;
// App.jsx

// src/App.jsx
import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { router } from '../src/routers/appRouter';
import ReactQueryProvider from '../src/providers/reactQueryProvider';
import Chatbot from './components/chatBot/ChatBot.jsx';
import { MessageSquare } from 'lucide-react';

const App = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const toggleChatbot = () => setShowChatbot((prev) => !prev);

  return (
    <ReactQueryProvider>
      <ToastContainer position="top-center" autoClose={3000} />
      <RouterProvider router={router} />

      {/* Floating Chatbot Button */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-4 right-4 z-[1001] bg-[#002B5B] text-white p-4 rounded-full shadow-lg hover:bg-[#002244] transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:ring-offset-2"
        aria-label={showChatbot ? "Close chatbot" : "Open chatbot"}
      >
        <MessageSquare size={28} />
      </button>

      {/* Chatbot Component */}
      {showChatbot && <Chatbot onClose={toggleChatbot} />}
    </ReactQueryProvider>
  );
};

export default App;
