import React, { useState, useEffect } from "react";

const UserForm = ({ fetchUsers, editUser, setEditUser }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    department: "",
    status: "",
  });

  // If a user is selected for editing, prefill form
  useEffect(() => {
    if (editUser) setForm(editUser);
  }, [editUser]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update user
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editUser ? "PUT" : "POST";
    const url = editUser
      ? `http://localhost:8080/api/users/update/${editUser.userId}`
      : "http://localhost:8080/api/users/add";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    // Reset form after submit
    setForm({
      username: "",
      email: "",
      password: "",
      role: "",
      department: "",
      status: "",
    });
    setEditUser(null);
    fetchUsers();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid gray",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <h3>{editUser ? "Edit User" : "Add New User"}</h3>
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <input
        name="role"
        placeholder="Role"
        value={form.role}
        onChange={handleChange}
      />
      <input
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
      />
      <input
        name="status"
        placeholder="Status"
        value={form.status}
        onChange={handleChange}
      />

      <button type="submit" style={{ marginTop: "10px" }}>
        {editUser ? "Update User" : "Add User"}
      </button>
    </form>
  );
};

export default UserForm;
