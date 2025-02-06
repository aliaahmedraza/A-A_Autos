// import React from "react";

// Sample data for spare parts price list
const spareParts = [
  { id: 1, name: "Brake Pad", price: 25.99 },
  { id: 2, name: "Oil Filter", price: 12.5 },
  { id: 3, name: "Air Filter", price: 15.75 },
  { id: 4, name: "Spark Plug", price: 8.99 },
  { id: 5, name: "Windshield Wiper", price: 9.99 },
];

const SparePartsPriceList = () => {
  return (
    <div className="font-sans mx-5 my-5">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Spare Parts Price List
      </h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">
              Part Name
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">
              Price (USD)
            </th>
          </tr>
        </thead>
        <tbody>
          {spareParts.map((part) => (
            <tr key={part.id} className="hover:bg-gray-50 even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-gray-700">
                {part.name}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-gray-700">
                ${part.price.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SparePartsPriceList;
