import { authURL } from "@/constants/baseUrl";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
    const router = useRouter();
    const [userData, setUserData] = useState({
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
        const emailRegex = /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/; // Validates email format
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
    
        fetch(`${authURL}/login`, {
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
                <h2 className="text-2xl font-semibold text-center mb-6">Log In</h2>
                <form onSubmit={handleSubmit}>
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
                        Login
                    </button>
                    <div>
                        <p className="mt-4 text-sm text-center text-gray-600">
                            Don't have an account?{" "}
                            <Link href="/register" className="text-blue-600">
                                Register
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}
