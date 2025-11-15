import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentBookCard from "./StudentBookCard";

export default function LibraryBooks() {
  const navigate = useNavigate();

  const [books] = useState([
    "Rich Dad Poor Dad",
    "The Alchemist",
    "Atomic Habits",
    "Deep Work",
    "Clean Code",
  ]);

  const handleIssueRequest = (bookName) => {
    alert(`📖 Issue request sent for "${bookName}"`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 p-6 text-white">
      <nav className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📚 Library Books</h2>

        <button
          onClick={() => navigate("/")}
          className="bg-white text-blue-700 px-4 py-2 rounded-xl font-semibold hover:bg-blue-100"
        >
          ← Back to Dashboard
        </button>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map((bookName, index) => (
          <StudentBookCard
            key={index}
            name={bookName}
            onIssue={() => handleIssueRequest(bookName)}
          />
        ))}
      </div>
    </div>
  );
}
