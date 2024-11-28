import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerList = () => {
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [error, setError] = useState(null);
  const baseUrl = "https://befr8n.vercel.app/fms/api/v0/customer";

  // Fetch customer data
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(baseUrl);

      // Ensure the response data is an array
      if (Array.isArray(response.data)) {
        setCustomerList(response.data);
      } else {
        console.error("Unexpected API response format:", response.data);
        setError("Failed to load customer data.");
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError("Failed to fetch customers. Please try again later.");
    }
  };

  // Handle checkbox selection
  const handleCheckboxChange = (customerId) => {
    setSelectedCustomers((prevSelected) => {
      if (prevSelected.includes(customerId)) {
        // If customer is already selected, remove it
        return prevSelected.filter((id) => id !== customerId);
      } else {
        // If customer is not selected, add it
        return [...prevSelected, customerId];
      }
    });
  };

  // Handle view customer on row click
  const handleViewCustomer = (customerAccountNo) => {
    console.log(`View details for customer account: ${customerAccountNo}`);
    // Implement any further logic (e.g., routing or modal)
  };

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Customer List</h2>

      {/* Display error message if any */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Display loading message if data is not yet fetched */}
      {!error && customerList.length === 0 && (
        <div className="text-gray-500 mb-4">Loading customers...</div>
      )}

      {/* Render customer table only if customerList is valid */}
      {Array.isArray(customerList) && customerList.length > 0 && (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-300">Select</th>
              <th className="px-4 py-2 border border-gray-300">Code</th>
              <th className="px-4 py-2 border border-gray-300">Name</th>
              <th className="px-4 py-2 border border-gray-300">Registration</th>
              <th className="px-4 py-2 border border-gray-300">Address</th>
              <th className="px-4 py-2 border border-gray-300">Contact</th>
              <th className="px-4 py-2 border border-gray-300">Currency</th>
              <th className="px-4 py-2 border border-gray-300">PAN</th>
              <th className="px-4 py-2 border border-gray-300">Active</th>
            </tr>
          </thead>
          <tbody>
            {customerList.map((customer, index) => (
              <tr key={customer._id || index}>
                <td className="px-4 py-2 border border-gray-300">
                  <input
                    type="checkbox"
                    checked={selectedCustomers.includes(customer._id)}
                    onChange={() => handleCheckboxChange(customer._id)}
                  />
                </td>
                <td
                  className="px-4 py-2 border border-gray-300 cursor-pointer text-blue-500 underline"
                  onClick={() => handleViewCustomer(customer.customerAccountNo)}
                >
                  {customer.code || "N/A"}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {customer.name || "N/A"}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {customer.registrationNum || "N/A"}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {customer.address || "N/A"}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {customer.contactNum || "N/A"}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {customer.currency || "N/A"}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {customer.panNum || "N/A"}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {customer.active ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Display selected customers */}
      {selectedCustomers.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Selected Customers</h3>
          <ul>
            {selectedCustomers.map((customerId) => (
              <li key={customerId}>
                {customerList.find((customer) => customer._id === customerId)?.name ||
                  "Unknown Customer"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
