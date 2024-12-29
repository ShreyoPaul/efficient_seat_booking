const baseURL = process.env.NEXT_PUBLIC_ENDPOINT || 'http://localhost:8000';
const authURL = `${baseURL}/api/auth`;
const bookingURL = `${baseURL}/api/booking`;

export { baseURL, authURL, bookingURL };