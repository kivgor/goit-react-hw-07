import { createSlice } from '@reduxjs/toolkit';
import initPhonebook from '../initialList.json';

const initialState = {
  contacts: {
    items: initPhonebook,
  },
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
  },
});
export const contactReducer = slice.reducer;
export const { addContact, deleteContact } = slice.actions;
export const selectContacts = state => state.contacts.contacts.items;
