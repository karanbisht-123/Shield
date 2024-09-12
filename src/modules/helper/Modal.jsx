import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../lib/slice/ModalSlice';
import { useNavigate } from 'react-router-dom';

const Modal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isOpen,
    title,
    content,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonIcon,
    cancelButtonIcon,
    onConfirm,
    onCancel,
    link1,
    link2,
  } = useSelector((state) => state.modal);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    dispatch(closeModal());
    if (link1) {
      navigate(link1);
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    dispatch(closeModal());
    if (link2) {
      navigate(link2);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(closeModal());
    }
  };

  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden bg-gray-900 bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div
        className="relative p-4 w-full max-w-md mx-auto bg-white rounded-lg shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
          onClick={() => dispatch(closeModal())}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="p-4 text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500">{title}</h3>
          <p className="mb-5 text-gray-500">{content}</p>
          <div className="flex justify-center gap-8 lg:gap-24">
            <button
              type="button"
              className={`inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg focus:ring-4 focus:outline-none ${confirmButtonColor}`}
              onClick={handleConfirm}
            >
              {/* {confirmButtonIcon && (
                <span className="mr-2">{confirmButtonIcon}</span>
              )} */}
              {confirmButtonText}
            </button>
            <button
              type="button"
              className={`ml-3 inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg focus:ring-4 focus:outline-none ${cancelButtonColor}`}
              onClick={handleCancel}
            >
              {/* {cancelButtonIcon && (
                <span className="mr-2">{cancelButtonIcon}</span>
              )} */}
              {cancelButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
