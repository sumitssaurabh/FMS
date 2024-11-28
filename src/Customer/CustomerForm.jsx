import { useEffect, useState } from "react";
import axios from "axios";
import Label from "../components/common/Common/Label/Label";

const baseUrl = "https://befr8n.vercel.app";
const secondUrl = "/fms/api/v0";
const thirdUrl = "/customer";
const mergedUrl = `${baseUrl}${secondUrl}${thirdUrl}`;

function CustomerForm({handleCancel}) {
  const [customerList, setCustomerList] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    contactNum: "",
    currency: "",
    registrationNum: "",
    panNum: "",
    address: "",
    active: true,
  });
  const [message, setMessage] = useState("");

  // Fetch Customers
  useEffect(() => {
    async function loadCustomers() {
      try {
        const response = await axios.get(mergedUrl, {
          headers: {
            // Authorization: `Bearer ${tokenCookie}`, // Uncomment if token is required
          },
          withCredentials: false,
        });
        console.log("Customer data fetched:", response.data);
        setCustomerList(response.data.data);
      } catch (error) {
        if (error.response) {
          console.log(`Error in response: ${error.response.data}`);
        } else {
          console.error(`Error: ${error.message}`);
        }
      }
    }

    loadCustomers();
  }, []);

  // Handle Input Change
  
 // Handle Input Change
const handleInputChange = (e) => {
  const { name, value } = e.target;

  if (name === "contactNum") {
    // Allow only numeric input and limit to 10 characters
    if (/^\d*$/.test(value) && value.length <= 10) {
      setNewCustomer((prev) => ({ ...prev, [name]: value }));
    }
  } else if (name === "registrationNum") {
    // Convert to uppercase and ensure it is 16 characters long
    const uppercaseValue = value.toUpperCase();
    if (/^[A-Z0-9]*$/.test(uppercaseValue) && uppercaseValue.length <= 16) {
      setNewCustomer((prev) => ({ ...prev, [name]: uppercaseValue }));
    }
  } else if (name === "panNum") {
    // Validate PAN format (uppercase and alphanumeric, up to 10 characters)
    const uppercaseValue = value.toUpperCase();
    if (/^[A-Z0-9]*$/.test(uppercaseValue) && uppercaseValue.length <= 10) {
      setNewCustomer((prev) => ({ ...prev, [name]: uppercaseValue }));
    }
  } else {
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  }
};

  // Create New Customer
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
        active: "",
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
  const handleReset = () => {
    setNewCustomer({
      name: "",
      contactNum: "",
      currency: "",
      registrationNum: "",
      panNum: "",
      address: "",
      active: true,
    });
    setMessage("");
  };
  
  return (
    <>
    <div className="bg-blue-400 mt-44 p-8 min-h-screen">
      <div className="bg-slate-50 rounded-lg p-6">
        <header className="text-center bg-white py-2 border border-blue-300 rounded-full mb-5">
          <h2 className="text-lg font-bold text-blue-500">Customer Creation Form </h2>
        </header>
        {message && <div className="text-green-500">{message}</div>}
      <form
        onSubmit={createCustomer}
        className="mt-10 space-y-6">
      
      <div className="grid grid-cols-3 gap-4">
         <div>
         <Label label="Customer Name" className="font-semibold text-blue-600" />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newCustomer.name}
          onChange={handleInputChange}
            className="border border-green-600 w-full p-2 rounded-lg"
          required
        />
          </div>
          <div>
          <Label label="Contact No." className="font-semibold text-blue-600" />
        <input
          type="tel"
          name="contactNum"
          placeholder="Contact Number"
          value={newCustomer.contactNum}
          onChange={handleInputChange}
           className="border border-green-600 w-full p-2 rounded-lg"
          required
          pattern="[0-9]{10}"
          title="Enter a valid 10-digit phone number"
        />
            </div>
            <div>
         <Label label="Currency" className="font-semibold text-blue-600" />
        <input
          type="text"
          name="currency"
          placeholder="Currency"
          value={newCustomer.currency}
          onChange={handleInputChange}
         className="border border-green-600 w-full p-2 rounded-lg"
          required
        />
            </div>
            <div>
        <Label label="Customer Address" className="font-semibold text-blue-600" />
        <textarea
          name="address"
          placeholder="Address"
          value={newCustomer.address}
          onChange={handleInputChange}
            rows="4"
          className="border border-green-600 w-full p-2 rounded-lg"
        />
            </div>
            <div>
         <Label label="Registration No" className="font-semibold text-blue-600" />
        <input
          type="text"
          name="registrationNum"
          placeholder="Registration Number"
          value={newCustomer.registrationNum}
          onChange={handleInputChange}
         className="border border-green-600 w-full p-2 rounded-lg"
          required
        />
            </div>
            <div>
          <Label label="PAN No." className="font-semibold text-blue-600" />
        <input
          type="text"
          name="panNum"
          placeholder="PAN Number"
          value={newCustomer.panNum}
          onChange={handleInputChange}
            className="border border-green-600 w-full p-2 rounded-lg"
          required
        />
            </div>    
            
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="active"
            checked={newCustomer.active}
            onChange={(e) =>
              setNewCustomer((prev) => ({
                ...prev,
                active: e.target.checked,
              }))
            }
          />
          <span>Active</span>
        </label>
        </div>
        <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-full mt-4">
          Save
        </button>
        <button
              type="button"
              onClick={handleReset}
              className="bg-red-500 text-white py-2 px-4 rounded-full mt-4 ml-4"
            >
              Reset
            </button>
            <button type="button" className="ml-3 bg-zinc-700 text-white py-2 px-4 rounded-full mt-4"
            onClick={handleCancel}>
              Cancel
            </button>
            </div>
      </form>
      </div>
      </div>

   
    </>
  );
}

export default CustomerForm;