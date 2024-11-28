import React, { useState, useEffect, useCallback } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const VendorList = ({
  customers,
  handleAddCustomer,
  handleDeleteCustomer,
  handleViewCustomer,
}) => {
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  // Handle checkbox selection
  const handleCheckboxChange = (customerAccountNo) => {
    setSelectedCustomers((prevSelected) =>
      prevSelected.includes(customerAccountNo)
        ? prevSelected.filter((accountNo) => accountNo !== customerAccountNo)
        : [...prevSelected, customerAccountNo]
    );
  };

  // Monitor the selected customers for debugging or further actions
  useEffect(() => {
    console.log("Selected customers:", selectedCustomers);
  }, [selectedCustomers]);

  // Import data from Excel
  const importFromExcel = useCallback((e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const importedData = XLSX.utils.sheet_to_json(worksheet);
      setCustomers((prevCustomers) => [...prevCustomers, ...importedData]);
    };
    reader.readAsArrayBuffer(file);
  }, []);

  // Generate PDF
 
  const generatePDF = useCallback(() => {
    const doc = new jsPDF();
    const tableColumn = [
      "#",
      "Vendor Account No.",
      "Name",
      "Address",
      "Contact No.",
      "Currency",
      "Registration No.",
      "PAN",
      "Active",
    ];
    const tableRows = customers.map((customer, index) => [
      index + 1,
      customer.vendorAccountNo,
      customer.name,
      customer.Address,
      customer.contactNo,
      customer.currency,
      customer.registrationNo,
      customer.pan,
      customer.active ? "Yes" : "No",
    ]);

    doc.text("Vendor List", 14, 20);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });
    doc.save("Vendor_list.pdf");
  }, [customers]);

  // Export to Excel
  const exportToExcel = useCallback(() => {
    const worksheet = XLSX.utils.json_to_sheet(customers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
    XLSX.writeFile(workbook, "vendor_list.xlsx");
  }, [customers]);

  return (
    <div className="bg-blue-400 p-8 min-h-screen">
      {/* Header */}
      <header className="text-center bg-white py-2 border border-blue-300 rounded-full mb-5">
        <h2 className="text-lg font-bold  text-blue-500">Vendor List</h2>
      </header>


      {/* Action Buttons */}
      <div className="flex justify-between rounded-full mb-5">
        <div className="px-2 h-10 border border-green-500 bg-white rounded-full py-2">
          <input
            type="text"
            placeholder="Search..."
            aria-label="Search"
            className="ml-2 outline-none bg-transparent"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleAddCustomer}
            className="px-3 border border-green-500 h-10 bg-white rounded-md hover:bg-gray-100"
          >
            + Add
          </button>

          <button
            onClick={() => handleDeleteCustomer(selectedCustomers)}
            className={`px-4 py-2 border border-green-500 h-10 bg-white rounded-md ${selectedCustomers.length === 0
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-100"
              }`}
            disabled={selectedCustomers.length === 0}
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
            className="px-4 py-2 h-10 border border-green-500 bg-white rounded-md hover:bg-gray-100"
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
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Vendor Account No.</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Address</th>
                <th className="border px-4 py-2">Contact No.</th>
                <th className="border px-4 py-2">Currency</th>
                <th className="border px-4 py-2">Registration No</th>
                <th className="border px-4 py-2">PAN</th>
                <th className="border px-4 py-2">Active</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((customer, index) => (
                  <tr key={customer.customerAccountNo}>
                    <td className="border px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedCustomers.includes(customer.customerAccountNo)}
                        onChange={() => handleCheckboxChange(customer.customerAccountNo)}
                      />
                    </td>
                    <td
                      className="border px-4 py-2 cursor-pointer text-black whitespace-normal break-words"
                      style={{ maxWidth: "15ch" }}
                      onClick={() => handleViewCustomer(customer.customerAccountNo)}
                    >
                      {customer.vendorAccountNo}
                    </td>
                    <td className="border px-4 py-2 whitespace-normal break-words" style={{ maxWidth: "15ch" }}>
                      {customer.name}
                    </td>
                    <td className="border px-4 py-2 whitespace-normal break-words" style={{ maxWidth: "15ch" }}>
                      {customer.Address}
                    </td>
                    <td className="border px-4 py-2">{customer.contactNo}</td>
                    <td className="border px-4 py-2">{customer.currency}</td>
                    <td className="border px-4 py-2">{customer.registrationNo}</td>
                    <td className="border px-4 py-2">{customer.pan}</td>
                    <td className="border px-4 py-2">{customer.active ? "Yes" : "No"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="border px-4 py-2 text-center">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorList;
