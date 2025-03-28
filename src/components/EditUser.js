import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = storedUsers.find((u) => u.id === parseInt(id));

    if (currentUser) {
      setUser(currentUser);  // Load user data from localStorage
    } else {
      axios.get(`https://reqres.in/api/users/${id}`)
        .then((response) => {
          setUser(response.data.data);
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
      // Simulate API update request
      await axios.put(`https://reqres.in/api/users/${id}`, user);

      // Get users list and update the specific user
      let users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((u) => 
        u.id === parseInt(id) ? { ...u, ...user } : u
      );

      // Update localStorage and navigate back
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      alert("User updated successfully");
      navigate("/users");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update user");
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      <input
        type="text"
        value={user.first_name}
        onChange={(e) => setUser({ ...user, first_name: e.target.value })}
      />
      <input
        type="text"
        value={user.last_name}
        onChange={(e) => setUser({ ...user, last_name: e.target.value })}
      />
      <input
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default EditUser;
