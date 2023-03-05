import React from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signup, login } from "./request";
import { useNavigate } from "react-router-dom";
export const Signup = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });

    // Cleanup function to remove the event listeners when the component unmounts
    return () => {
      signUpButton.removeEventListener("click", () => {
        container.classList.add("right-panel-active");
      });

      signInButton.removeEventListener("click", () => {
        container.classList.remove("right-panel-active");
      });
    };
  }, []);

  async function signupHandle(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const payload = {};
    for (const [key, val] of form.entries()) {
      if (!val) {
        toast.error(`please enter the value of ${key}`);
      }
      payload[key] = val;
    }
    const { message, err } = await signup(payload);
    if (message) {
      toast.success(message);
      navigate(`/contacts`);
    } else if (err) {
      toast.error(err);
    }
  }

  async function loginHandler(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const payload = {};
    for (const [key, val] of form.entries()) {
      if (!val) {
        toast.error(`Please enter the ${key}`);
      }
      payload[key] = val;
    }
    const { message, err } = await login(payload);
    if (message) {
      toast.success(message);
      navigate(`/contacts`);
    } else if (err) {
      toast.error(err);
    }
  }

  return (
    <>
      <div className="cont">
        <div class="container" id="container">
          <div class="form-container sign-up-container">
            <form onSubmit={signupHandle}>
              <h1>Create Account</h1>
              <div class="social-container">
                <a href="#" class="social">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    fill="#000000"
                    viewBox="80 80 256 256"
                  >
                    <rect width="25" height="25" fill="none"></rect>

                    <path
                      d="M168,88H152a23.9,23.9,0,0,0-24,24V224"
                      fill="none"
                      stroke="#4267B2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="29"
                      transform="scale(1.5)"
                    ></path>
                    <line
                      x1="96"
                      y1="149"
                      x2="160"
                      y2="149"
                      fill="none"
                      stroke="#4267B2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="29"
                      transform="scale(1.5)"
                    ></line>
                  </svg>
                </a>
                <a href="#" class="social">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <rect width="256" height="256" fill="none"></rect>
                    <path
                      d="M128,128h88a88.1,88.1,0,1,1-25.8-62.2"
                      fill="none"
                      stroke="#000000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="25"
                    ></path>
                  </svg>
                </a>
                <a href="#" class="social">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <rect width="256" height="256" fill="none"></rect>
                    <path
                      d="M128,88c0-22,18.5-40.3,40.5-40a40,40,0,0,1,36.2,24H240l-32.3,32.3A127.9,127.9,0,0,1,80,224c-32,0-40-12-40-12s32-12,48-36c0,0-64-32-48-120,0,0,40,40,88,48Z"
                      fill="none"
                      stroke="#1DA1F2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="25"
                    ></path>
                  </svg>
                </a>
              </div>
              <span>or use your email for registration</span>
              <input type="text" placeholder="Name" name="name" />
              <input
                type="tel"
                placeholder="Phone No"
                maxlength="10"
                name="phone"
              />
              <input type="password" placeholder="Password" name="password" />
              <button style={{ marginTop: "10px" }}>Sign Up</button>
            </form>
          </div>
          <div class="form-container sign-in-container">
            <form onSubmit={loginHandler}>
              <h1>Log In</h1>
              <div class="social-container">
                <a href="#" class="social">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    fill="#000000"
                    viewBox="80 80 256 256"
                  >
                    <rect width="25" height="25" fill="none"></rect>

                    <path
                      d="M168,88H152a23.9,23.9,0,0,0-24,24V224"
                      fill="none"
                      stroke="#4267B2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="29"
                      transform="scale(1.5)"
                    ></path>
                    <line
                      x1="96"
                      y1="149"
                      x2="160"
                      y2="149"
                      fill="none"
                      stroke="#4267B2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="29"
                      transform="scale(1.5)"
                    ></line>
                  </svg>
                </a>
                <a href="#" class="social">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <rect width="256" height="256" fill="none"></rect>
                    <path
                      d="M128,128h88a88.1,88.1,0,1,1-25.8-62.2"
                      fill="none"
                      stroke="#000000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="25"
                    ></path>
                  </svg>
                </a>
                <a href="#" class="social">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <rect width="256" height="256" fill="none"></rect>
                    <path
                      d="M128,88c0-22,18.5-40.3,40.5-40a40,40,0,0,1,36.2,24H240l-32.3,32.3A127.9,127.9,0,0,1,80,224c-32,0-40-12-40-12s32-12,48-36c0,0-64-32-48-120,0,0,40,40,88,48Z"
                      fill="none"
                      stroke="#1DA1F2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="25"
                    ></path>
                  </svg>
                </a>
              </div>
              <span>or use your account</span>
              <input
                type="tel"
                placeholder="Phone No"
                maxlength="10"
                name="phone"
              />
              <input type="password" placeholder="Password" name="password" />
              <a href="#">Forgot your password?</a>
              <button>Log In</button>
            </form>
          </div>
          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button class="ghost" id="signIn">
                  Log In
                </button>
              </div>
              <div class="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button class="ghost" id="signUp">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
