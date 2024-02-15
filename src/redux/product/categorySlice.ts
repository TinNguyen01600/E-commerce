import axios from "axios";
import { RootState } from "../../app/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type CategoryType = {
	id: number;
	name: string;
	image: string;
};

interface CategoryState {
	allCategories: CategoryType[];
	loading: boolean;
	error?: string;
}

const initialState: CategoryState = {
	allCategories: [],
	loading: false,
};

export const fetchAllCategoriesAsync = createAsyncThunk(
	"fetchAllCategoriesAsync",
	async () => {
		try {
			const res = await axios(
				`https://api.escuelajs.co/api/v1/categories`
			);
			const data = res.data;
			return data;
		} catch (e) {
			const error = e as Error;
			return error;
		}
	}
);

const categorySlice = createSlice({
	name: "categories",
	initialState,
	reducers: {},
	extraReducers(builder) {
		// fetch all categories
		builder.addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
			if (!(action.payload instanceof Error)) {
				state.allCategories = action.payload;
				state.loading = false;
			}
		});
		builder.addCase(fetchAllCategoriesAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchAllCategoriesAsync.rejected, (state, action) => {
			if (action.payload instanceof Error) {
				state.loading = false;
				state.error = action.payload.message;
			}
		});
	},
});

export const { } = categorySlice.actions

export const selectCategories = (state: RootState) => state.products.allProducts

export default categorySlice.reducer
