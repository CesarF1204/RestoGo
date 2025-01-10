import React from 'react'

const ForgotPassword = () => {
    return (
        <div className="flex flex-col items-center mt-12">
        <form className="flex flex-col max-w-sm w-full">
            <label htmlFor="email" className="mb-2 font-medium">Email Address:</label>
            <input
                type="email"
                id="email"
                className="p-2 rounded border border-gray-300 ring-2 ring-black-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            
            <button type="submit" className="py-2 px-4 mt-4 rounded bg-blue-500 text-white hover:bg-blue-600">Send Reset Link</button>
        </form>
        <p className="mt-2">A reset password link will be sent to your email address</p>
    </div>
    )
}

export default ForgotPassword
