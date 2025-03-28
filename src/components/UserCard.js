import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserCard.css"

const UserCard = ({ user, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://reqres.in/api/users/${user.id}`);

      if (response.status === 204 || response.status === 200) {
        // Remove user from local storage
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users = users.filter((u) => u.id !== user.id);
        localStorage.setItem("users", JSON.stringify(users));

        // Call parent function to update UI immediately
        onDelete(user.id);

        alert("User deleted successfully");
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Try again.");
    }
  };

  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.first_name} />
      <h3>{user.first_name} {user.last_name}</h3>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={() => navigate(`/edit/${user.id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
  
};

export default UserCard;




