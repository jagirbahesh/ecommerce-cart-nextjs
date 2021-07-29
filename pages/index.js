import React, { useEffect, useState } from "react";
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const [cart, setCart] = useState([]);
  const [qty, setQty] = useState(1);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    SetTotal();
  });

  const SetTotal = () => {
    let total = 0;
    let cleanTotal = 0;
    cart.map((data) => {
      total += Number(data.price) * Number(data.qty);
      cleanTotal = total ? total : 0;
      return true;
    });
    setCartTotal(cleanTotal);
  };

  const cartObject = (e, detail) => {
    const qtyUpdate = { ...detail, qty: qty };
    setCartTotal(cartTotal + qtyUpdate.price);
    const matchProduct = cart.some((data) => detail.id === data.id);
    if (matchProduct) {
      const qtyUpdate = cart.map((item) =>
        item.id === Number(detail.id)
          ? { ...item, qty: item.qty + Number(qty) }
          : item
      );
      setCart(qtyUpdate);
    } else {
      if (cart.length === 0) {
        setCart([qtyUpdate]);
      } else {
        setCart([qtyUpdate, ...cart]);
      }
    }
    SetTotal();
  };

  const handleOnClickRemoveItem = (data) => {
    const itemRemoved = cart.filter((items) => {
      return items !== data;
    });
    setQty(qty);
    setCart(itemRemoved);
    SetTotal();
  };

  const handleOnClickSetQty = (items, sign) => {
    const updatedCart = cart.map((data) =>
      data.id === items.id && items.qty > 0
        ? { ...data, qty: sign === 'plus' ? data.qty + 1 : data.qty - 1 }
        : data
    );
    setQty(qty);
    setCart(updatedCart);
  };

  return (
    <>
      <Head>
        <title>Home | Ecommerce Cart With Nextjs - Developed By Jagir Bahesh</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Rubik&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header count={cart.length} />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js Tips!</a>
          </h1>
          <p className={styles.description}>
            Ecommerce Cart Demo
          </p>
        </main>
      </div>
      <Footer />
    </>
  );
}
