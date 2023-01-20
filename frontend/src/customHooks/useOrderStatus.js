import { useState } from 'react';

export const useOrderStatus = () => {
  const [order, setOrder] = useState({});

  function placeOrder(order) {
    setOrder(order);
  }

  function approveOrder() {
    setOrder((prevState) => ({
      ...prevState,
      status: 'approved',
    }));
  }

  function cancelOrder() {
    setOrder((prevState) => ({
      ...prevState,
      status: 'cancelled',
    }));
  }

  function confirmOrder() {
    setOrder((prevState) => ({
      ...prevState,
      status: 'confirmed',
    }));
  }

  function startProcessing() {
    setOrder((prevState) => ({
      ...prevState,
      status: 'processing',
    }));
  }

  function finishOrder() {
    setOrder((prevState) => ({
      ...prevState,
      status: 'finished',
    }));
  }

  return {
    order,
    placeOrder,
    approveOrder,
    cancelOrder,
    confirmOrder,
    startProcessing,
    finishOrder,
  };
};
