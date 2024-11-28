import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CustomerViewPage = () => {
  const [customer, setCustomer] = useState(null);
  const { customerId } = useParams(); // Get the customerId from the URL

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`https://befr8n.vercel.app/fms/api/v0/customer/${customerId}`);
        setCustomer(response.data.data); // Set the customer data
      } catch (error) {
        console.error("Failed to fetch customer details:", error);
      }
    };

    fetchCustomer();
  }, [customerId]);

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <header className="text-center mb-5">
        <h2 className="text-lg font-bold">Customer Details</h2>
      </header>

      <div className="border border-green-500 bg-white p-4 rounded-lg">
        <h3 className="text-xl font-semibold">Customer Information</h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div><strong>Name:</strong> {customer.name}</div>
          <div><strong>Customer Account No:</strong> {customer.code}</div>
          <div><strong>Registration No:</strong> {customer.registrationNum}</div>
          <div><strong>Address:</strong> {customer.address}</div>
          <div><strong>Contact No:</strong> {customer.contactNum}</div>
          <div><strong>Currency:</strong> {customer.currency}</div>
          <div><strong>PAN:</strong> {customer.panNum}</div>
          <div><strong>Active:</strong> {customer.active ? "Yes" : "No"}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomerViewPage;
