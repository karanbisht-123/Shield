// cryptoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCryptoList = createAsyncThunk(
  'crypto/fetchCryptoList',
  async () => {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    return response.data;
  }
);

export const fetchExchangeRate = createAsyncThunk(
  'crypto/fetchExchangeRate',
  async ({ receiveCurrency, spendCurrency }) => {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${receiveCurrency}&vs_currencies=${spendCurrency}`
    );
    return response.data[receiveCurrency][spendCurrency];
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    spendAmount: "100",
    receiveAmount: "0",
    spendCurrency: "usd",
    receiveCurrency: "bitcoin",
    exchangeRate: 0,
    loading: false,
    error: "",
    cryptoList: [],
    activeSection: "cryptoToFiat",
  },
  reducers: {
    setSpendAmount: (state, action) => {
      state.spendAmount = action.payload;
    },
    setReceiveAmount: (state, action) => {
      state.receiveAmount = action.payload;
    },
    setSpendCurrency: (state, action) => {
      state.spendCurrency = action.payload;
    },
    setReceiveCurrency: (state, action) => {
      state.receiveCurrency = action.payload;
    },
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },
    toggleCurrencies: (state) => {
      const tempCurrency = state.spendCurrency;
      const tempAmount = state.spendAmount;
      state.spendCurrency = state.receiveCurrency;
      state.receiveCurrency = tempCurrency;
      state.spendAmount = state.receiveAmount;
      state.receiveAmount = tempAmount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCryptoList.fulfilled, (state, action) => {
        state.loading = false;
        state.cryptoList = action.payload;
      })
      .addCase(fetchCryptoList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchExchangeRate.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExchangeRate.fulfilled, (state, action) => {
        state.loading = false;
        state.exchangeRate = action.payload;
      })
      .addCase(fetchExchangeRate.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch exchange rate. Please try again.";
      });
  },
});

export const {
  setSpendAmount,
  setReceiveAmount,
  setSpendCurrency,
  setReceiveCurrency,
  setActiveSection,
  toggleCurrencies,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;