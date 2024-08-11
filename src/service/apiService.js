import axios from "axios";

// Create an axios instance with default configuration
const apiClient = axios.create({
  baseURL: "https://pro-api.coinmarketcap.com", // Replace with your API base URL
  timeout: 10000, // Optional: Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
    "X-CMC_PRO_API_KEY": "0cdf08b0-b3ac-4681-bfa8-5fcd465dffb9",

    // Add other default headers if needed
  },
});

// Define API functions
export const getSomeData = async () => {
  try {
    const response = await apiClient.get("v1/cryptocurrency/map"); // Replace '/endpoint' with your API endpoint
    console.log("yaaha", response.data);
    return response.data;
  } catch (error) {
    // Handle errors as needed
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postSomeData = async (data) => {
  try {
    const response = await apiClient.post("/endpoint", data); // Replace '/endpoint' with your API endpoint
    return response.data;
  } catch (error) {
    // Handle errors as needed
    console.error("Error posting data:", error);
    throw error;
  }
};

// Add more API functions as needed
