import { useState } from "react";
import axios from "axios";
import Seat from "./Seat";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {  bookingURL } from "@/constants/baseUrl";

export default function SeatBook({ loading, fetchData }) {
    const router = useRouter();
    const [numberOfSeat, setNumberOfSeat] = useState("");
    const [axiosResponse, setAxiosResponse] = useState([]);
    const [bookingProcessing, setBookingProcessing] = useState(false);
    const [resetBookingProcessing, setResetBookingProcessing] = useState(false);

    const handelBookTicket = async () => {
        if (numberOfSeat > 7) {
            toast.error("Maximum 7 seats can be booked at a time!");
        } else if (!numberOfSeat || numberOfSeat <= 0) {
            toast.error("Please enter a valid number of seats.");
        } 
        
        setBookingProcessing(true);
        const token = getCookie('token');
        if (!token) {
            return router.push('/login');
        }
        try {
            const response = await axios.post(`${bookingURL}/book`,
                {
                    numOfSeats: numberOfSeat
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        contentType: "application/json"
                    }
                });

            fetchData();
            if (response.data.data) {
                setAxiosResponse(response.data.data);
                toast.success("Booking successful.");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            // console.error("Error booking seats:", error.response.data.message);
            //  toast.error(error.response.data.message);
        }
        setBookingProcessing(false);
        return
    };

    const handelResetBooking = async () => {
        setResetBookingProcessing(true);
        const token = getCookie('token');
        if (!token) {
            return router.push('/login');
        }
        try {
            await axios.post(bookingURL, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    contentType: "application/json"
                }
            });
            fetchData();
            setAxiosResponse([]);
            toast.success("Booking reset successful.");
        } catch (error) {
            // console.error("Error resetting booking:", error);
            // toast.error(error.response.data.message);
        }
        setResetBookingProcessing(false);
        return
    };

    return (
        <div className="w-full flex items-center justify-center">
            <div className="flex flex-col items-start gap-2 sm:gap-4 w-auto mt-6 md:min-w-[500px]">
                {/* Display Seats */}
                <h1 className="text-lg md:text-2xl font-bold text-center">
                    {(loading || bookingProcessing || resetBookingProcessing) ? "Please Wait" : "Ticket Booking"}
                </h1>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:items-center">
                    <strong>Booked Seats: </strong>
                    <div className="flex flex-row gap-1 sm:gap-2 ">
                        {axiosResponse.map((item) => (
                            <Seat key={item.id} isBooked={true} seatNumber={item.seatnumber} />
                        ))}
                    </div>
                </div>

                <div className="flex flex-row items-center gap-2">
                    {/* Booking Input */}
                    <div className="flex gap-2 w-full">
                        <input
                            type="number"
                            placeholder="Enter number of seats"
                            className="flex-1 border border-gray-300 rounded-lg p-2"
                            disabled={bookingProcessing || resetBookingProcessing}
                            value={numberOfSeat}
                            onChange={(e) => setNumberOfSeat(e.target.value)}
                        />
                        <button
                            className={`px-4 py-2 rounded-lg ${bookingProcessing || resetBookingProcessing
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-blue-500 text-white"
                                }`}
                            onClick={handelBookTicket}
                            disabled={bookingProcessing || resetBookingProcessing}
                        >
                            {bookingProcessing
                                ? <div role="status" className="font-lg">
                                    <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                                : "Book"}
                        </button>

                        {/* Reset Booking */}
                        <button
                            className={`w-full px-4 py-2 rounded-lg ${resetBookingProcessing
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-red-500 text-white"
                                }`}
                            onClick={handelResetBooking}
                            disabled={resetBookingProcessing || bookingProcessing}
                        >
                            {resetBookingProcessing
                                ? <div role="status">
                                    <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                                : "Reset"}
                        </button>
                    </div>



                </div>

            </div>
        </div>
    );
}
