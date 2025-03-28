import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";
import "./UsersPage.css";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));

    if (storedUsers && storedUsers.length > 0) {
      setUsers(storedUsers); // Load users from localStorage
    } else {
      axios.get("https://reqres.in/api/users?page=1").then((response) => {
        setUsers(response.data.data);
        localStorage.setItem("users", JSON.stringify(response.data.data)); // Store users in localStorage
      });
    }
  }, []);

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers)); // Update localStorage
  };

  return (
    <div className="users-container">
      <h2>User List</h2>
      <div className="user-list">
        {users.map((user) => (
          <UserCard key={user.id} user={user} onDelete={handleDeleteUser} />
        ))}
      </div>
    </div>
  );
  
};

export default UsersPage;




