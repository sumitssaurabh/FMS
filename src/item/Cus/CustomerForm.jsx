import React, { useState } from "react";
import Label from "../../zoho/Azoho/Common/Label/Label";
import TextInput from "../../zoho/Azoho/Common/Input/Input";
import Checkbox_with_words from "../../components/layout/Checkbox_with_words/Checkbox_with_words";

const CustomerForm = ({ handleSaveCustomer, handleCancel }) => {
  const [formData, setFormData] = useState({
    customerAccountNo: "",
    name: "",
    customerAddress: "",
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
    } 
    else if (name === "pan") {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate that PAN is exactly 10 characters
    if (formData.pan.length !== 10) {
      setError("PAN must be exactly 10 characters long.");
      return;
    }
  
    // Validate that required fields are not empty
    if (!formData.customerAccountNo || !formData.name || !formData.customerAddress || !formData.contactNo) {
      setError("Please fill in all required fields.");
      return;
    }
  
    // Validate that Contact No. is exactly 10 digits
    if (formData.contactNo.length !== 10) {
      setError("Contact No. must be exactly 10 digits.");
      return;
    }
    const createCustomer = async (e) => {
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
    };
    // Prepare the payload
    const payload = {
      _id:formData._id,
      code: formData.customerAccountNo,
      name: formData.name,
      address: formData.customerAddress,
      currency: formData.currency,
      registrationNum: formData.registrationNo,
      panNum: formData.pan,
      contactNum: formData.contactNo,
      active: formData.active,
      __v: formData.v,
    };
  
    try {
      const response = await fetch("https://befr8n.vercel.app/fms/api/v0/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data); // Handle the response data
  
      // Alert for success
      alert("Customer Saved");
      createCustomer();
      // Optionally, reset the form or handle success further (e.g., redirect)
      handleReset(); // You can reset the form if you want after successful save
  
      // Navigate to customer list page
      navigate("/customer-list");
  
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Error saving customer. Please try again.");
    }
  };
  
  const handleReset = () => {
    setFormData({
      customerAccountNo: "",
      name: "",
      customerAddress: "",
      currency: "",
      registrationNo: "",
      pan: "",
      contactNo: "",
      active: false,
    });
    setError(""); // Clear error when resetting form
  };
  const createCustomer = async (e) => {
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
  };
  return (
    <div className="bg-blue-400 mt-44 p-8 min-h-screen">
      <div className="bg-slate-50 rounded-lg p-6">
        <header className="text-center bg-white py-2 border border-blue-300 rounded-full mb-5">
          <h2 className="text-lg font-bold text-blue-500">Customer Creation Form </h2>
        </header>

        {error && <div className="text-red-500 font-semibold mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label label="Customer Account No." className="font-semibold text-blue-600" />
              <TextInput
                name="customerAccountNo"
                placeholder="Customer Account No."
                value={formData.customerAccountNo}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                required
              />
            </div>

            <div>
              <Label label="Customer Name" className="font-semibold text-blue-600" />
              <TextInput
                name="name"
                placeholder="Name"
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
              <Label label="Customer Address" className="font-semibold text-blue-600" />
              <textarea
                name="customerAddress"
                placeholder="Customer Address"
                value={formData.customerAddress}
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

export default CustomerForm;
