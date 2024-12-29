export default function Seat({ seatNumber, isBooked }) {
    // console.log("Seat Number:", seatNumber, "Is Booked:", isBooked);
    return (
      <div
        className={`h-8 w-8 md:h-10 md:w-10 flex items-center justify-center rounded-lg ${
          isBooked ? "bg-yellow-300" : "bg-green-500"
        }`}
      >
        <span className="font-semibold text-sm md:font-bold md:text-basic text-gray-800">{seatNumber}</span>
      </div>
    );
  }
  