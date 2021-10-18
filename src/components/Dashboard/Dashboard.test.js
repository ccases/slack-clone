import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "./Dashboard";
import LogIn from "../LogIn/LogIn";

const LogInSetup = () => {
  const loginSetup = render(<LogIn />);
  const unameInput = loginSetup.getByPlaceholderText("name@work-email.com");
  const pwInput = loginSetup.getByPlaceholderText("Password");
  const loginBtn = loginSetup.getByRole("button", {
    name: "Sign in with Email",
  });
  return {
    unameInput,
    pwInput,
    loginBtn,
    ...loginSetup,
  };
};

// const DashboardSetup = () => {
//   const dashboardSetup = render(<Dashboard />);
//   const chattingWith = dashboardSetup.getByRole("heading", {
//     value: "testhello@test.com",
//   });
//   return {
//     chattingWith,
//     ...dashboardSetup,
//   };
// };

describe("Login page", () => {
  const { unameInput, pwInput, loginBtn } = LogInSetup();
  it("should render login", () => {
    expect(screen.getByText(/Sign in to Slack/i)).toBeInTheDocument();
  });
  it("should be able to type in username form", () => {
    fireEvent.change(unameInput, { target: { value: "testhello@test.com" } });
    expect(unameInput.value).toBe("testhello@test.com");
  });
  it("should be able to type in the password", () => {
    fireEvent.change(pwInput, { target: { value: "Hello12345" } });
    expect(pwInput.value.length).toBe(10);
  });
  it("should be able to login", () => {
    fireEvent.click(loginBtn);
    setTimeout(() => {
      expect(screen.getByText(/testestest/i)).toBeInTheDocument();
    }, 2000);
  });

//   describe("Dashboard", () => {
//     const { chattingWith } = DashboardSetup();
//     it("should go to your drafts on initialization", () => {
//       expect(chattingWith.value).toBe("testhello@test.com");
//     });
//   });
// });
