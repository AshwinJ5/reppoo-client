import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/testimonial`;

const authHeader = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const testimonialApi = {
    getAll: async () => axios.get(API_URL),

    getOne: async (id: string) => axios.get(`${API_URL}/${id}`),

    create: async (formData: FormData) =>
        axios.post(API_URL, formData, {
            ...authHeader(),
            headers: {
                ...authHeader().headers,
                "Content-Type": "multipart/form-data",
            },
        }),

    update: async (id: string, formData: FormData) =>
        axios.patch(`${API_URL}/${id}`, formData, {
            ...authHeader(),
            headers: {
                ...authHeader().headers,
                "Content-Type": "multipart/form-data",
            },
        }),

    delete: async (id: string) => axios.delete(`${API_URL}/${id}`, authHeader()),
};
