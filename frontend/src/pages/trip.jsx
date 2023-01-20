import { useEffect, useState } from 'react';
import { OrderList } from '../cmps/util-cmps/order-list/order-list';
import { orderService } from '../services/order.service';

export function Trip() {
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
    <div>
      <h1>Trips</h1>
      <OrderList orders={orders} setOrders={setOrders} />
    </div>
  );
}
