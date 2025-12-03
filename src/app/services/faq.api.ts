import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/faq`;

const authHeader = () => {
    const token = localStorage.getItem("authToken");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};
export const faqApi = {
    getAll: async () => axios.get(API_URL),
    getOne: async (id: string) => axios.get(`${API_URL}/${id}`),
    create: async (data: { question: string; answer: string }) => axios.post(API_URL, data, authHeader()),
    update: async (id: string, data: { question: string; answer: string }) =>
        axios.patch(`${API_URL}/${id}`, data, authHeader()),
    delete: async (id: string) => axios.delete(`${API_URL}/${id}`, authHeader()),
};
