import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getCities = createAsyncThunk('city/getCities', async () => fetch('https://api.teleport.org/api/urban_areas/')
  .then((res) => res.json())
  .then(async (data) => {
    const cities = await Promise.all(data._links['ua:item'].map(async (city) => { // eslint-disable-line no-underscore-dangle
      const cityId = city.href.slice(city.href.lastIndexOf(':') + 1, -1);
      return fetch(`${city.href}scores/`)
        .then((result) => result.json())
        .then((dataCity) => Object.assign(city,
          { categories: dataCity.categories },
          { id: cityId },
          { globalScore: dataCity.teleport_city_score }));
    }));
    return cities;
  })
  .catch((error) => {
    throw new Error(error);
  }));

export const getCity = createAsyncThunk('city/getCity', async (id) => fetch(`https://api.teleport.org/api/urban_areas/slug:${id}/details/`)
  .then((res) => res.json())
  .then((data) => data)
  .catch((error) => {
    throw new Error(error);
  }));

const citySlice = createSlice({
  name: 'city',
  initialState: { cities: [], loading: false, refresh: true },
  extraReducers: {
    [getCities.pending]: (state) => ({ ...state, loading: true }),
    [getCities.fulfilled]: (state, action) => ({
      ...state,
      cities: action.payload,
      loading: false,
    }),
    [getCities.rejected]: (state) => ({ ...state, loading: false }),
  },
});
export default citySlice.reducer;
