import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import * as apiClient from '../../api-client';

const SignIn = () => {
    const [ isLoginProcessing, setIsLoginProcessing ] = useState(false);
    /* Navigate to different routes */
    const navigate = useNavigate();
    /* Extract showToast function from context */
    const { showToast, setToken } = useAppContext();
    /* Extract the needed function in useForm() */
    const { register, formState: { errors }, handleSubmit } = useForm();

    /* Function to create items from the API */
    const onSubmit = async (form_data) => {
        try{
            /* Set isLoginProcessing to true */
            setIsLoginProcessing(true);

            /* Call signIn from api-client for user sign in  */
            const response = await apiClient.signIn(form_data);

            /* Check if response is valid */
            if(response){
                /* Set auth token to token state */
                setToken(response.token);
                /* Show success toast */
                showToast({ message: "Sign in Successful", type: "SUCCESS" })
                /* Navigate to home */
                navigate('/');
            }
            else{
                throw new Error('Failed to sign in');
            }
        }
        catch(error){
            console.error('Error sign in:', error);
            showToast({ message: error.message, type: "ERROR"});
        }
        finally {
            /* Always set isLoginProcessing back to false regardless whether sign in succeeds or fails.*/
            setIsLoginProcessing(false);
        }
    }

    return (
        <div className="flex flex-col items-center mt-14 px-4">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <form className="flex flex-col max-w-sm w-full" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email" className="mb-2 font-medium">Email:</label>
                <input
                    type="email"
                    id="email"
                    className="p-2 rounded border border-gray-300 ring-2 ring-black-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register("email", { required: "*This field is required" })}
                />
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
                <label htmlFor="password" className="mb-2 font-medium">Password:</label>
                <input
                    type="password"
                    id="password"
                    className="p-2 rounded border border-gray-300 ring-2 ring-black-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register("password", {
                        required: "*This field is required",
                        minLength: {
                        value: 6,
                        message: "*Password must be at least 6 characters",
                        },
                    })}
                />
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
                <button 
                    type="submit" 
                    className={`py-2 px-4 mt-4 rounded bg-blue-500 text-white hover:bg-blue-600
                        ${isLoginProcessing ? 'cursor-not-allowed' : ''}`}
                    disabled={isLoginProcessing ? true : false}
                >
                    {isLoginProcessing ? 'Logging in...' : 'Log in'}
                </button>
                <div className="flex justify-between text-sm mt-2">
                    <p>
                        No account yet?{' '}
                        <Link
                            to="/register"
                            className="text-blue-500 cursor-pointer underline"
                        >
                            Register
                        </Link>
                    </p>
                    <p>
                        Forgot Password?{' '}
                        <Link
                        to="/forgot_password"
                        className="text-blue-500 cursor-pointer underline whitespace-nowrap"
                        >
                            Reset Password
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default SignIn
