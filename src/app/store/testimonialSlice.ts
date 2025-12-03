import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { testimonialApi } from "@/app/services/testimonial.api";

export interface TestimonialItem {
    _id: string;
    comment: string;
    file: string;
    name: string;
    designation: string;
    company: string;
    createdAt: string;
}

interface TestimonialState {
    list: TestimonialItem[];
    loading: boolean;
    error: string | null;
}

const initialState: TestimonialState = {
    list: [],
    loading: false,
    error: null,
};

export const fetchTestimonials = createAsyncThunk("testimonial/getAll", async () => {
    const res = await testimonialApi.getAll();
    return res.data.data.results;
});

export const fetchSingleTestimonial = createAsyncThunk("testimonial/getOne", async (id: string) => {
    const res = await testimonialApi.getOne(id);
    return res.data.data;
});

export const createTestimonial = createAsyncThunk("testimonial/create", async (formData: FormData) => {
    const res = await testimonialApi.create(formData);
    return res.data.data;
});

export const updateTestimonial = createAsyncThunk(
    "testimonial/update",
    async (payload: { id: string; formData: FormData }) => {
        const res = await testimonialApi.update(payload.id, payload.formData);
        return res.data.data;
    }
);

export const deleteTestimonial = createAsyncThunk("testimonial/delete", async (id: string) => {
    await testimonialApi.delete(id);
    return id;
});

const testimonialSlice = createSlice({
    name: "testimonial",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTestimonials.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchTestimonials.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload;
        });

        builder.addCase(fetchTestimonials.rejected, (state) => {
            state.loading = false;
            state.error = "Failed to fetch testimonials";
        });

        builder.addCase(createTestimonial.fulfilled, (state, action) => {
            state.list.unshift(action.payload);
        });

        builder.addCase(updateTestimonial.fulfilled, (state, action) => {
            state.list = state.list.map((item) => (item._id === action.payload._id ? action.payload : item));
        });

        builder.addCase(deleteTestimonial.fulfilled, (state, action) => {
            state.list = state.list.filter((item) => item._id !== action.payload);
        });
        builder.addCase(fetchSingleTestimonial.fulfilled, (state, action) => {
            state.loading = false;
            const item = action.payload;
            const exists = state.list.find((t) => t._id === item._id);
            if (!exists) {
                state.list.push(item);
            }
        });
    },
});

export default testimonialSlice.reducer;
