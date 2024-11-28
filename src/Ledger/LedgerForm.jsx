import React, { useState } from "react";
import Label from "../zoho/Azoho/Common/Label/Label";
import TextInput from "../zoho/Azoho/Common/Input/Input";
import Checkbox_with_words from "../components/layout/Checkbox_with_words/Checkbox_with_words";

const LedgerForm = ({ handleSaveCustomer, handleCancel }) => {
  const initialFormData = {
    customerAccountNo: "",
    name: "",
    currency: "",
    type: "",
    active: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "currency") {
      if (value.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: value.toUpperCase() }));
      }
    } else if (name === "name") {
      if (value.length <= 30) {
        setFormData((prev) => ({
          ...prev,
          [name]: value.charAt(0).toUpperCase() + value.slice(1),
        }));
      }
    } else if (name === "customerAccountNo") {
      if (value.length <= 16) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields and length constraints
    if (!formData.customerAccountNo || !formData.name || !formData.currency) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.customerAccountNo.length > 16) {
      setError("Ledger Code should not exceed 16 characters.");
      return;
    }

    if (formData.name.length > 30) {
      setError("Ledger Name should not exceed 30 characters.");
      return;
    }

    if (formData.currency.length > 10) {
      setError("Currency should not exceed 10 characters.");
      return;
    }

    console.log("Form submitted:", formData);
    alert("Ledger saved");
    
    // Clear the form and error after submission
    setError("");
    setFormData(initialFormData);
    handleSaveCustomer(formData);
  };
  
  return (
    <div className="bg-blue-400 mt-44 p-8 min-h-screen">
      <div className="bg-slate-50 rounded-lg p-6">
      <header className="text-center bg-white py-2 border border-blue-300 rounded-full mb-5">
        <h2 className="text-lg font-bold  text-blue-500"> Ledger Creation Form </h2>
      </header>

        {error && <div className="text-red-500 font-semibold mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="customerAccountNo" label="Ledger Code" className="font-semibold text-blue-600" />
              <TextInput
                id="customerAccountNo"
                name="customerAccountNo"
                placeholder="Ledger Code"
                value={formData.customerAccountNo}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                required
              />
            </div>

            <div>
              <Label htmlFor="name" label="Ledger Name" className="font-semibold text-blue-600" />
              <TextInput
                id="name"
                name="name"
                placeholder="Ledger Name"
                value={formData.name}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                required
              />
            </div>

            <div>
              <Label htmlFor="currency" label="Currency" className="font-semibold text-blue-600" />
              <TextInput
                id="currency"
                name="currency"
                placeholder="Enter Currency"
                value={formData.currency}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                required
              />
            </div>

            <div>
              <Label htmlFor="type" label="Type" className="font-semibold text-blue-600" />
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
              >
                <option value="">Select type (optional)</option>
                <option value="Assets">Assets</option>
                <option value="Liability">Liability</option>
                <option value="Expense">Expense</option>
                <option value="Revenue">Revenue</option>
                <option value="Profit and Loss">Profit and Loss</option>
                <option value="Balance Sheet">Balance Sheet</option>
              </select>
            </div>

            <div className="flex items-center">
              <Label label="Active" className="font-semibold text-blue-600" />
              <Checkbox_with_words
                name="active"
                cls="m-1 text-blue-700"
                checked={formData.active}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-full mt-4">
              Save
            </button>
            <button
              type="button"
              onClick={() => setFormData(initialFormData)}
              className="bg-red-500 text-white py-2 px-4 rounded-full mt-4 ml-4"
            >
              Reset
            </button>
            <button type="button" onClick={handleCancel} className="ml-3 bg-zinc-700 text-white py-2 px-4 rounded-full mt-4">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LedgerForm;
