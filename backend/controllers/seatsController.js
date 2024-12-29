const Seat = require('../models/seats'); 

// Controller function to book seats
const reserveSeatsHandler = async (req, res) => {
  const { numOfSeats } = req.body;
  if (numOfSeats > 7) {
    return res.status(400).json({ message: 'Maximum 7 seats can be booked at a time!' });
  }

  try {
    // Get available seats
    const seats = await Seat.findAll({
      where: { isbooked: false },
      order: [['rownumber', 'ASC'], ['seatnumber', 'ASC']],
    });

console.log('seats', seats);

    // If not enough seats are available
    if (seats.length < numOfSeats) {
      return res.status(500).json({ message: `Booking failed! only ${seats.length} seats are available!` });
    }

    const rowCount = 12;

    // Try booking seats in the same row
    for (let row = 1; row <= rowCount; row++) {
      const rowSeats = seats.filter(seat => seat.rownumber === row.toString());
      if (rowSeats.length >= numOfSeats) {
        const seatsToBook = rowSeats.slice(0, numOfSeats);
        const seatIds = seatsToBook.map(seat => seat.id);

        
        // Bulk update
        await Seat.update(
          { isbooked: true },
          { where: { id: seatIds } }
        );

        return res.status(200).json({ data: seatsToBook });
      }
    }
   
    // Book seats in nearby rows if not available in the same row
    const rowSeatCounts = Array.from({ length: rowCount }, (_, i) =>
      seats.filter(seat => seat.rownumber === ((i + 1).toString())).length
    );

    console.log('rowSeatCounts', rowSeatCounts);

    let minLength = Infinity;
    let start = 0, end = 0, sum = 0, minStart = -1, minEnd = -1;

    //sliding window for minimum length to acccure all seats
    while (end < rowSeatCounts.length) {
      sum += rowSeatCounts[end];

      while (sum >= numOfSeats) {
        if (end - start + 1 < minLength) {
          minLength = end - start + 1;
          minStart = start;
          minEnd = end;
        }
        sum -= rowSeatCounts[start];
        start++;
      }

      end++;
    }

    console.log('minStart', minStart);
    console.log('minEnd', minEnd);


    const seatsToBook = [];
    for (let i = minStart + 1; i <= minEnd + 1; i++) {
      const rowSeats = seats.filter(seat => seat.rownumber === i.toString());
      seatsToBook.push(...rowSeats);
    }

    const finalSeats = seatsToBook.slice(0, numOfSeats);
    const seatIds = finalSeats.map(seat => seat.id);

    // Bulk update for final seats
    await Seat.update(
      { isbooked: true },
      { where: { id: seatIds } }
    );

    console.log('finalSeats', finalSeats);

    if (finalSeats.length) {
      return res.status(200).json({ data: finalSeats });
    }

    return res.status(500).json({ message: 'Booking failed!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error! Something went wrong!' });
  }
};

// Controller function to get all seats
const fetchAllSeats = async (req, res) => {
  try {
    const availableSeats = await Seat.findAll({
      order: [['rownumber', 'ASC'], ['seatnumber', 'ASC']],
    });
    return res.status(200).json({ availableSeats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error! Something went wrong!' });
  }
};

// Controller function to reset all seats to available
const resetAllSeats = async (req, res) => {
  try {
    // Remove all existing seats and reset primary key
    await Seat.destroy({ where: {}, truncate: true });

    const seatsPerRow = 7;
    const totalSeats = 80;
    const seats = Array.from({ length: totalSeats }, (_, index) => ({
      seatnumber: index + 1,
      rownumber: Math.floor(index / seatsPerRow) + 1,
      isbooked: false,
    }));

    // Insert the seats into the database in a single call
    await Seat.bulkCreate(seats);

    return res.json({ message: 'Data successfully reset' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error! Something went wrong!' });
  }
};


module.exports = { fetchAllSeats, resetAllSeats, reserveSeatsHandler };

