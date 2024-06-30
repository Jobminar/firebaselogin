import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Routing from "./Routing";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routing />
      </Router>
    </AuthProvider>
  );
};

export default App;
