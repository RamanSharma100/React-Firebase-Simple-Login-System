import React, { useState } from "react";

const LoginForm = ({ loginUser, errorSetting }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && pass) {
      loginUser(email, pass);
      setEmail("");
      setPass("");
    } else {
      errorSetting("Please fill in all fields");
    }
  };

  return (
    <div className="col-md-5 mx-auto border p-4">
      <form onSubmit={handleSubmit}>
        <h1 className="text-primary text-center font-weight-bolder mb-5">
          Login
        </h1>
        <div className="form-group my-2">
          <input
            type="text"
            name="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group my-2">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={pass}
            onChange={(event) => setPass(event.target.value)}
          />
        </div>
        <div className="form-group mt-5 mb-1">
          <button className="btn btn-block btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
