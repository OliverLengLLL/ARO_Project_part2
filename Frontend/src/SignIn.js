import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, phone, password } = formData;

    // Password validation rules
    const passwordRequirements = [
      {
        test: /.{8,}/,
        message: "Password must be at least 8 characters long.",
      },
      {
        test: /[A-Z]/,
        message: "Password must include at least one uppercase letter.",
      },
      {
        test: /[a-z]/,
        message: "Password must include at least one lowercase letter.",
      },
      {
        test: /[0-9]/,
        message: "Password must include at least one number.",
      },
      {
        test: /[!@#$%^&*(),.?":{}|<>]/,
        message: "Password must include at least one special character.",
      },
    ];

    // Check if password meets all requirements
    const failedRequirements = passwordRequirements.filter(
      (requirement) => !requirement.test.test(password)
    );

    if (failedRequirements.length > 0) {
      alert(
        "Password does not meet the following requirements:\n" +
          failedRequirements.map((req) => `- ${req.message}`).join("\n")
      );
      return;
    }

    if (email && phone && password) {
      console.log("Form Data Submitted:", formData);
      navigate("/home");
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="signin-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
