import Link from 'next/link';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import styles from '../../styles/Shop.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ShopPage(props) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = () => {
    setError(false);
    setLoading(true);
    fetch('https://fakestoreapi.com/products/')
      .then((response) => response.json())
      .then((json) => {
        setList(json);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>
          Shop | Ecommerce Cart With Nextjs - Developed By Jagir Bahesh
        </title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Rubik&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header/>
      <div className={styles.shoppage}>
        <div className="page-container">
          <h1>Welcome to Shop</h1>
          <div className={styles.productwrap}>
            {loading ? (
              <img
                src="https://austin.passy.co/wp-admin/images/spinner-2x.gif"
                alt="Loading.."
              />
            ) : (
              ''
            )}
            {error ? <div className={styles.error}>Something is Wrong!</div> : ''}
            {list.map((item) => (
              <Link key={item.id} href={`/shop/${item.id}`}>
                <a className={styles.productinnerwrap}>
                  <div>
                    <div className={styles.image}>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className={styles.title}>{item.title}</div>
                    <div className={styles.price}>{`$${item.price}`}</div>
                    <button className="btn btn_get btn_get_two">
                      View More
                    </button>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
