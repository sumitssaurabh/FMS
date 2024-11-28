import React, { useState } from "react";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";
import CustomerViewPage from "./CustomerViewPage"; // Import the detail page

const Page = () => {
  const [view, setView] = useState("list"); // Default to show CustomerList
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Store the selected customer

  // Handles saving customer data (both adding new or updating existing)
  const handleSaveCustomer  = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        mergedUrl,
        { ...newCustomer },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Customer created:", response.data);
      setMessage("Customer created successfully!");
      setCustomerList((prev) => [...prev, response.data.data]);
      setNewCustomer({
        name: "",
        contactNum: "",
        currency: "",
        registrationNum: "",
        panNum: "",
        address: "",
        active: true,
      });
    } catch (error) {
      if (error.response) {
        console.error(`Error in response: ${error.response.data}`);
        setMessage(error.response.data.message || "Error creating customer");
      } else if (error.request) {
        console.error(`Error in request: ${error.request}`);
        setMessage("Network error, please try again.");
      } else {
        console.error(`Error: ${error.message}`);
        setMessage("An unexpected error occurred.");
      }
    }
    setView("list");
  };


  // Shows the CustomerForm when the "Add" button is clicked
  const handleAddCustomer = () => {
    setSelectedCustomer(null); // Reset selected customer for new entry
    setView("form");
  };

  // Handle viewing the details of a customer
  const handleViewCustomer = (customerId) => {
    const customer = customers.find((cust) => cust.id === customerId);
    setSelectedCustomer(customer);
    setView("details");
  };

  // Handles cancel operation to return to customer list
  const handleCancel = () => {
    setView("list");
  };

  return (                                                                                                        
    <div className="bg-blue-400 p-8 min-h-screen">
      <div className="bg-slate-50 rounded-lg p-6">
        {view === "form" && (
          <CustomerForm
            customer={selectedCustomer} // Pass selected customer for editing
            handleSaveCustomer={handleSaveCustomer}
            handleCancel={handleCancel} // Pass the cancel handler                                                                                                                                                                                                                   
          />
        )}

        {view === "list" && (
          <CustomerList
            customers={customers}
            handleAddCustomer={handleAddCustomer}
            handleViewCustomer={handleViewCustomer} // Pass the view handler
          />
        )}

        {view === "details" && selectedCustomer && (
          <CustomerViewPage
            customer={selectedCustomer} // Pass selected customer data
            toggleView={() => setView("list")} // Function to toggle back to the list
          />
        )}
      </div>
    </div>
  );
};

export default Page;
