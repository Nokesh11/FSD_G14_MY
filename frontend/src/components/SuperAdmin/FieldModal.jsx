import React, { useState } from "react";

export default function FieldModal({ isOpen, onClose, onAddField }) {
  const [label, setLabel] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  const handleAdd = () => {
    onAddField(label, placeholder);
    setLabel("");
    setPlaceholder("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add New Field</h2>
        <div>
          <label>Field Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Enter field label"
            className="border p-2 rounded w-full mb-4"
          />
        </div>
        <div>
          <label>Field Placeholder</label>
          <input
            type="text"
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
            placeholder="Enter field placeholder"
            className="border p-2 rounded w-full mb-4"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleAdd}
          >
            Add
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
