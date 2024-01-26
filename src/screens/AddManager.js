import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/App.css";
import { useNavigate, Link } from "react-router-dom";

const AddManagerScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let token = localStorage.getItem("token");

      await axios({
        headers: {
          authorization: "Bearer " + token,
        },
        method: "get",
        url: "http://localhost:5000/validateLogin",
      })
        .then(function (response) {
          console.log(response);
          if (response.data.message == "Unauthorized access") {
            localStorage.clear();
            navigate('/login')
          } else if (response.data.role !== "Admin") {
            navigate("../userlist");
          }
        })
        .catch(function (response) {
          //Handle error
          console.dir(response);
        });
      setLoading(false);
    };

    fetchData();
  });
  const handleAddManager = async () => {
    try {
      setLoading(true);
      // Send a POST request to the API to add a new manager
      const response = await axios.post("http://localhost:5000/addadmin", {
        username,
        password,
        type,
      });

      console.log("Added Manager:", response.data);

      // Reset the form fields after adding
      setUsername("");
      setPassword("");
      setType("");
    } catch (error) {
      console.error("Error adding manager:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h1 className="text-2xl font-bold mb-4">Add Manager</h1>

            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-600"
              >
                Type
              </label>
              <select
                id="type"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="" disabled>
                  Select a role
                </option>
                <option value="Event Manager">Event Manager</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <button
              onClick={handleAddManager}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Add Manager
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddManagerScreen;
