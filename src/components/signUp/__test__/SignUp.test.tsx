import React from "react";
import SignUp from "../SignUp";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {optionalSignUpDataType} from "../../types";

const typeIntoForm = ({email, password, confirmPassword}: optionalSignUpDataType) => {
    const emailInputElement = screen.getByPlaceholderText<HTMLInputElement>("email");
    const passwordInputElement = screen.getByPlaceholderText<HTMLInputElement>("password");
    const confirmPasswordInputElement = screen.getByPlaceholderText<HTMLInputElement>(/confirm password/i);

    if (email) {
        userEvent.type(emailInputElement, email)
    }
    if (password) {
        userEvent.type(passwordInputElement, password)
    }
    if (confirmPassword) {
        userEvent.type(confirmPasswordInputElement, confirmPassword)
    }

    return{
        emailInputElement,
        passwordInputElement,
        confirmPasswordInputElement
    }
};

const clickOnSubmitButton = () => {
    const buttonSubmitElement = screen.getByRole('button',{
        name: /Submit/i
    });
    userEvent.click(buttonSubmitElement)
};

describe('Sign up Component',() => {
    beforeEach(() => {
       render(<SignUp/>);
    });

    test("inputs should be initially empty",() => {
        expect(screen.getByPlaceholderText<HTMLInputElement>("email").value).toBe("");
        expect(screen.getByPlaceholderText<HTMLInputElement>("password").value).toBe("");
        expect(screen.getByPlaceholderText<HTMLInputElement>(/confirm password/i).value).toBe("");
    });

    test("should be able to type an email", () => {
        const {emailInputElement} = typeIntoForm({email: "sorihedayat72@gmail.com"});
        expect(emailInputElement.value).toBe("sorihedayat72@gmail.com");
    });

    test("should be able to type a password", () => {
        const {passwordInputElement} = typeIntoForm({password: "12345"});
        expect(passwordInputElement.value).toBe("12345");
    });

    test("should be able to type a confirm password", () => {
        const {confirmPasswordInputElement} = typeIntoForm({confirmPassword: "12345"});
        expect(confirmPasswordInputElement.value).toBe("12345");
    });

    describe("Handle Errors", () => {
       test("should show email error message on invalid email", () => {
           expect(screen.queryByText(/The email you input is invalid./i)).not.toBeInTheDocument();
           typeIntoForm({email: "notValidEmail"});
           clickOnSubmitButton();
           expect(screen.queryByText(/The email you input is invalid./i)).toBeInTheDocument();
       });
       test("should show password error message on invalid password", () => {
           expect(screen.queryByText(/The password you entered should contain 5 or more characters./i)).not.toBeInTheDocument();
           typeIntoForm({
               email: "sorihedayat72@gmail.com",
               password: "123"
           });
           clickOnSubmitButton();
           expect(screen.queryByText(/The password you entered should contain 5 or more characters./i)).toBeInTheDocument();
       });
       test("should show confirm password error message on invalid confirm password", () => {
           expect(screen.queryByText(/The passwords don't match. Try again./i)).not.toBeInTheDocument();
           typeIntoForm({
               email: "sorihedayat72@gmail.com",
               password: "12345",
               confirmPassword: "321"
           });
           clickOnSubmitButton();
           expect(screen.queryByText(/The passwords don't match. Try again./i)).toBeInTheDocument();
       });
       test("should show no error message if every input is valid",() => {
           typeIntoForm({
               email: "sorihedayat72@gmail.com",
               password: "12345",
               confirmPassword: "12345"
           });
           clickOnSubmitButton();
           expect(screen.queryByText(/The email you input is invalid./i)).not.toBeInTheDocument();
           expect(screen.queryByText(/The password you entered should contain 5 or more characters./i)).not.toBeInTheDocument();
           expect(screen.queryByText(/The passwords don't match. Try again./i)).not.toBeInTheDocument();
       })
    });
});






