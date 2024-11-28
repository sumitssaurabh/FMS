import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { useParams } from "react-router-dom";
import CustomerDetail from "./CustomerViewPage";

const baseUrl = "https://befr8n.vercel.app/fms/api/v0/customer";

function CustomerList({ customer, handleAddCustomer, handleViewCustomer }) {

  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [viewingCustomerId, setViewingCustomerId] = useState(null);
 
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState("list");
  const { id } = useParams();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const filterCustomers = (customers, search) => {
    return customers.filter((customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.code.toLowerCase().includes(search.toLowerCase())
    );
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredCustomers = filterCustomers(customerList, searchTerm);
  const fetchCustomer = async (customerId) => {
    if (!customerId.trim()) {
      setError("Customer ID cannot be empty.");
      return;
    }

    try {
      setError(null); // Clear any previous errors
      const response = await axios.get(`${baseUrl}/${customerId}`, {
        headers: {
          // Authorization: `Bearer ${token}`, // Add token if needed
        },
        withCredentials: false,
      });
      console.log("Fetched Customer:", response.data);
      setSelectedCustomer(response.data.data);
    } catch (err) {
      if (err.response) {
        setError(err.response?.data?.message || "An error occurred.");
      } else if (err.request) {
        setError("Error: No response from the server.");
      } else {
        setError(`Error: ${err.message}`);
      }
      setSelectedCustomer(null);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCustomer(id); // Fetch using URL param id
    }
  }, [id]);

  // Fetch Customers
  useEffect(() => {
    async function loadCustomers() {
      try {
        setLoading(true);
        const response = await axios.get(baseUrl, {
          withCredentials: false,
        });
        setCustomerList(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setMessage("Failed to load customer data.");
      }
    }
    loadCustomers();
  }, []);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  // Go back to customer list view
  const goBack = () => {
    setViewingCustomerId(null);
  };

  const toggleSelectAll = () => {
    if (selectedCustomers.length === customerList.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(customerList.map((customer) => customer._id)); // Use _id to match the correct customer ID
    }
  };

  const handleDeleteSelectedCustomers = async () => {
    if (selectedCustomers.length === 0) {
      alert("No customers selected to delete.");
      return;
    }
  
    const confirmation = window.confirm("Are you sure you want to delete the selected customers?");
    if (!confirmation) return;
  
    try {
      for (let customerId of selectedCustomers) {
        await axios.delete(`${baseUrl}/${customerId}`, {
          withCredentials: false, // Add if needed
        });
      }
  
      // Update the state to remove deleted customers
      setCustomerList((prevList) =>
        prevList.filter((customer) => !selectedCustomers.includes(customer._id))
      );
  
      // Clear the selected customers array
      setSelectedCustomers([]);
      alert("Selected customers deleted successfully!");
    } catch (error) {
      console.error("Error deleting customers:", error);
      alert("Failed to delete selected customers. Please try again.");
    }
  };
  

  const handleCheckboxChange = (customerId) => {
    console.log("Checkbox toggled for Customer ID:", customerId);
    // Update the selected customers array
    setSelectedCustomers((prevSelected) =>
      prevSelected.includes(customerId)
        ? prevSelected.filter((id) => id !== customerId)
        : [...prevSelected, customerId]
    );

    // Find the customer details by customerId and log it
    const customer = customerList.find((customer) => customer._id === customerId);
    if (customer) {
      console.log("Customer Details:", customer); // Log customer details to the console
    }
  };

  const handleViewSelectedCustomers = async () => {
    if (selectedCustomers.length === 0) {
      alert("No customers selected.");
      return;
    }

    try {
      const customerDetails = [];
      for (let customerId of selectedCustomers) {
        const response = await axios.get(`${baseUrl}/${customerId}`);
        customerDetails.push(response.data.data);
      }
      setSelectedCustomer(customerDetails);
      setView("view"); // Switch to view page
    } catch (error) {
      console.error("Error fetching customer details:", error);
      alert("Failed to fetch customer details. Please try again.");
    }
  };

  // Import data from Excel
  const importFromExcel = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return alert("Please select a valid Excel file.");

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const importedData = XLSX.utils.sheet_to_json(worksheet);

      console.log("Imported Data:", importedData); // Debug imported data
      setCustomerList((prevCustomers) => [...prevCustomers, ...importedData]);
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const exportToExcel = useCallback(() => {
    if (!customerList.length) {
      alert("No data available to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(customerList); // Converts customerList to a worksheet
    const workbook = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers"); // Adds the worksheet to the workbook

    try {
      XLSX.writeFile(workbook, "customer_list.xlsx"); // Exports the workbook to a file
      alert("Export successful!");
    } catch (error) {
      console.error("Error exporting Excel file:", error);
      alert("Failed to export to Excel.");
    }
  }, [customerList]);

  const generatePDF = useCallback(() => {
    console.log("PDF button clicked"); // Debugging log
    try {
      const doc = new jsPDF();
      const tableColumn = [
        "#",
        "Customer Account",
        "Name",
        "Address",
        "Contact No.",
        "Currency",
        "Registration No.",
        "PAN",
        "Active",
      ];

      const tableRows = customerList.map((customer, index) => [
        index + 1,
        customer.code || "",
        customer.name || "",
        customer.address || "",
        customer.contactNum || "",
        customer.currency || "",
        customer.registrationNum || "",
        customer.panNum || "",
        customer.active ? "Yes" : "No",
      ]);

      doc.text("Customer List", 14, 20);
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,
      });

      doc.save("customer_list.pdf");
      console.log("PDF generated successfully.");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("An error occurred while generating the PDF.");
    }
  }, [customerList]);

  console.log(customerList.length);

  const handleCustomerClick = (customerId) => {
    console.log("customer.id")
    setViewingCustomerId(customerId);
  };

  return (
    <div className="bg-blue-400 p-8 min-h-screen">
        <div className=" rounded-full mb-5">
        {viewingCustomerId ? (
          <CustomerDetail customerId={viewingCustomerId} goBack={goBack} />
        ) : (
          <>
            {/* Header */}
            <header className="text-center bg-white py-2 border border-blue-300 rounded-full mb-5">
        <h2 className="text-lg font-bold text-blue-500">Customer List</h2>
      </header>

            {/* Action Buttons */}
            <div className="flex justify-between rounded-full mb-5">
              <div className="px-2 h-10 border border-green-500 bg-white rounded-full py-2">
                <input
                  type="text"
                  placeholder="Search..."
                  aria-label="Search"
                  className="ml-2 outline-none bg-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleAddCustomer}
                  className="h-10 px-4 py-2 border border-green-500 bg-white rounded-md hover:bg-gray-100"
                >
                  + Add
                </button>
                <button
                  onClick={handleDeleteSelectedCustomers}
                  disabled={selectedCustomers.length === 0}
                  className={`h-10 px-4 py-2 border border-green-500 bg-white rounded-md ${
                    selectedCustomers.length > 0
                      ? 'hover:bg-gray-100'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  Delete
                </button>
                <button
                  onClick={generatePDF}
                  className="h-10 px-4 py-2 border border-green-500 bg-white rounded-md hover:bg-gray-100"
                >
                  PDF
                </button>
                <button
                  onClick={exportToExcel}
                  className="h-10 px-4 py-2 border border-green-500 bg-white rounded-md hover:bg-gray-100"
                >
                  Export
                </button>
                <label className="border h-10 border-green-500 bg-white rounded-md py-2 px-4">
                  <input
                    type="file"
                    accept=".xls,.xlsx"
                    onChange={importFromExcel}
                    className="hidden"
                  />
                  Import
                </label>
              </div>
            </div>

            {/* Customer Table */}
            <div className="border border-green-500 rounded-lg bg-white p-4 overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 border border-gray-300 text-left">
                        <input
                          type="checkbox"
                          checked={selectedCustomers.length === customerList.length}
                          onChange={toggleSelectAll}
                        />
                      </th>
                      <th className="px-4 py-2 border border-gray-300 text-left">Customer Account</th>
                      <th className="px-4 py-2 border border-gray-300 text-left">Name</th>
                      <th className="px-4 py-2 border border-gray-300 text-left">Registration No.</th>
                      <th className="px-4 py-2 border border-gray-300 text-left">Address</th>
                      <th className="px-4 py-2 border border-gray-300 text-left">Contact No.</th>
                      <th className="px-4 py-2 border border-gray-300 text-left">Currency</th>
                      <th className="px-4 py-2 border border-gray-300 text-left">PAN</th>
                      <th className="px-4 py-2 border border-gray-300 text-left">Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerList
                      .filter((customer) =>
                        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((customer) => (
                        <tr key={customer._id} className="hover:bg-gray-50">
                          <td className="border px-4 py-2 text-center">
                            <input
                              type="checkbox"
                              checked={selectedCustomers.includes(customer._id)}
                              onChange={() => handleCheckboxChange(customer._id)}
                            />
                          </td>
                          <td>
                    <button onClick={() => handleCustomerClick(customer._id)}>
                      {customer.code}
                    </button>
                  </td>
                          <td className="border px-4 py-2">{customer.name}</td>
                          <td className="border px-4 py-2">{customer.registrationNum}</td>
                          <td className="border px-4 py-2">{customer.address}</td>
                          <td className="border px-4 py-2">{customer.contactNum}</td>
                          <td className="border px-4 py-2">{customer.currency}</td>
                          <td className="border px-4 py-2">{customer.panNum}</td>
                          <td className="border px-4 py-2">{customer.active ? 'Yes' : 'No'}</td>
                          
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerList;
