import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./HomeComponent.css"; // Import the CSS file

const HomeComponent = () => {
  const { user, fetchUserInfo, logout } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user._id) {
      fetchUserInfo(user._id).then((userInfo) => setUserDetails(userInfo));
    }
  }, [user, fetchUserInfo]);

  const handleNavigateToDashboard = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="home-container">
      {userDetails ? (
        <div className="user-details">
          <h1>Welcome, {userDetails.displayName}</h1>
          <p>
            <strong>ID:</strong> {userDetails._id}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p>
            <strong>Name:</strong> {userDetails.name}
          </p>
          <p>
            <strong>Phone:</strong> {userDetails.phone}
          </p>
          <p>
            <strong>Provider ID:</strong> {userDetails.providerId}
          </p>
          <img
            src={userDetails.photoURL}
            alt="Profile"
            className="profile-img"
          />
          <button
            className="dashboard-button"
            onClick={handleNavigateToDashboard}
          >
            Go to Dashboard
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HomeComponent;
