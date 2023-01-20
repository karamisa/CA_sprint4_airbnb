import { useEffect, useState } from 'react';
import { orderService } from '../../services/order.service';
import { OrderList } from './order-list';

export function OrderPage() {
  // const [orders, setOrders] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const orders = await orderService.query();
      console.log('orders:', orders);
      // setOrders(orders);
    } catch (err) {
      console.log('Cannot load orders: ', err);
    }
  }
  return (
    <div>
      <h1>Orders</h1>
      {/* <OrderList orders={orders} /> */}
    </div>
  );
}
