import React from 'react';

function Home() {
  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to MySalesNav</h1>
        <p className="text-lg">Track, manage, and engage with leads like never before.</p>
        <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded hover:bg-gray-100">
          Get Started
        </button>
      </div>

      {/* Statistics/Features Section */}
      <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">50k+</h2>
          <p className="text-gray-600">Leads Managed</p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">5k+</h2>
          <p className="text-gray-600">Active Users</p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">99.9%</h2>
          <p className="text-gray-600">Uptime</p>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-100 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Boost your sales with our platform</h2>
        <p className="text-lg mb-6">Join thousands of users who are already tracking their sales performance efficiently.</p>
        <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">
          Learn More
        </button>
      </div>
    </div>
  );
}

export default Home;
