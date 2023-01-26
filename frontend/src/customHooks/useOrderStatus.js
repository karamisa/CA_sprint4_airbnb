import { useState } from 'react'
import { orderService } from '../services/order.service.local'

export const useOrderStatus = (order) => {
  const [orderForPrecessing, setOrderForPrecessing] = useState(order)

  // host approves
  function approveOrder() {
    setOrderForPrecessing((prevState) => ({
      ...prevState,
      status: 'approved',
    }))

    _save(orderForPrecessing)
  }

  // host rejects
  function rejectOrder() {
    setOrderForPrecessing((prevState) => ({
      ...prevState,
      status: 'rejected',
    }))

    _save(orderForPrecessing)
  }

  // user can cancel order till it turns to processing status
  function cancelOrder() {
    setOrderForPrecessing((prevState) => ({
      ...prevState,
      status: 'cancelled',
    }))

    _save(orderForPrecessing)
  }

  // TODO do logic
  // when  start date comes, status will updated to precessing state
  function _startProcessing() {
    setOrderForPrecessing((prevState) => ({
      ...prevState,
      status: 'processing',
    }))
  }

  // TODO do logic
  // when  end date  comes, status will updated to finished state
  function _finishOrder() {
    setOrderForPrecessing((prevState) => ({
      ...prevState,
      status: 'finished',
    }))
  }

  function _save(orderToSave) {
    orderService.save(orderToSave)
  }

  return {
    orderForPrecessing, // updated order, use it in parent component
    rejectOrder,
    approveOrder,
    cancelOrder,
  }
}
