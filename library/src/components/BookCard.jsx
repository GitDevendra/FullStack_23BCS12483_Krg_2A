// src/components/BookCard.jsx
import React from "react";

export default function BookCard({ name, onRemove }) {
  return (
    <div className="bg-white/10 p-4 rounded-xl flex justify-between items-center hover:bg-white/20 transition">
      <span className="font-semibold text-lg">{name}</span>
      <button
        onClick={onRemove}
        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
      >
        Remove
      </button>
    </div>
  );
}
