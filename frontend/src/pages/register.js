import { authURL } from "@/constants/baseUrl";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Register() {
    const router = useRouter();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });

    // Handle input change for all fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Email and Password validation
        const emailRegex = /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/; 
        const isEmailValid = emailRegex.test(userData.email);
    
        if (userData.email === "" || userData.password === "") {
            toast.error("Please fill all fields");
            return;
        }
    
        if (!isEmailValid) {
            toast.error("Please enter a valid email address");
            return;
        }
    
        if (userData.password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }
    
        fetch(`${authURL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.user && data.token) {
                    setCookie("token", data.token);
                    setTimeout(() => {
                        router.push("/");
                    }, 2000);
                    toast.success(data.message);
                } else {
                    toast.error(data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="w-full max-w-md bg-white p-12 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Register
                    </button>
                    <div>
                        <p className="mt-4 text-sm text-center text-gray-600">
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-600">
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}
