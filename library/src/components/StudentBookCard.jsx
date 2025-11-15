import React from "react";

export default function StudentBookCard({ name, issued, onIssue }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl shadow-lg flex justify-between items-center border border-white/20 hover:scale-[1.02] transition-transform duration-300">
      <span className="text-lg font-semibold text-white">{name}</span>

      {/* 🔹 Conditionally render buttons based on props */}
      {issued ? (
        <span className="text-yellow-300 text-sm font-medium bg-white/10 px-3 py-1 rounded-lg">
          Issued
        </span>
      ) : (
        <button
          onClick={onIssue}
          className="bg-green-400 px-3 py-1 rounded-lg text-black font-semibold hover:bg-green-300 transition-all duration-200"
        >
          Request Issue
        </button>
      )}
    </div>
  );
}
