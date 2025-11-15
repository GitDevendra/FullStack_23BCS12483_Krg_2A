// src/components/AdminDashboard.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import IdContext from "../Context/creation";
import BookCard from "./BookCard";

function AdminDashboard() {
  const { userid, setuserid } = useContext(IdContext);
  const navigate = useNavigate();

  const [books, setBooks] = useState([
    "Rich Dad Poor Dad",
    "The Alchemist",
    "Atomic Habits",
    "Deep Work",
    "Clean Code",
  ]);

  const [book, setBook] = useState("");

  const handleAddBook = (e) => {
    e.preventDefault();
    if (!book.trim()) return;
    setBooks((prev) => [...prev, book]);
    setBook("");
  };

  const handleRemoveBook = (bookName) => {
    setBooks((prev) => prev.filter((b) => b !== bookName));
  };

  const handleLogout = () => {
    setuserid([null, null]);
    navigate("/");
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      {/* 🔹 Navbar */}
      <nav className="flex justify-between items-center mb-6">
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Add book"
            value={book}
            onChange={(e) => setBook(e.target.value)}
            className="p-2 rounded-xl text-black"
          />
          <button
            onClick={handleAddBook}
            className="bg-white text-purple-600 px-4 py-2 rounded-xl font-semibold hover:bg-purple-100"
          >
            Add Book
          </button>
          <button
            onClick={() => navigate("/issuebook")}
            className="bg-blue-400 text-black px-4 py-2 rounded-xl font-semibold hover:bg-blue-300"
          >
            Issue Book
          </button>
          <button
            onClick={() => navigate("/issuedbooks")}
            className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-semibold hover:bg-yellow-300"
          >
            Issued Books
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-xl font-semibold hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      {/* 🔹 Book List */}
      <h2 className="text-2xl font-bold mb-4">📚 Library Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.length > 0 ? (
          books.map((bookName, index) => (
            <BookCard
              key={index}
              name={bookName}
              onRemove={() => handleRemoveBook(bookName)}
            />
          ))
        ) : (
          <p className="text-center text-gray-200">No books available</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
