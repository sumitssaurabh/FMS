import React, { useState } from 'react';
import Checkbox_with_words from "../components/layout/Checkbox_with_words/Checkbox_with_words";

const ItemviewPage = ({ item = {}, handleSaveCustomer, toggleView, onClose, handleSaveItem }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...item });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleCompleteEdit = () => {
        handleSaveItem(formData); // Save the changes with updated form data
        setIsEditing(false); // Disable editing
    };

    const handleBack = () => {
        toggleView(); // Switch to the item list view
    };

    return (
        <div className="bg-blue-400 mt-44 p-8 min-h-screen">
            <div className="bg-slate-50 rounded-lg p-6">
            <header className="text-center bg-white py-2 border border-blue-300 rounded-full mb-5">
        <h2 className="text-lg font-bold  text-blue-500">Item view Page</h2>
      </header>


                {/* Buttons for Back, Edit, Save */}
                <div className="flex space-x-4 mb-5">
                    <button
                        onClick={onClose} // Call handleBack on click
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
                            <label className="font-semibold text-blue-600">Item No:</label>
                            <input
                                type="text"
                                name="itemNo"
                                value={formData?.itemNo || ''}
                                className="border border-green-600 w-full p-2 rounded-lg"
                                disabled // Always disabled
                            />
                        </div>
                        <div>
                            <label className="font-semibold text-blue-600">Name</label>
                            <input
                                type="text"
                                name="itemName"
                                value={formData?.itemName || ''}
                                onChange={handleChange}
                                className="border border-green-600 w-full p-2 rounded-lg"
                                disabled={!isEditing} // Enable when editing
                            />
                        </div>
                        <div>
                            <label className="font-semibold text-blue-600">Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="border border-green-600 w-full p-2 rounded-lg"
                                disabled={!isEditing} // Enable when editing
                            >
                                <option value="">Select type (optional)</option>
                                <option value="goods">Goods</option>
                                <option value="service">Service</option>
                            </select>
                        </div>
                        <div>
                            <label className="font-semibold text-blue-600">Description</label>
                            <textarea
                                type="text"
                                name="description"
                                value={formData?.description || ''}
                                onChange={handleChange}
                                className="border border-green-600 w-full p-2 rounded-lg"
                                disabled={!isEditing} // Enable when editing
                                rows="4"
                            />
                        </div>
                        <div>
                            <label className="font-semibold text-blue-600">Unit</label>
                            <select
                                name="unit"
                                value={formData?.unit || ''}
                                onChange={handleChange}
                                className="border border-green-600 w-full p-2 rounded-lg"
                                disabled={!isEditing} // Enable when editing
                            >
                                {/* <option value="">Select unit (optional)</option> */}
                                <option value="MT-Megatons">MT - Megatons</option>
                                <option value="KG-Kilogram">KG - Kilogram</option>
                                <option value="ML-Mega Liter">ML - Mega Liter</option>
                                <option value="Ea-Each">Ea - Each</option>
                                <option value="Pic-Pieces">Pic - Pieces</option>
                                <option value="Box">Box</option>
                                <option value="Carton - Carton Box">Carton - Carton Box</option>
                            </select>
                        </div>
                      

                     

                        <div>
                            <label className="font-semibold text-blue-600">Price</label>
                            <input
                                type="text"
                                name="price"
                                value={formData?.price || ''}
                                onChange={handleChange}
                                className="border border-green-600 w-full p-2 rounded-lg"
                                disabled={!isEditing} // Enable when editing
                            />
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

export default ItemviewPage;
