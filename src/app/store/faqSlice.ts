import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { faqApi } from "@/app/services/faq.api";

export interface FAQItem {
    _id: string;
    question: string;
    answer: string;
    createdAt: string;
}

interface FAQState {
    list: FAQItem[];
    selectedFaq: FAQItem | null;
    loading: boolean;
    error: string | null;
}

const initialState: FAQState = {
    list: [],
    selectedFaq: null,
    loading: false,
    error: null,
};

export const fetchFaqs = createAsyncThunk("faq/getAll", async () => {
    const res = await faqApi.getAll();
    return res.data.data.results;
});

export const fetchSingleFaq = createAsyncThunk("faq/getOne", async (id: string) => {
    const res = await faqApi.getOne(id);
    return res.data.data;
});

export const createFaq = createAsyncThunk("faq/create", async (data: { question: string; answer: string }) => {
    const res = await faqApi.create(data);
    return res.data.data;
});

export const updateFaq = createAsyncThunk(
    "faq/update",
    async (payload: { id: string; data: { question: string; answer: string } }) => {
        const res = await faqApi.update(payload.id, payload.data);
        return res.data.data;
    }
);

export const deleteFaq = createAsyncThunk("faq/delete", async (id: string) => {
    await faqApi.delete(id);
    return id;
});

export const faqSlice = createSlice({
    name: "faq",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFaqs.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchFaqs.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload;
        });

        builder.addCase(fetchSingleFaq.fulfilled, (state, action) => {
            state.selectedFaq = action.payload;
        });

        builder.addCase(createFaq.fulfilled, (state, action) => {
            state.list.unshift(action.payload);
        });

        builder.addCase(updateFaq.fulfilled, (state, action) => {
            state.list = state.list.map((faq) => (faq._id === action.payload._id ? action.payload : faq));
        });

        builder.addCase(deleteFaq.fulfilled, (state, action) => {
            state.list = state.list.filter((faq) => faq._id !== action.payload);
        });
    },
});

export default faqSlice.reducer;
