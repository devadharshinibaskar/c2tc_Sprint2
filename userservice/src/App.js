import React from "react";
import UserList from "./components/UserList";
import "./App.css";

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Placement Management - User Portal</h1>
      <UserList />
    </div>
  );
}

export default App;
