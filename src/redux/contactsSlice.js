import { createSelector, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchData } from './contactsOps';
import { selectNameFilter } from './filtersSlice';

const initialState = {
  contacts: {
    items: [],
  },
  isLoading: false,
  isError: false,
};

const slice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter(
          item => item.id !== action.payload.id
        );
        state.isLoading = false;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.items.push(action.payload);
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(fetchData.pending, deleteContact.pending, addContact.pending),
        state => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchData.rejected,
          deleteContact.rejected,
          addContact.rejected
        ),
        (state, action) => {
          state.isError = action.payload;
          state.isLoading = false;
        }
      );
  },
});
export const contactReducer = slice.reducer;
export const selectContacts = state => state.contacts.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectIsError = state => state.contacts.isError;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (phonebook, statusFilter) => {
    const newPhonebook = phonebook.filter(contact =>
      contact.name
        .toLowerCase()
        .trim()
        .includes(statusFilter.toLowerCase().trim())
    );
    return newPhonebook;
  }
);
