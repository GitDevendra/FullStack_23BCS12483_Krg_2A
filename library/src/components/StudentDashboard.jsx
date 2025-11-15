import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import IdContext from "../Context/creation";
import StudentBookCard from "./StudentBookCard";

export default function StudentDashboard() {
  const { userid, setuserid } = useContext(IdContext);
  const navigate = useNavigate();

  // Dummy data for issued books
  const [issuedBooks] = useState([
    { id: 1, name: "Rich Dad Poor Dad" },
    { id: 2, name: "The Alchemist" },
  ]);

  const handleLogout = () => {
    setuserid([null, null]);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-blue-500 p-6 text-white">
      {/* 🔹 Navbar */}
      <nav className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <span className="bg-white/20 px-4 py-2 rounded-xl">
            Logged in as: <strong>{userid[0]}</strong>
          </span>
          <button
            onClick={() => navigate("/librarybooks")}
            className="bg-yellow-300 text-black px-4 py-2 rounded-xl font-semibold hover:bg-yellow-200"
          >
            View Library Books
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-xl font-semibold hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      {/* 🔹 Issued Books */}
      <h2 className="text-2xl font-bold mb-4">📚 Books Issued to You</h2>

      {issuedBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {issuedBooks.map((book) => (
            <StudentBookCard key={book.id} name={book.name} issued />
          ))}
        </div>
      ) : (
        <p className="text-gray-200 text-center">
          No books issued to you currently.
        </p>
      )}
    </div>
  );
}
