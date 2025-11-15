// src/components/IssuedBooks.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function IssuedBooks() {
  const navigate = useNavigate();
  const [issuedBooks, setIssuedBooks] = useState([
    { id: 1, student: "Aman Sharma", book: "Atomic Habits" },
    { id: 2, student: "Riya Verma", book: "Clean Code" },
    { id: 3, student: "Karan Patel", book: "Deep Work" },
  ]);
  const handleReturn = (id) => {
    setIssuedBooks((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-pink-500 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📖 Issued Books</h2>
        <button
          onClick={() => navigate("/admin")}
          className="bg-white text-purple-600 px-4 py-2 rounded-xl font-semibold hover:bg-purple-100"
        >
          ← Back to Dashboard
        </button>
      </div>

      {issuedBooks.length === 0 ? (
        <p className="text-center text-gray-200">No issued books currently.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {issuedBooks.map((entry) => (
            <div
              key={entry.id}
              className="bg-white/10 p-4 rounded-xl flex justify-between items-center hover:bg-white/20 transition"
            >
              <div>
                <p className="font-semibold text-lg">{entry.book}</p>
                <p className="text-sm text-gray-300">
                  Issued to: {entry.student}
                </p>
              </div>
              <button
                onClick={() => handleReturn(entry.id)}
                className="bg-green-500 px-4 py-1 rounded-lg hover:bg-green-600 transition"
              >
                Returned
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
