import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/feature`;

const authHeader = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const featureApi = {
    getFeature: async () => axios.get(API_URL),

    updateFeature: async (formData: FormData) =>
        axios.patch(API_URL, formData, {
            ...authHeader(),
            headers: {
                ...authHeader().headers,
                "Content-Type": "multipart/form-data",
            },
        }),
};
