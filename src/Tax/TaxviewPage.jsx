import React, { useState } from "react";
import Checkbox_with_words from "../components/layout/Checkbox_with_words/Checkbox_with_words";
import Label from "../zoho/Azoho/Common/Label/Label";

const TaxviewPage = ({ customer, handleSaveCustomer, toggleView }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...customer });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure currency, pan, and registrationNo are in uppercase
    if (name === "currency") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.toUpperCase(),
      }));
      return;
    }

    // Validate input lengths
    if (name === "customerAccountNo" && value.length > 16) {
      return; // Ignore change if exceeding 16 characters
    }
    if (name === "name" && value.length > 30) {
      return; // Ignore change if exceeding 30 characters
    }
    if (name === "currency" && value.length > 10) {
      return; // Ignore change if exceeding 10 characters
    }

    // Update state for other fields
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    handleSaveCustomer(formData); // Save the customer data
    setIsEditing(false); // Exit edit mode
  };

  const handleCompleteEdit = () => {
    handleSave(); // Save the changes before disabling edit
    setIsEditing(false); // Disable editing
  };

  const handleAddCustomer = () => {
    toggleView(); // Switch to the add customer view
  };

  return (
    <div className="bg-blue-400 mt-44 p-8 min-h-screen">
      <div className="bg-slate-50 rounded-lg p-6">
      <header className="text-center bg-white py-2 border border-blue-300 rounded-full mb-5">
        <h2 className="text-lg font-bold  text-blue-500">Ledger View Page</h2>
      </header>

        {/* Buttons for Back, Edit, Save, and Add New Customer */}
        <div className="flex space-x-4 mb-5">
          <button
            onClick={handleAddCustomer}
            className="px-3 border border-blue-500 h-10 bg-white rounded-md hover:bg-gray-100"
          >
            Back
          </button>
          <button
            onClick={handleEdit}
            className="px-3 border border-green-500 h-10 bg-white rounded-md hover:bg-gray-100"
            disabled={isEditing} // Disable if already in edit mode
          >
            Edit
          </button>
          <button
            onClick={handleCompleteEdit}
            className="px-3 border border-green-500 h-10 bg-white rounded-md hover:bg-gray-100"
            disabled={!isEditing} // Disable if not in edit mode
          >
            Save
          </button>
        </div>

        <div className="mt-10 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-blue-600">Ledger Code </label>
              <input
                type="text"
                name="customerAccountNo"
                value={formData.customerAccountNo}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                disabled={!isEditing} // Enable only in edit mode
              />
            </div>

            <div>
              <label className="font-semibold text-blue-600">Ledger Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                disabled={!isEditing} // Enable when editing
              />
            </div>

           
            <div>
              <Label htmlFor="type" label="Tax component" className="font-semibold text-blue-600" />
              <select
                name="type2"
                value={formData.type2}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                disabled={!isEditing} 
              >
              
                <option value="Assets">Assets</option>
                <option value="Liability">Liability</option>
                <option value="Expense">Expense</option>
                <option value="Revenue">Revenue</option>
                <option value="Profit and Loss">Profit and Loss</option>
                <option value="Balance Sheet">Balance Sheet</option>
              </select>
            </div>
            <div>
              <Label htmlFor="type" label="Tax Type" className="font-semibold text-blue-600" />
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                disabled={!isEditing} 
              >
              
                <option value="Assets">Assets</option>
                <option value="Liability">Liability</option>
                <option value="Expense">Expense</option>
                <option value="Revenue">Revenue</option>
                <option value="Profit and Loss">Profit and Loss</option>
                <option value="Balance Sheet">Balance Sheet</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-blue-600">Active</label>
              <Checkbox_with_words
                name="active"
                cls="m-1 text-blue-700"
                checked={formData?.active || false}
                onChange={(e) => {
                  if (isEditing) { // Only allow change if in editing mode
                    setFormData((prevData) => ({
                      ...prevData,
                      active: e.target.checked,
                    }));
                  }
                }}
                disabled={!isEditing} // Disable when not editing
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxviewPage;
