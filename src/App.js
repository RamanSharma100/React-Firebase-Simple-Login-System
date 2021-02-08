import React, { useState, useEffect } from "react";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import auth from "./auth/config";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.slim";
import "./styles.css";

const App = () => {
  // check if user is logined or not
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
        setUser(user);
      } else {
        setAuthenticated(false);
      }
    });

    if (err) {
      setInterval(() => setErr(""), 5000);
    }
    if (success) {
      setInterval(() => setSuccess(""), 5000);
    }
  }, [err, success]);
  //create user
  const createUser = (email, pass) => {
    auth
      .createUserWithEmailAndPassword(email, pass)
      .then((user) => {
        setSuccess("User is successfully registered");
        setErr("");
      })
      .catch((err) => {
        setErr("something went wrong");
        setSuccess("");
      });
  };

  // login user

  const loginUser = (email, pass) => {
    auth
      .signInWithEmailAndPassword(email, pass)
      .then((user) => {
        setAuthenticated(true);
        setUser(user);
        setSuccess("You are successfully logged in");
        setErr("");
      })
      .catch((err) => {
        setErr("Invalid Email or Password");
        setSuccess("");
      });
  };

  //logoutUser
  const logoutUser = () => {
    auth
      .signOut()
      .then((user) => {
        if (user) {
          setAuthenticated(false);
          setUser({});
          setSuccess("You are successfully logged out");
          setErr("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // set error

  const errorSetting = (error) => {
    setErr(error);
  };

  return (
    <div className="container">
      {err !== "" ? (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
          style={{
            position: "absolute",
            zIndex: "999",
            right: "5%",
            top: "10%"
          }}
        >
          <strong>{err}</strong>
        </div>
      ) : null}
      {success !== "" ? (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
          style={{
            position: "absolute",
            zIndex: "999",
            right: "5%",
            top: "10%"
          }}
        >
          <strong>{success}</strong>
        </div>
      ) : null}
      <div className="row">
        <h1 className="mx-auto py-5">
          Login System Using <span className="text-primary"> React</span> and
          <span className="text-primary"> Firebase</span>
        </h1>

        {!authenticated ? (
          <>
            <LoginForm loginUser={loginUser} errorSetting={errorSetting} />
            <RegisterForm createUser={createUser} errorSetting={errorSetting} />
          </>
        ) : (
          <>
            <h1>
              Welcome <span className="text-primary">{user.email} </span>{" "}
            </h1>
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={logoutUser}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
