import React, { useState } from "react";
import TermsAndCondition from "../../Term and condition/Term_and_condition";
import "./Checkbox_with_words.css";

const CheckboxWithWords = ({ 
  cls, 
  text, 
  className, 
  disabled,
  onCheckboxChange, 
  label, 
  linkText, 
  linkUrl, 
  checked, 
  onChange, 
  name // Added name prop here
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckboxChange = (e) => {
    onCheckboxChange(e.target.checked); // Calling the passed function to handle checkbox change
  };

  const handleLinkClick = (e) => {
    e.preventDefault(); 
    setIsModalOpen(true); // Open modal when link is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
    <div className="flex">
      <div className="font-light flex items-center">
        <span>
          <input
            className="ml-1.5 text-white bg-black checkbox"
            type="checkbox"
            name={name} // Using the passed name prop
            checked={checked} // Controlled checkbox state
            onChange={onChange || handleCheckboxChange} 
            // disabled={!isEditing}
          />
        </span>
        <h6 className={cls}>{label}</h6>
        <a href={linkUrl} onClick={handleLinkClick} className={className}>
          {linkText}
        </a>
        <h6 className={className}>{text}</h6>
      </div>

      {/* Modal for Terms and Conditions */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Modal overlay */}
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          
          {/* Modal content */}
          <div className="term bg-white rounded-lg p-6 h-3/4 overflow-auto relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-black">
              Close
            </button>
            <TermsAndCondition /> {/* Terms and Conditions Component */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckboxWithWords;
