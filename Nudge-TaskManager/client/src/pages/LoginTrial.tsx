import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import {
  Button,
  Input,
  PasswordInput,
  Container,
  Text,
  List,
  ListItem,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "../index.css";

const API_URL = "http://localhost:3000"; // Replace with your actual API URL

interface User {
  id: number;
  email: string;
}

function TrialLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // For handling errors
  const [users, setUsers] = useState<User[]>([]); // State to store current users
  const navigate = useNavigate(); // Use React Router to navigate

  // Fetch current users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user/`);
        setUsers(response.data); // Assuming the server sends an array of users
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setError("Failed to load users.");
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Handle the login functionality
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    console.log("Request payload:", user); // Log the payload

    axios
      .post(`${API_URL}/api/user/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("jwtToken", response.data.token); // Store the token in localStorage
          navigate("/Dashboard"); // Redirect to the dashboard page after successful login
        } else {
          alert("Invalid login credentials");
        }
      })
      .catch((error) => {
        setError(error.message); // Display error message
        console.error("Login failed:", error);
        alert("Login failed. Please try again.");
      });
  };

  return (
    <Container size="xs" p="lg">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-2xl font-bold mb-4">
          Login to Your Account
        </h1>

        {/* Email Input */}
        <Input.Wrapper label="Email Address" required className="mb-3">
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-3"
          />
        </Input.Wrapper>

        {/* Password Input */}
        <Input.Wrapper label="Password" required className="mb-3">
          <PasswordInput
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-3"
          />
        </Input.Wrapper>

        {/* Error message */}
        {error && (
          <Text style={{ textAlign: "center" }} color="red" className="mb-3">
            {error}
          </Text>
        )}

        {/* Login Button */}
        <Button fullWidth onClick={handleLogin}>
          Log In
        </Button>

        {/* Register Option */}
        <Text style={{ textAlign: "center" }} className="mt-3">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500">
            Register
          </a>
        </Text>

        {/* Display current users */}
        <div className="mt-5">
          <h2 className="text-lg font-semibold">Current Users</h2>
          <List spacing="sm" className="mt-3">
            {users.length > 0 ? (
              users.map((user) => (
                <ListItem key={user.id}>{user.email}</ListItem> // Adjust based on user properties
              ))
            ) : (
              <Text>No users found.</Text>
            )}
          </List>
        </div>
      </div>
    </Container>
  );
}

export default TrialLoginPage;
