# Seat Booking System

## Problem Description

There are 80 seats in a single coach of a train, with 7 seats in a row and the last row having only 3 seats. Users can reserve up to 7 seats at a time.

## Booking Priority:

1. **All seats in one row** if possible.
2. If not, **book the nearest available seats**.
3. Users can book tickets continuously until the coach is full.

---

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL

---

## Installation

## Backend Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ShreyoPaul/efficient_seat_booking
   ```

2. Navigate to the backend folder:

   ```bash
   cd main_directory/backend
   ```

3. Create a `.env` file in the backend folder and configure the following environment variables:

   ```plaintext
   SUPABASE_POSTGRESQL_DB_URL=<supabase_postgresql_uri>
   JWT=<jwt_secret_key>
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the backend server:

   ```bash
   node index.js
   ```

---

## Frontend Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ShreyoPaul/efficient_seat_booking
   ```

2. Navigate to the frontend folder:

   ```bash
   cd main_directory/frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the frontend server:

   ```bash
   npm run dev
   ```

---

## API Endpoints

## Base URL: `http://localhost:8000`

---

## Authentication Endpoints

**Base URL**: `${baseURL}/api/auth`

---

## Booking Endpoints

**Base URL**: `${baseURL}/api/booking`

1. **Get All Seats**
   - **Endpoint**: `GET /api/booking`
   - **Description**: Fetch the status of all seats in the train coach.

2. **Reset Seat Booking**
   - **Endpoint**: `POST /api/booking`
   - **Description**: Reset all seat bookings to their initial state.

3. **Book Seats**
   - **Endpoint**: `POST /api/booking/book`
   - **Description**: Book a specified number of seats.
   - **Request Body**:

     ```json
     {
       "seats": <number_of_seats_to_book>
     }
     ```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
