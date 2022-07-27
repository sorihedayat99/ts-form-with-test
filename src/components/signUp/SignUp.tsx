import React, {useState} from "react";
import validator from 'validator';
import {signUpDataType} from "../types";

const SignUp = () => {
    const [signUpData, setSignUpData] = useState<signUpDataType>({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpData({
            ...signUpData,
            [e.target.name]: e.target.value,
        });
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (validator.isEmail(signUpData.email) && signUpData.password.length > 5 && signUpData.password === signUpData.confirmPassword){
            setError("")
            return;
        }
        if (!validator.isEmail(signUpData.email)){
            setError("The email you input is invalid.");
            return;
        }
        if (signUpData.password.length < 5){
            setError("The password you entered should contain 5 or more characters.");
            return;
        }
        if (signUpData.password !== signUpData.confirmPassword){
            setError("The passwords don't match. Try again.");
        }
    };
    return (
        <div className="container my-5">
            <form>
                <div className="mb-3">
                    <label htmlFor='email' className='form-label'>
                        Email Address
                    </label>
                    <input id='email' type='email' name='email' className='form-control'
                           value={signUpData.email} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor='password' className='form-label'>
                        Email Address
                    </label>
                    <input id='password' type='password' name='password' className='form-control'
                           value={signUpData.password} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor='confirmPassword' className='form-label'>
                        Email Address
                    </label>
                    <input id='confirmPassword' type='password' name='confirmPassword' className='form-control'
                           value={signUpData.confirmPassword} onChange={handleChange}/>
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary" onClick={handleClick}>
                    Submit
                </button>
            </form>
        </div>
    )
}
export default SignUp