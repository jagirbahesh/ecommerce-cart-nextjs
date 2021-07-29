import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import styles from '../../styles/Shop.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Shop(props) {
  const router = useRouter();
  const { pid } = router.query;
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [qty, setQty] = useState(1);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    singleApiCall();
  }, []);

  const singleApiCall = () => {
    setError(false);
    setLoading(true);
    fetch('https://fakestoreapi.com/products/' + pid)
      .then((response) => response.json())
      .then((json) => {
        setDetail(json);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    SetTotal();
  },[]);

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

  useEffect(() => {
    handleLocalStorage();
  }, [qty]);

  const handleLocalStorage = (e, detail) => {
    const qtyUpdate = { ...detail, qty: qty };
    // localStorage.setItem('cartdata', JSON.stringify(qtyUpdate));
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
    localStorage.setItem('cartdata', JSON.stringify(cart));
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
      <Header />
      <div className="detail-page">
        {error ? (
          <div className="error">Something is Wrong!</div>
        ) : (
          <div className="page-container text-center">
            {loading ? (
              <img
                src="https://austin.passy.co/wp-admin/images/spinner-2x.gif"
                alt="Loading.."
              />
            ) : (
              <>
                <h1>{detail.title}</h1>
                <div className="product-wrap">
                  <div>
                    <div className={styles.image}>
                      <img src={detail.image} alt={detail.title} />
                    </div>
                    <div className={styles.title}>{detail.description}</div>
                    <div className={styles.price}>{`$${Number.parseFloat(
                      detail.price
                    ).toFixed(2)}`}</div>
                    <button
                      className="btn btn_get btn_get_two"
                      onClick={(e) => handleLocalStorage(e, detail)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
