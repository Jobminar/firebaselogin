import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginComponent.css";
import googleLogo from "./google-logo.png";
import coolieLogo from "./coolie-logo.png"; // Add your coolie logo path

const LoginComponent = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [googleLoginSuccess, setGoogleLoginSuccess] = useState(false);
  const { sendOtp, login, loginWithGoogle, googleUser } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    await sendOtp({ phone });
    setOtpSent(true);
  };

  const handleLogin = async () => {
    const success = await login({ phone, otp });
    if (success) {
      navigate("/home");
    }
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
    setGoogleLoginSuccess(true);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-box-header">
          <h2>Signup</h2>
          <img src={coolieLogo} alt="Coolie Logo" className="coolie-logo" />
        </div>
        {googleLoginSuccess && (
          <p>
            Subscription with Google successful, now verify your mobile number
            to continue
          </p>
        )}
        <div className="input-group">
          <input
            type="text"
            placeholder="Mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={handleSendOtp}>Send OTP</button>
        </div>
        {otpSent && (
          <div className="input-group">
            <input
              type="number"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <div className="social-login">
          <button onClick={handleGoogleLogin}>
            <img src={googleLogo} alt="Google" />
          </button>
        </div>
        <p>
          Don't have an account? <a href="/signup">signup</a>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
