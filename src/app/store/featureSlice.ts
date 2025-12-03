import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { featureApi } from "@/app/services/feature.api";

interface FeatureItem {
    _id: string;
    title: string;
    subtitle: string;
    image: string;
    description: string;
    createdAt: string;
}

interface FeatureState {
    data: FeatureItem | null;
    loading: boolean;
    error: string | null;
}

const initialState: FeatureState = {
    data: null,
    loading: false,
    error: null,
};

export const fetchFeature = createAsyncThunk("feature/get", async () => {
    const res = await featureApi.getFeature();
    return res.data.data.result;
});

export const updateFeature = createAsyncThunk("feature/update", async (formData: FormData) => {
    const res = await featureApi.updateFeature(formData);
    return res.data.data;
});

const featureSlice = createSlice({
    name: "feature",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFeature.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchFeature.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });

        builder.addCase(fetchFeature.rejected, (state) => {
            state.loading = false;
            state.error = "Failed to load feature";
        });

        builder.addCase(updateFeature.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

export default featureSlice.reducer;
