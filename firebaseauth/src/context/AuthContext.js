import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../components/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [googleUser, setGoogleUser] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    const storedJwtToken = sessionStorage.getItem("jwtToken");
    const storedUserId = sessionStorage.getItem("userId");
    const storedExpirationTime = sessionStorage.getItem("expirationTime");

    if (storedJwtToken && storedUserId && storedExpirationTime) {
      const currentTime = Date.now();

      if (currentTime < storedExpirationTime) {
        fetchUserInfo(storedUserId).then((userInfo) => {
          setUser(userInfo);
          setIsAuthenticated(true);
          setSessionTimeout(storedExpirationTime - currentTime);
        });
      } else {
        logout();
      }
    }

    const resetTimeout = () => {
      if (timeoutId) clearTimeout(timeoutId);
      const newTimeoutId = setTimeout(() => {
        logout();
      }, 30 * 60 * 1000); // 30 minutes of inactivity
      setTimeoutId(newTimeoutId);
    };

    const events = ["click", "mousemove", "keypress", "scroll"];

    events.forEach((event) => {
      window.addEventListener(event, resetTimeout);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimeout);
      });
    };
  }, [timeoutId]);

  const fetchUserInfo = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/v1.0/users/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        return data.user;
      } else {
        console.error(
          "Error fetching user info:",
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const sendOtp = async (userInfo) => {
    try {
      const response = await fetch(
        "http://localhost:3000/v1.0/users/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        },
      );

      if (response.ok) {
        const data = await response.json();
        setUser({ ...userInfo, phone: data.phone });
        sessionStorage.setItem("phone", data.phone);
      } else {
        const errorData = await response.json();
        console.error("Failed to send OTP", errorData);
      }
    } catch (error) {
      console.error("Error during OTP sending:", error);
    }
  };

  const login = async ({
    phone,
    otp,
    email,
    name,
    displayName,
    photoURL,
    providerId,
  }) => {
    const userInfo = googleUser || {};
    const loginData = {
      phone,
      otp,
      email: email || userInfo.email,
      name: name || userInfo.name,
      displayName: displayName || userInfo.displayName,
      photoURL: photoURL || userInfo.photoURL,
      providerId: providerId || userInfo.providerId,
    };

    try {
      const response = await fetch("http://localhost:3000/v1.0/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        const expirationTime = Date.now() + 60 * 60 * 1000; // Assuming token expires in 1 hour
        sessionStorage.setItem("jwtToken", data.jwtToken);
        sessionStorage.setItem("userId", data.user._id);
        sessionStorage.setItem("expirationTime", expirationTime);
        setSessionTimeout(60 * 60 * 1000); // 1 hour
        setUser(data.user);
        setIsAuthenticated(true);
        return true;
      } else {
        const errorData = await response.json();
        console.error(
          "Login failed",
          response.status,
          response.statusText,
          errorData,
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("expirationTime");
    setUser(null);
    setIsAuthenticated(false);
    if (timeoutId) clearTimeout(timeoutId);
  };

  const setSessionTimeout = (expiresIn) => {
    if (timeoutId) clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => {
      logout();
    }, expiresIn);
    setTimeoutId(newTimeoutId);
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userInfo = {
        email: user.email,
        name: user.displayName,
        displayName: user.displayName,
        photoURL: user.photoURL,
        providerId: user.providerData[0].providerId,
      };

      setGoogleUser(userInfo);
    } catch (error) {
      console.error("Google Sign-In error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        isAuthenticated,
        sendOtp,
        loginWithGoogle,
        googleUser,
        logout,
        fetchUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
