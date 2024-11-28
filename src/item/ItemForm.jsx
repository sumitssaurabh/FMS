import React, { useState } from "react";
import Label from "../zoho/Azoho/Common/Label/Label";
import TextInput from "../zoho/Azoho/Common/Input/Input";
import Checkbox_with_words from "../components/layout/Checkbox_with_words/Checkbox_with_words";

const ItemForm = ({ handleSaveItem, handleCancel }) => {
  const initialFormState = {
    itemNo: "",
    itemName: "",
    type: "",
    description: "",
    unit: "",
    price: "",
    active: false,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Input validation directly within handleChange
    const newValue = 
      name === "itemNo" ? value.replace(/[^a-zA-Z0-9]/g, "") : 
      name === "itemName" ? value.charAt(0).toUpperCase() + value.slice(1) :
      name === "price" ? value.replace(/[^0-9.]/g, "") : // Allows decimal points in price
      value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (!formData.itemNo || !formData.itemName || !formData.price 
        || (formData.description && formData.description.split('\n').length > 4) ||
        Number(formData.price) <= 0) {
      setError("Please fill all required fields with valid data. Item Name should start with a capital letter. Unit must be selected, and Price should be numeric.");
      return;
    }

    // Saving data
    handleSaveItem(formData);
    alert("Item saved successfully!");
    setError("");
    setFormData(initialFormState);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setError("");
  };

  return (
    <div className="bg-blue-400 mt-44 p-8 min-h-screen">
      <div className="bg-slate-50 rounded-lg p-6">
      <header className="text-center bg-white py-2 border border-blue-300 rounded-full mb-5">
        <h2 className="text-lg font-bold  text-blue-500">Item Creation Form </h2>
      </header>


        {error && <div className="text-red-500 font-semibold mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label label="Item No." className="font-semibold text-blue-600" />
              <TextInput
                name="itemNo"
                placeholder="Enter item number"
                value={formData.itemNo}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                required
              />
            </div>

            <div>
              <Label label="Item Name" className="font-semibold text-blue-600" />
              <TextInput
                name="itemName"
                placeholder="Enter item name"
                value={formData.itemName}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                required
              />
            </div>

            <div>
              <Label label="Type" className="font-semibold text-blue-600" />
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
              >
                <option value="">Select type (optional)</option>
                <option value="goods">Goods</option>
                <option value="service">Service</option>
              </select>
            </div>

            <div>
              <Label label="Description" className="font-semibold text-blue-600" />
              <textarea
                name="description"
                placeholder="Enter item description"
                value={formData.description}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                rows="4"
              />
            </div>

            <div>
              <Label label="Unit" className="font-semibold text-blue-600" />
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                required
              >
                <option value="">Select unit</option>
                <option value="MT-Megatons">MT-Megatons</option>
                <option value="KG-Kilogram">KG-Kilogram</option>
                <option value="ML-Mega Liter">ML-Mega Liter</option>
                <option value="Ea-Each">Ea-Each</option>
                <option value="Pic-Pieces">Pic-Pieces</option>
                <option value="Box-Box">Box-Box</option>
                <option value="Carton-Carton Box">Carton-Carton Box</option>
              </select>
            </div>

            <div>
              <Label label="Price" className="font-semibold text-blue-600" />
              <TextInput
                name="price"
                placeholder="Enter item price"
                value={formData.price}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                required
                type="text"
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
            <button
              type="button"
              className="ml-3 bg-zinc-700 text-white py-2 px-4 rounded-full mt-4"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
