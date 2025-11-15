import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/Login";
import SignupPage from "./components/SignupPage";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";
import IdProvider from "./Context/Provision";
import IssuedBooks from "./components/IssuedBooks";
import LibraryBooks from "./components/LibraryBooks"
import IssueBook from "./components/IssueBook";
export default function App() {
  const [userid, setuserid] = useState([null, null]);
  return (
    <IdProvider value={{ userid, setuserid }}>
      <Routes>
        {userid[0] === null ? (
          <>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : userid[1] === "student" ? (
          <>
            <Route path="/" element={<StudentDashboard />} />
            <Route path="/librarybooks" element={<LibraryBooks />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : userid[1] === "admin" ? (
          <>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/issuebook" element={<IssueBook />} />
            <Route path="/issuedbooks" element={<IssuedBooks />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : null}
      </Routes>
    </IdProvider>
  );
}
