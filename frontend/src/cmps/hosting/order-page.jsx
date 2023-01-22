import { useEffect, useState } from 'react';
import { orderService } from '../../services/order.service';
import { OrderList } from './order-list/order-list';

export function OrderPage() {
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
    <div className='secondary-layout order-page'>
      <div className='hero'>
        <h2>Welcome back</h2>
      </div>
      <h3>Orders</h3>
      <OrderList orders={orders} setOrders={setOrders} />
    </div>
  );
}
