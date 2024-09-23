import React from "react";
import TableRow from "./TableRow";

const SectionTable = ({ title, sections }) => (
  <div className="mb-12">
    <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
      <thead className="bg-gray-100">
        <tr>
          <th colSpan="2" className="text-left">
            <h2 className="text-xl font-semibold my-4 ml-8">{title}</h2>
          </th>
        </tr>
      </thead>
      <tbody>
        {sections.map((section) => (
          <TableRow key={section} sectionName={section} />
        ))}
      </tbody>
    </table>
  </div>
);

export default SectionTable;
