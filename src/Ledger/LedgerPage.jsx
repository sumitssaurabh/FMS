import React, { useState } from "react";
import CustomerForm from "./LedgerForm";
import CustomerList from "./LedgerList";
import CustomerViewPage from "./LedgerViewPage"; // Import the detail page

const Page = () => {
  const [view, setView] = useState("list"); // Default to show CustomerList
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Store the selected customer

  // Handles saving customer data (both adding new or updating existing)
  const handleSaveCustomer = (customer) => {
    setCustomers((prevCustomers) => {
      const existingCustomerIndex = prevCustomers.findIndex(
        (cust) => cust.customerAccountNo === customer.customerAccountNo
      );

      if (existingCustomerIndex !== -1) {
        // Update existing customer
        const updatedCustomers = [...prevCustomers];
        updatedCustomers[existingCustomerIndex] = customer;
        setView("details");
        return updatedCustomers;
      } else {
        // Add new customer
        setView("list"); // Toggle to CustomerList after saving
        return [...prevCustomers, customer];
      }
    });
  };

  // Shows the CustomerForm when the "Add" button is clicked
  const handleAddCustomer = () => {
    setSelectedCustomer(null); // Reset selected customer for new entry
    setView("form");
  };

  // Handles view toggle to customer details
  const handleViewCustomer = (customerAccountNo) => {
    const customer = customers.find(
      (cust) => cust.customerAccountNo === customerAccountNo
    );
    setSelectedCustomer(customer); // Set the selected customer
    setView("details"); // Switch to the detail view
  };

  // Handles customer deletion
  const handleDeleteCustomer = (selectedCustomers) => {
    setCustomers((prevCustomers) =>
      prevCustomers.filter(
        (customer) => !selectedCustomers.includes(customer.customerAccountNo)
      )
    );
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
            handleSaveCustomer={handleSaveCustomer}
            handleCancel={handleCancel} // Pass the cancel handler
          />
        )}

        {view === "list" && (
          <CustomerList
            customers={customers}
            handleAddCustomer={handleAddCustomer}
            handleViewCustomer={handleViewCustomer} // Pass the view handler
            handleDeleteCustomer={handleDeleteCustomer}
          />
        )}

        {view === "details" && selectedCustomer && (
          <CustomerViewPage
            customer={selectedCustomer}
            handleSaveCustomer={handleSaveCustomer} // Pass the save handler
            toggleView={() => setView("list")} // Pass a function to toggle back to the list
          />
        )}
      </div>
    </div>
  );
};

export default Page;
