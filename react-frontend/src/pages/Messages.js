import React, { useState, useEffect } from 'react';
import { getMessages, createMessage, deleteMessage } from '../services/messageService';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [messageData, setMessageData] = useState({ content: '', sender: '' });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const messagesData = await getMessages();
    setMessages(messagesData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMessageData({ ...messageData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMessage(messageData);
    fetchMessages();
    setMessageData({ content: '', sender: '' });
  };

  const handleDelete = async (id) => {
    await deleteMessage(id);
    fetchMessages();
  };

  return (
    <div className="container">
      <h2>Messages</h2>
      <form onSubmit={handleSubmit}>
        <input name="content" placeholder="Message content" value={messageData.content} onChange={handleInputChange} required />
        <input name="sender" placeholder="Sender" value={messageData.sender} onChange={handleInputChange} required />
        <button type="submit">Add Message</button>
      </form>

      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            {message.sender}: {message.content}
            <button onClick={() => handleDelete(message._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Dialog } from '@headlessui/react';
// import { AiOutlineDelete, AiOutlineSend } from 'react-icons/ai';

// function Messages() {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState(null);

//   useEffect(() => {
//     // Fetch messages from the backend
//     axios.get('http://localhost:5000/api/messages')
//       .then(response => setMessages(response.data))
//       .catch(error => console.error('Error fetching messages:', error));
//   }, []);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/messages', { content: newMessage });
//       setMessages([...messages, response.data]);
//       setNewMessage('');
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   const handleDeleteMessage = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/messages/${selectedMessage._id}`);
//       setMessages(messages.filter(message => message._id !== selectedMessage._id));
//       setIsDeleteModalOpen(false);
//     } catch (error) {
//       console.error('Error deleting message:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {/* Messages List */}
//       <div className="bg-white shadow-md rounded-lg p-4 mb-6">
//         <h2 className="text-xl font-semibold mb-4">Messages</h2>
//         <div className="overflow-y-auto max-h-96">
//           {messages.length === 0 ? (
//             <p>No messages yet.</p>
//           ) : (
//             messages.map(message => (
//               <div key={message._id} className="border-b border-gray-200 py-2">
//                 <div className="flex justify-between items-center">
//                   <p className="text-gray-800">{message.content}</p>
//                   <button 
//                     onClick={() => {
//                       setSelectedMessage(message);
//                       setIsDeleteModalOpen(true);
//                     }} 
//                     className="text-red-600 hover:bg-red-100 rounded p-1"
//                   >
//                     <AiOutlineDelete />
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Send Message Form */}
//       <div className="bg-white shadow-md rounded-lg p-4">
//         <h2 className="text-xl font-semibold mb-4">Send Message</h2>
//         <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type a message..."
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
//           >
//             <AiOutlineSend className="mr-2" /> Send
//           </button>
//         </form>
//       </div>

//       {/* Delete Confirmation Modal */}
//       <Dialog open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
//         <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
//           <Dialog.Title>Confirm Delete</Dialog.Title>
//           <p>Are you sure you want to delete this message?</p>
//           <div className="flex justify-end mt-4">
//             <button 
//               onClick={handleDeleteMessage} 
//               className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 mr-2">
//               Delete
//             </button>
//             <button 
//               onClick={() => setIsDeleteModalOpen(false)} 
//               className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
//               Cancel
//             </button>
//           </div>
//         </div>
//       </Dialog>
//     </div>
//   );
// }

// export default Messages;
