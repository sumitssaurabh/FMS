import React, { useState } from "react";
import Label from "../zoho/Azoho/Common/Label/Label";
import TextInput from "../zoho/Azoho/Common/Input/Input";
import Checkbox_with_words from "../components/layout/Checkbox_with_words/Checkbox_with_words";

const VendorForm = ({ handleSaveCustomer, handleCancel }) => {
  const [formData, setFormData] = useState({
    vendorAccountNo: "",
    name: "",
    Address: "",
    currency: "",
    registrationNo: "",
    pan: "",
    contactNo: "", // Only 10 digits allowed
    active: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (name === "pan") {
      const uppercaseValue = value.toUpperCase();
      if (/^[A-Z0-9]*$/.test(uppercaseValue) && uppercaseValue.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: uppercaseValue }));
      }
    } else if (name === "registrationNo") {
      const uppercaseValue = value.toUpperCase();
      if (/^[A-Z0-9]*$/.test(uppercaseValue) && uppercaseValue.length <= 16) {
        setFormData((prev) => ({ ...prev, [name]: uppercaseValue }));
      }
    } else if (name === "contactNo") {
      const numericValue = value.replace(/\D/g, ""); // Remove all non-numeric characters
      if (numericValue.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: numericValue }));
      }
    } else if (name === "currency") {
      const uppercaseValue = value.toUpperCase(); // Convert to uppercase
      setFormData((prev) => ({ ...prev, [name]: uppercaseValue }));
    } else if (name === "name") {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1); // Capitalize first letter
      setFormData((prev) => ({ ...prev, [name]: capitalizedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that PAN is exactly 10 characters
    if (formData.pan.length !== 10) {
      setError("PAN must be exactly 10 characters long.");
      return;
    }

    // Validate that required fields are not empty
  

    // Validate that Contact No. is exactly 10 digits
    if (formData.contactNo.length !== 10) {
      setError("Contact No. must be exactly 10 digits.");
      return;
    }

    console.log("Form submitted:", formData);
    handleSaveCustomer(formData);
    alert("Vendor saved");

    // Clear the form and error after submission
    setError("");
    setFormData({
      vendorAccountNo: "",
      name: "",
      vendorAddress: "",
      currency: "",
      registrationNo: "",
      pan: "",
      contactNo: "",
      active: false,
    });
  };

  return (
    <div className="bg-blue-400 mt-44 p-8 min-h-screen">
      <div className="bg-slate-50 rounded-lg p-6">
        <header className="text-center bg-white py-2 border border-blue-300 rounded-full mb-5">
          <h2 className="text-lg font-bold text-blue-500">Vendor Creation Form</h2>
        </header>

        {error && <div className="text-red-500 font-semibold mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label label="Vendor Account No." className="font-semibold text-blue-600" />
              <TextInput
                name="vendorAccountNo"
                placeholder="Vendor Account No."
                value={formData.vendorAccountNo}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                required
              />
            </div>

            <div>
              <Label label="Vendor Name" className="font-semibold text-blue-600" />
              <TextInput
                name="name"
                placeholder=" Vendor Name"
                value={formData.name}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                required
              />
            </div>

            <div>
              <Label label="Contact No." className="font-semibold text-blue-600" />
              <TextInput
                name="contactNo"
                placeholder="Enter Contact No. (10 digits)"
                value={formData.contactNo}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                required
              />
            </div>

            <div>
              <Label label="Currency" className="font-semibold text-blue-600" />
              <TextInput
                name="currency"
                placeholder="Enter Currency"
                value={formData.currency}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                required
              />
            </div>

            <div>
              <Label label="Registration No" className="font-semibold text-blue-600" />
              <TextInput
                name="registrationNo"
                placeholder="Enter Registration No."
                value={formData.registrationNo}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                required
              />
            </div>

            <div>
              <Label label="PAN No." className="font-semibold text-blue-600" />
              <TextInput
                name="pan"
                placeholder="Enter PAN No."
                value={formData.pan}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                required
              />
            </div>

            <div>
              <Label label="Vendor Address" className="font-semibold text-blue-600" />
              <textarea
                name="Address"
                placeholder="Address"
                value={formData.Address}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                rows="4"
                required
              />
            </div>
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

          <div className="text-center">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-full mt-4">
              Save
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  vendorAccountNo: "",
                  name: "",
                  Address: "",
                  currency: "",
                  registrationNo: "",
                  pan: "",
                  contactNo: "",
                  active: false,
                })
              }
              className="bg-red-500 text-white py-2 px-4 rounded-full mt-4 ml-4"
            >
              Reset
            </button>
            <button type="button" onClick={handleCancel} className="ml-3 bg-zinc-600 text-white py-2 px-4 rounded-full mt-4">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorForm;
