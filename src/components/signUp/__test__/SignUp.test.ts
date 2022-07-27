import React from 'react';
import SignUp from "../SignUp";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {signUpDataType} from "../../types";

const typeIntoForm = ({email, password, confirmPassword}: signUpDataType) => {
    const emailInputElement = screen.getByLabelText("email");
    const passwordInputElement = screen.getByLabelText("password");
    const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);

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
}

const clickOnSubmitButton = () => {
    const buttonSubmitElement = screen.getByRole('button',{
        name: /Submit/i
    });
    userEvent.click(buttonSubmitElement)
}

describe('Sign up Component',() => {
    beforeEach(() => {
       render(<SignUp/>);
    })
});






