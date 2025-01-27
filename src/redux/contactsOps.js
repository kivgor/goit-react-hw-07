import axios from 'axios';
// import { fetchDataSucess, setError, setLoading } from './contactsSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://67954123aad755a134eba141.mockapi.io';

// export const fetchData = () => async dispatch => {
//   try {
//     dispatch(setError(false));
//     dispatch(setLoading(true));
//     const { data } = await axios.get('/contacts');
//     dispatch(fetchDataSucess(data));
//     dispatch(setLoading(false));
//   } catch (error) {
//     console.log(error);
//     dispatch(setError(true));
//   }
// };

export const fetchData = createAsyncThunk('contacts/fetchAll', async () => {
  try {
    const { data } = await axios.get('/contacts');
    return data;
  } catch (error) {
    console.log(error);
  }
});
