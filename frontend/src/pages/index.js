import { toast, ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import SeatStatus from "../components/SeatStatus";
import SeatBook from "../components/SeatBook";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { bookingURL } from "@/constants/baseUrl";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const token = getCookie('token');
    if(!token) {
      return router.push('/login');
    }
    try {
      const response = await axios.get(bookingURL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
      setData(response.data.availableSeats);

    } catch (error) {
      // console.error("Error fetching data:", error);
      toast.error("Error fetching data.");
    }
    setLoading(false);
    return
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main className="min-h-screen flex items-center justify-between bg-gray-100 w-screen py-4 lg:py-0">
      <ToastContainer />
      <div className=" w-full flex flex-col lg:flex-row items-center justify-center">
        <SeatStatus data={data} />
        <SeatBook loading={loading}  fetchData={fetchData} />
      </div>
    </main>
  );
}