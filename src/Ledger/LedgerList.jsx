import React, { useState, useEffect, useCallback } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const LedgerList = ({
  customers,
  handleAddCustomer,
  handleDeleteCustomer,
  handleViewCustomer,
  setCustomers,
}) => {
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCheckboxChange = (customerAccountNo) => {
    setSelectedCustomers((prevSelected) =>
      prevSelected.includes(customerAccountNo)
        ? prevSelected.filter((accountNo) => accountNo !== customerAccountNo)
        : [...prevSelected, customerAccountNo]
    );
  };

  useEffect(() => {
    console.log("Selected customers:", selectedCustomers);
  }, [selectedCustomers]);

  const importFromExcel = useCallback(
    (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      setLoading(true);
      reader.onload = (event) => {
        try {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const importedData = XLSX.utils.sheet_to_json(worksheet);
          setCustomers((prevCustomers) => [...prevCustomers, ...importedData]);
          setLoading(false);
        } catch (error) {
          alert("Failed to read file. Please try again.");
          setLoading(false);
        }
      };
      reader.readAsArrayBuffer(file);
    },
    [setCustomers]
  );

  const exportToExcel = useCallback(() => {
    setLoading(true);
    const worksheet = XLSX.utils.json_to_sheet(customers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
    XLSX.writeFile(workbook, "Ledger_list.xlsx");
    setLoading(false);
  }, [customers]);

  const generatePDF = useCallback(() => {
    const doc = new jsPDF();
    const tableColumn = ["#", "Ledger Code", "Ledger Name", "Currency", "Type", "Active"];
    const tableRows = customers.map((customer, index) => [
      index + 1,
      customer.customerAccountNo,
      customer.name,
      customer.currency,
      customer.type,
      customer.active ? "Yes" : "No"
    ]);

    doc.text("Ledger List", 14, 20);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });
    doc.save("ledger_list.pdf");
  }, [customers]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-blue-400 p-8 min-h-screen">
      <header className="text-center bg-white py-2 border border-blue-300 rounded-full mb-5">
        <h2 className="text-lg font-bold text-blue-500">Ledger List</h2>
      </header>

      <div className="flex justify-between rounded-full mb-5">
        <div className="px-2 h-10 border border-green-500 bg-white rounded-full py-2">
          <input
            type="text"
            placeholder="Search..."
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
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
            className={`px-4 py-2 border border-green-500 h-10 bg-white rounded-md ${
              selectedCustomers.length === 0
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

      {loading && <p className="text-center text-gray-700">Processing...</p>}

      <div className="border border-green-500 rounded-lg bg-white p-4 overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Ledger Code</th>
                <th className="border px-4 py-2">Ledger Name</th>
                <th className="border px-4 py-2">Currency</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Active</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer, index) => (
                  <tr key={customer.customerAccountNo}>
                    <td className="border px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedCustomers.includes(customer.customerAccountNo)}
                        onChange={() => handleCheckboxChange(customer.customerAccountNo)}
                        aria-label={`Select ${customer.customerAccountNo}`}
                      />
                    </td>
                    <td
                      className="border px-4 py-2 cursor-pointer text-black whitespace-normal break-words"
                      style={{ maxWidth: "15ch" }}
                      onClick={() => handleViewCustomer(customer.customerAccountNo)}
                    >
                      {customer.customerAccountNo}
                    </td>
                    <td className="border px-4 py-2 cursor-pointer text-black whitespace-normal break-words">{customer.name}</td>
                    <td className="border px-4 py-2 cursor-pointer text-black whitespace-normal break-words">{customer.currency}</td>
                    <td className="border px-4 py-2 cursor-pointer text-black whitespace-normal break-words">{customer.type}</td>
                    <td className="border px-4 py-2 cursor-pointer text-black whitespace-normal break-words">{customer.active ? "Yes" : "No"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="border px-4 py-2 text-center"> 
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

export default LedgerList;
