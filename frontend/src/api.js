import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api", // Backend API URL
});

// Fetch all services
export const fetchServices = async () => {
    try {
        const response = await API.get("/services");
        return response.data;
    } catch (error) {
        console.error("Error fetching services:", error);
        return [];
    }
};

// Fetch all users
export const fetchUsers = async () => {
    try {
        const response = await API.get("/users");
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};
