import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    title: '',
    content: '',
    confirmButtonText: "Yes, I'm sure",
    cancelButtonText: 'No, cancel',
    confirmButtonColor: 'bg-red-600 hover:bg-red-800',
    cancelButtonColor: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100 hover:text-blue-700',
    confirmButtonIcon: null,
    cancelButtonIcon: null,
    link1:null,
    link2:null,
    onConfirm: null,
    onCancel: null,
  },
  reducers: {
    openModal: (state, action) => {
      return { ...state, ...action.payload, isOpen: true };
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
