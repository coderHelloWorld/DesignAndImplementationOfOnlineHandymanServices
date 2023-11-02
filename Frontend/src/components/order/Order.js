import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './order.module.css';

const OrderComponent = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtTokenForHandyman');
        const response = await axios.get(process.env.REACT_APP_API_URL + '/order/order', {
            headers: {
              Authorization: `Bearer ${jwtToken}`
            }
          });
        setOrders(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  const cal = (data) => {
    const timestamp = new Date(data);
    const date = timestamp.toLocaleString('en-US', { timeZone: 'UTC' }).split(',')[0]; // Extract date part
    const time = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Extract time part
    return { date, time };
  };
  
  

  return (
    <div lassName={styles.bg}>
        <div className={styles.container}>
          {orders.map(order => (
            <div className={styles.order} key={order.createdAt}>
              <h2 className={styles.title}>Item Name: {order.subitemName}</h2>
              <p className={styles.text}>Price: {order.price}</p>
              <p className={styles.text}>To be fulfilled by {order.workername} On Date {cal(order.prefereddate).date} at {cal(order.preferedtime).time}</p>
              <p className={styles.text}>Instruction for {order.workername} : {order.instruction}</p>
              <p className={styles.text}>Status: {order.status}</p>
              <p className={styles.text}>At - {order.address}</p>
            </div>
          ))}
        </div>
    </div>

  );
};

export default OrderComponent;
