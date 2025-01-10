import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import * as apiClient from '../../api-client';

const Register = () => {
    const [ isRegisterProcessing, setIsRegisterProcessing ] = useState(false);
    /* Navigate to different routes */
    const navigate = useNavigate();
    /* Extract showToast function from context */
    const { showToast } = useAppContext();
    /* Extract the needed function in useForm() */
    const { register, watch, formState: { errors }, handleSubmit } = useForm();

    /* Function to create items from the API */
    const onSubmit = async (form_data) => {
        try{
            /* Set isLoginProcessing to true */
            setIsRegisterProcessing(true);

            /* Call signIn from api-client for user sign in  */
            const response = await apiClient.register(form_data);

            /* Check if response is valid */
            if(response){
                /* Set auth token to localStorage */
                localStorage.setItem('auth_token', response.token);
                /* Show success toast */
                showToast({ message: "Registered Successful!", type: "SUCCESS" })
                /* Navigate to sign in page */
                navigate('/sign_in');
            }
            else{
                throw new Error('Failed to register account');
            }
        }
        catch(error){
            console.error('Error account registration:', error);
            showToast({ message: error.message, type: "ERROR"});
        }
        finally {
            /* Always set isLoginProcessing back to false regardless whether sign in succeeds or fails.*/
            setIsRegisterProcessing(false);
        }
    }

    return (
        <div className="flex flex-col items-center mt-12">
            <h1 className="text-2xl font-bold mb-6">Create an Account</h1>
            <form className="flex flex-col w-full max-w-xs" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="first_name" className="mb-2 text-sm font-medium">First Name:</label>
                <input
                    type="text"
                    id="first_name"
                    className="p-2 rounded border border-gray-300 ring-2 ring-black-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register('firstName', { required: '*This field is required' })}
                />
                {errors.firstName && (
                    <span className="text-red-500">{errors.firstName.message}</span>
                )}

                <label htmlFor="last_name" className="mb-2 text-sm font-medium">Last Name:</label>
                <input
                    type="text"
                    id="last_name"
                    className="p-2 rounded border border-gray-300 ring-2 ring-black-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register('lastName', { required: '*This field is required' })}
                />
                {errors.lastName && (
                    <span className="text-red-500">{errors.lastName.message}</span>
                )}

                <label htmlFor="email" className="mb-2 text-sm font-medium">Email:</label>
                <input
                    type="email"
                    id="email"
                    className="p-2 rounded border border-gray-300 ring-2 ring-black-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register('email', { required: '*This field is required' })}
                />
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}

                <label htmlFor="password" className="mb-2 text-sm font-medium">Password:</label>
                <input
                    type="password"
                    id="password"
                    className="p-2 rounded border border-gray-300 ring-2 ring-black-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register('password', {
                        required: '*This field is required',
                        minLength: {
                        value: 6,
                        message: '*Password must be at least 6 characters',
                        },
                    })}
                />
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}

                <label htmlFor="confirmPassword" className="mb-2 text-sm font-medium">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    className="p-2 rounded border border-gray-300 ring-2 ring-black-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register('confirmPassword', {
                        validate: (val) => {
                        if (!val) {
                            return '*This field is required';
                        } else if (watch('password') !== val) {
                            return '*Your passwords do not match';
                        }
                        },
                    })}
                />
                {errors.confirmPassword && (
                    <span className="text-red-500">{errors.confirmPassword.message}</span>
                )}

                <button 
                    type="submit" 
                    className={`p-3 mt-4 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition mb-4
                        ${isRegisterProcessing ? 'cursor-not-allowed' : ''}`}
                    disabled={isRegisterProcessing ? true : false}
                >
                    {isRegisterProcessing ? 'Account Creating...' : 'Register'}
                </button>
            </form>
            <p className="text-sm">
                Already have an account?{' '}
                <span 
                    onClick={() => navigate('/sign_in')} 
                    className="text-blue-600 cursor-pointer underline hover:text-blue-700"
                >
                    Sign In
                </span>
            </p>
        </div>
    );
}

export default Register
