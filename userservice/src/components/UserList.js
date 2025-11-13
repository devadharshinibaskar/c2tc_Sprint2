import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

 
const fetchUsers = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/users/all");
    if (!response.ok) throw new Error("Failed to fetch users");
    const data = await response.json();

    
    const sortedData = Array.isArray(data)
      ? data.sort((a, b) => a.id - b.id)
      : [];

    setUsers(sortedData);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};


  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await fetch(`http://localhost:8080/api/users/delete/${id}`, {
        method: "DELETE",
      });
      fetchUsers();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>

      <UserForm fetchUsers={fetchUsers} editUser={editUser} setEditUser={setEditUser} />

      <table
        border="1"
        cellPadding="8"
        style={{
          marginTop: "20px",
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead style={{ backgroundColor: "#f0f0f0" }}>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((u) => (
              <tr key={u.userId}>
                <td>{u.userId}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.department}</td>
                <td>{u.status}</td>
                <td>
                  <button onClick={() => setEditUser(u)}>Edit</button>
                  <button
                    onClick={() => deleteUser(u.userId)}
                    style={{ marginLeft: "5px", color: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
