import React, { useState } from "react";
import Label from "../zoho/Azoho/Common/Label/Label";
import TextInput from "../zoho/Azoho/Common/Input/Input";
import Checkbox_with_words from "../components/layout/Checkbox_with_words/Checkbox_with_words";

const TaxForm = ({ handleSaveCustomer, handleCancel }) => {
  const initialFormData = {
    customerAccountNo: "",
    name: "",
    type2: "",
    type: "",
    active: false,
  };

  const initialErrors = {
    customerAccountNo: "",
    name: "",
    type2: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Error handling for each field
    if (name === "customerAccountNo" && value.length > 16) {
      setErrors((prev) => ({ ...prev, customerAccountNo: "Ledger Code should not exceed 16 characters." }));
    } else if (name === "name" && value.length > 30) {
      setErrors((prev) => ({ ...prev, name: "Ledger Name should not exceed 30 characters." }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error for this field
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation before submitting
    const hasErrors = Object.values(formData).some((value) => !value);

    if (hasErrors) {
      setErrors((prev) => ({
        ...prev,
        customerAccountNo: !formData.customerAccountNo ? "Please fill in the Tax Code." : "",
        name: !formData.name ? "Please fill in the Tax Percentage." : "",
        type2: !formData.type2 ? "Please select a Tax Component." : "",
      }));
      return;
    }

    console.log("Form submitted:", formData);
    alert("Ledger saved");
    handleSaveCustomer(formData);

    // Clear the form and errors after submission
    handleReset();
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors(initialErrors);
  };

  return (
    <div className="bg-blue-400 mt-44 p-8 min-h-screen">
      <div className="bg-slate-50 rounded-lg p-6">
        <header className="text-center bg-white py-2 border border-blue-300 rounded-full mb-5">
          <h2 className="text-lg font-bold text-blue-500">Tax Creation Form</h2>
        </header>

        {Object.values(errors).some((error) => error) && (
          <div className="text-red-500 font-semibold mb-4">
            {Object.values(errors)
              .filter((error) => error)
              .map((error, index) => (
                <div key={index}>{error}</div>
              ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="customerAccountNo" label="Tax Code" className="font-semibold text-blue-600" />
              <TextInput
                id="customerAccountNo"
                name="customerAccountNo"
                placeholder="Tax Code"
                value={formData.customerAccountNo}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                required
              />
              {errors.customerAccountNo && <span className="text-red-500">{errors.customerAccountNo}</span>}
            </div>

            <div>
              <Label htmlFor="name" label="Tax Percentage" className="font-semibold text-blue-600" />
              <TextInput
                id="name"
                name="name"
                placeholder="Enter Tax Percentage"
                value={formData.name}
                type="number"
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                required
              />
              {errors.name && <span className="text-red-500">{errors.name}</span>}
            </div>

            <div>
              <Label label="Tax Components" className="font-semibold text-blue-600" />
              <select
                name="type2"
                value={formData.type2}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                required
              >
                <option value="">Select Tax Component</option>
                <option value="UTGST">UTGST</option>
                <option value="IGST">IGST</option>
                <option value="SGST">SGST</option>
                <option value="TAD">TAD</option>
                <option value="194A">194A</option>
                <option value="176A">176A</option>
                <option value="TDS">TDS</option>
                <option value="CGST">CGST</option>
              </select>
              {errors.type2 && <span className="text-red-500">{errors.type2}</span>}
            </div>

            <div>
              <Label htmlFor="type" label="Tax Type" className="font-semibold text-blue-600" />
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
              >
                <option value="">Select Tax Type</option>
                <option value="IT">IT</option>
                <option value="TDS">TDS</option>
                <option value="TCS">TCS</option>
                <option value="GST">GST</option>
                <option value="VAT">VAT</option>
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
              onClick={handleReset}
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

export default TaxForm;
