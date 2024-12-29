import { useState } from "react";
import Seat from "./Seat";

export default function SeatStatus({ data }) {
    let booked = 0;

    data?.map((item) => {
        if (item.isbooked) booked++;
    });

    // console.log("Data:", data, "Booked:", booked, "Not Booked:", data?.length - booked);

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            {/* Seat Grid */}
            {data.length !== 0 ? <div className="grid grid-cols-7 gap-2 bg-gray-50 p-4 rounded-lg shadow-md w-fit">
                {data?.map((item) => (
                    <Seat key={item.id} isBooked={item.isbooked} seatNumber={item.seatnumber} />
                ))}
            </div>
                : <div className="text-center text-gray-700 font-bold">Loading...</div>
            }

            {/* Booking Status */}
            <div className="flex flex-col sm:flex-row gap-2 justify-between sm:w-[400px] text-gray-700 font-bold">
                <div className="bg-yellow-300 text-center rounded-lg p-2 flex-1 mx-1 w-full">
                    Booked Seats = {booked}
                </div>
                <div className="bg-green-500 text-center rounded-lg p-2 flex-1 mx-1 w-full">
                    Available Seats = {data?.length - booked}
                </div>
            </div>
        </div>
    );
}
