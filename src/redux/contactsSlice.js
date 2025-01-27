import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from './contactsOps';
// import initPhonebook from '../initialList.json';

const initialState = {
  contacts: {
    // items: initPhonebook,
    items: [],
  },
  isLoading: false,
  isError: false,
};

const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.items.push(action.payload);
    },

    deleteContact: (state, action) => {
      state.contacts.items = state.contacts.items.filter(
        item => item.id !== action.payload
      );
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.isError = action.payload;
    },

    fetchDataSucess: (state, action) => {
      state.contacts.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        // state.isError = true;
        state.isError = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchData.pending, state => {
        state.isLoading = true;
        state.isError = false;
      });
  },
});
export const contactReducer = slice.reducer;
export const {
  addContact,
  deleteContact,
  setLoading,
  setError,
  fetchDataSucess,
} = slice.actions;
export const selectContacts = state => state.contacts.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectIsError = state => state.contacts.isError;
