import React from "react";
import Label from "../src/zoho/Azoho/Common/Label/Label";
import TextInput from "../src/zoho/Azoho/Common/Input/Input";

const Address = () => {
  return (
    <div className="bg-blue-400 mt-44 p-8 min-h-screen">
      <div className="bg-slate-50 rounded-lg p-6">
        <header className="text-center bg-white py-2 border border-blue-300 rounded-full mb-5">
          <h2 className="font-semibold text-blue-600">Payment and Bank Details</h2>
        </header>
        <div className="grid grid-cols-2 gap-8"> {/* 2 columns layout */}
          {/* Left Column */}
          <div className="space-y-6">
          <header className="text-center bg-white py-2 border border-blue-300 rounded-full mb-5">
          <h2 className="font-semibold text-blue-600">Biling Address</h2>
        </header> 
    
            <div className="flex flex-col">
              <Label label="Company Name" className="font-semibold text-blue-600" />
              <TextInput
                placeholder="Enter your Company Name"
                className="border border-green-600 w-full p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <Label label="Country/Region" className="font-semibold text-blue-600" />
              <TextInput
                placeholder=" Enter your Country/Region"
                className="border border-green-600 w-full p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <Label label="Street " className="font-semibold text-blue-600" />
              <TextInput
                placeholder="Enter your Street "
                className="border border-green-600 w-full p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <Label label="City" className="font-semibold text-blue-600" />
              <TextInput
                placeholder="Enter your City"
                className="border border-green-600 w-full p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <Label label="State/Provice" className="font-semibold text-blue-600" />
              <TextInput
                placeholder="Enter your State/Provice"
                className="border border-green-600 w-full p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <Label label="Postal code " className="font-semibold text-blue-600" />
              <TextInput
                placeholder="Enter your Postal code "
                className="border border-green-600 w-full p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <Label label="GSTiin No." className="font-semibold text-blue-600" />
              <TextInput
                placeholder="Enter your GSTiin No. "
                className="border border-green-600 w-full p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <Label label="PAN no." className="font-semibold text-blue-600" />
              <TextInput
                placeholder="Enter your PAN no."
                className="border border-green-600 w-full p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <Label label="Contact Details" className="font-semibold text-blue-600" />
              <TextInput
                placeholder="Enter your Contact Details"
                className="border border-green-600 w-full p-2 rounded-lg"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
          <header className="text-center bg-white py-2 border border-blue-300 rounded-full mb-5">
          <h2 className="font-semibold text-blue-600">Shipping Address</h2>
        </header> 
    
            <div className="flex flex-col">
              <Label label="Company Name" className="font-semibold text-blue-600" />
              <TextInput
                placeholder="Enter your Company Name"
                className="border border-green-600 w-full p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <Label label="Country/Region" className="font-semibold text-blue-600" />
              <TextInput
                placeholder=" Enter your Country/Region"
                className="border border-green-600 w-full p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <Label label="Street " className="font-semibold text-blue-600" />
              <TextInput
                placeholder="Enter your Street "
                className="border border-green-600 w-full p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <Label label="City" className="font-semibold text-blue-600" />
              <TextInput
                placeholder="Enter your City"
                className="border border-green-600 w-full p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <Label label="State/Provice" className="font-semibold text-blue-600" />
              <TextInput
                placeholder="Enter your State/Provice"
                className="border border-green-600 w-full p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <Label label="Postal code " className="font-semibold text-blue-600" />
              <TextInput
                placeholder="Enter your Postal code "
                className="border border-green-600 w-full p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <Label label="GSTiin No." className="font-semibold text-blue-600" />
              <TextInput
                placeholder="Enter your GSTiin No. "
                className="border border-green-600 w-full p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <Label label="PAN no." className="font-semibold text-blue-600" />
              <TextInput
                placeholder="Enter your PAN no."
                className="border border-green-600 w-full p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <Label label="Contact Details" className="font-semibold text-blue-600" />
              <TextInput
                placeholder="Enter your Contact Details"
                className="border border-green-600 w-full p-2 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
