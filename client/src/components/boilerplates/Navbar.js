import React from "react";
import { FaReact } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ user, logoutUser }) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <FaReact className="App-logo" />

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/collection">
                Shop
              </Link>
            </li>
          </ul>
          <form class="d-flex">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link" aria-current="page" to="register">
                  Register
                </Link>
              </li>
              {/* If user is logged in then show Profile else Login */}
              {user ? (
                <li className="nav-item">
                  <Link
                    className="nav-link me-2"
                    aria-current="page"
                    to="profile"
                  >
                    Profile
                  </Link>
                </li>
              ) : (
                <Link
                  className="btn btn-dark"
                  to="login"
                  style={{
                    borderRadius: "30px",
                    backgroundColor: "transparent",
                  }}
                  role="button"
                >
                  Login
                </Link>
              )}
            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
