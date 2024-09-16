import React, { useState, useEffect } from 'react';
import { getLeads, createLead, deleteLead } from '../services/leadService';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [leadData, setLeadData] = useState({ name: '', email: '', company: '', phone: '' });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const leadsData = await getLeads();
    setLeads(leadsData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeadData({ ...leadData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createLead(leadData);
    fetchLeads();
    setLeadData({ name: '', email: '', company: '', phone: '' }); // Clear form
  };

  const handleDelete = async (id) => {
    await deleteLead(id);
    fetchLeads();
  };

  return (
    <div className="container">
      <h2>Leads</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={leadData.name} onChange={handleInputChange} required />
        <input name="email" placeholder="Email" value={leadData.email} onChange={handleInputChange} required />
        <input name="company" placeholder="Company" value={leadData.company} onChange={handleInputChange} required />
        <input name="phone" placeholder="Phone" value={leadData.phone} onChange={handleInputChange} />
        <button type="submit">Add Lead</button>
      </form>

      <ul>
        {leads.map((lead) => (
          <li key={lead._id}>
            {lead.name} - {lead.email} - {lead.company}
            <button onClick={() => handleDelete(lead._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leads;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
// import { Dialog } from '@headlessui/react';
// import { FaPlus } from 'react-icons/fa';

// function Leads() {
//   const [leads, setLeads] = useState([]);
//   const [selectedLead, setSelectedLead] = useState(null);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

//   const [newLead, setNewLead] = useState({
//     name: '',
//     email: '',
//     company: ''
//   });

//   const [editLead, setEditLead] = useState({
//     name: '',
//     email: '',
//     company: ''
//   });

//   useEffect(() => {
//     // Fetch leads from the backend
//     axios.get('http://localhost:5000/api/leads')
//       .then(response => setLeads(response.data))
//       .catch(error => console.error('Error fetching leads:', error));
//   }, []);

//   const handleAddLead = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/leads', newLead);
//       setLeads([...leads, response.data]);
//       setIsAddModalOpen(false);
//       setNewLead({ name: '', email: '', company: '' }); // Reset form
//     } catch (error) {
//       console.error('Error adding lead:', error);
//     }
//   };

//   const handleEditLead = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(`http://localhost:5000/api/leads/${selectedLead._id}`, editLead);
//       setLeads(leads.map(lead => lead._id === response.data._id ? response.data : lead));
//       setIsEditModalOpen(false);
//       setEditLead({ name: '', email: '', company: '' }); // Reset form
//     } catch (error) {
//       console.error('Error editing lead:', error);
//     }
//   };

//   const handleDeleteLead = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/leads/${selectedLead._id}`);
//       setLeads(leads.filter(lead => lead._id !== selectedLead._id));
//       setIsDeleteModalOpen(false);
//     } catch (error) {
//       console.error('Error deleting lead:', error);
//     }
//   };

//   const handleViewLead = (lead) => {
//     setSelectedLead(lead);
//     setIsViewModalOpen(true);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {/* Add Lead Button */}
//       <div className="mb-6 flex justify-end">
//         <button 
//           onClick={() => setIsAddModalOpen(true)}
//           className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 flex items-center">
//           <FaPlus className="mr-2" /> Add Lead
//         </button>
//       </div>

//       {/* Leads Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow-md rounded-lg">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="py-2 px-4">Name</th>
//               <th className="py-2 px-4">Email</th>
//               <th className="py-2 px-4">Company</th>
//               <th className="py-2 px-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leads.map(lead => (
//               <tr key={lead._id}>
//                 <td className="py-2 px-4">{lead.name}</td>
//                 <td className="py-2 px-4">{lead.email}</td>
//                 <td className="py-2 px-4">{lead.company}</td>
//                 <td className="py-2 px-4">
//                   <button 
//                     onClick={() => handleViewLead(lead)} 
//                     className="px-2 py-1 text-blue-600 hover:bg-blue-100 rounded">
//                     <AiOutlineEye className="inline" />
//                   </button>
//                   <button 
//                     onClick={() => {
//                       setEditLead(lead);
//                       setSelectedLead(lead);
//                       setIsEditModalOpen(true);
//                     }} 
//                     className="px-2 py-1 text-yellow-600 hover:bg-yellow-100 rounded mx-2">
//                     <AiOutlineEdit className="inline" />
//                   </button>
//                   <button 
//                     onClick={() => {
//                       setSelectedLead(lead);
//                       setIsDeleteModalOpen(true);
//                     }} 
//                     className="px-2 py-1 text-red-600 hover:bg-red-100 rounded">
//                     <AiOutlineDelete className="inline" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Lead Modal */}
//       <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
//         <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
//           <Dialog.Title>Add Lead</Dialog.Title>
//           <form onSubmit={handleAddLead}>
//             <div className="mb-4">
//               <label htmlFor="name" className="block text-gray-700">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 value={newLead.name}
//                 onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-gray-700">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={newLead.email}
//                 onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="company" className="block text-gray-700">Company</label>
//               <input
//                 type="text"
//                 id="company"
//                 value={newLead.company}
//                 onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               >
//                 Add Lead
//               </button>
//             </div>
//           </form>
//         </div>
//       </Dialog>

//       {/* Edit Lead Modal */}
//       <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
//         <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
//           <Dialog.Title>Edit Lead</Dialog.Title>
//           <form onSubmit={handleEditLead}>
//             <div className="mb-4">
//               <label htmlFor="editName" className="block text-gray-700">Name</label>
//               <input
//                 type="text"
//                 id="editName"
//                 value={editLead.name}
//                 onChange={(e) => setEditLead({ ...editLead, name: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="editEmail" className="block text-gray-700">Email</label>
//               <input
//                 type="email"
//                 id="editEmail"
//                 value={editLead.email}
//                 onChange={(e) => setEditLead({ ...editLead, email: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="editCompany" className="block text-gray-700">Company</label>
//               <input
//                 type="text"
//                 id="editCompany"
//                 value={editLead.company}
//                 onChange={(e) => setEditLead({ ...editLead, company: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         </div>
//       </Dialog>

//       {/* View Lead Modal */}
//       <Dialog open={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
//         <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
//           <Dialog.Title>Lead Details</Dialog.Title>
//           {selectedLead && (
//             <div>
//               <p><strong>Name:</strong> {selectedLead.name}</p>
//               <p><strong>Email:</strong> {selectedLead.email}</p>
//               <p><strong>Company:</strong> {selectedLead.company}</p>
//             </div>
//           )}
//           <button onClick={() => setIsViewModalOpen(false)} className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Close</button>
//         </div>
//       </Dialog>

//       {/* Delete Confirmation Modal */}
//       <Dialog open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
//         <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
//           <Dialog.Title>Confirm Delete</Dialog.Title>
//           <p>Are you sure you want to delete this lead?</p>
//           <div className="flex justify-end mt-4">
//             <button 
//               onClick={handleDeleteLead} 
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

// export default Leads;
