// src/components/IssueBook.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IssueBook() {
  const [studentName, setStudentName] = useState("");
  const [bookName, setBookName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleIssue = (e) => {
    e.preventDefault();

    if (!studentName.trim() || !bookName.trim()) {
      setMessage("Please fill both fields!");
      return;
    }

    //  Dummy API simulation for now
    console.log("📘 Issued:", { studentName, bookName });

    // reset form
    setStudentName("");
    setBookName("");
    setMessage("✅ Book issued successfully!");
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-pink-500 text-white flex flex-col items-center">
      <div className="w-full max-w-md bg-white/10 p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">📚 Issue a Book</h2>

        <form onSubmit={handleIssue} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="p-3 rounded-xl text-black"
          />

          <input
            type="text"
            placeholder="Book Name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="p-3 rounded-xl text-black"
          />

          <button
            type="submit"
            className="bg-yellow-400 text-black py-2 rounded-xl font-semibold hover:bg-yellow-300"
          >
            Issue Book
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-green-300">{message}</p>
        )}

        <button
          onClick={() => navigate("/admin")}
          className="mt-6 bg-white text-purple-700 px-4 py-2 rounded-xl font-semibold hover:bg-purple-100 w-full"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}
