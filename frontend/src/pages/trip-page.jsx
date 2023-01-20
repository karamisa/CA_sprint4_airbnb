import { useEffect, useState } from 'react';
import { TripList } from '../cmps/trip-list/trip-list';
import { orderService } from '../services/order.service';

export function TripPage() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const orders = await orderService.query();
      console.log('orders:', orders);
      setOrders(orders);
    } catch (err) {
      console.log('Cannot load orders: ', err);
    }
  }
  return (
    <div className='main-layout'>
      <h1>Trips</h1>
      <TripList orders={orders} setOrders={setOrders} />
    </div>
  );
}
