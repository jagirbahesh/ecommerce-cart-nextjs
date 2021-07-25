import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Cart.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);

export default function Cart(props) {

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
      <div className="cart-page">
        <div className="page-container">
          <h1>Cart</h1>
          <div className="cart-row-wrap">
            {!cart.length ? (
              <div className="cart-validation">
                Cart is empty please <Link to="/shop">shop now</Link>
              </div>
            ) : (
              cart.map((item, index) => (
                <div className="cart-item" key={index}>
                  <div className="cart-del">
                      <a onClick={() => handleOnClickRemoveItem(item)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </a>
                  </div>
                  <div className="cart-image">
                    {/* <Link href={`/shop/${item.id}`}> */}
                    <img src={item.image} alt={item.title} />
                    {/* </Link> */}
                  </div>
                  <div className="cart-title">
                    {/* <Link href={`/shop/${item.id}`}> */}
                    {item.title}
                    {/* </Link> */}
                  </div>
                  <div className="cart-qty">
                    <input
                      disabled={item.qty > 1 ? false : true}
                      type="button"
                      value="-"
                      onClick={() => handleOnClickSetQty(item, 'min')}
                      className="min qty-update"
                    />
                    <input
                      disabled={true}
                      type="number"
                      min="1"
                      name="quantity"
                      value={item.qty}
                      title="Qty"
                      className="qty"
                    />
                    <input
                      type="button"
                      value="+"
                      onClick={() => handleOnClickSetQty(item, 'plus')}
                      className="plus qty-update"
                    />
                  </div>
                  <div className="cart-amount">
                    $ {Number.parseFloat(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>
          {cartTotal ? (
            <div className="cart-total-wrap">
              <div className="cart-total">
                <label>Total Amount:</label>
                <span>${Number.parseFloat(cartTotal).toFixed(2)}</span>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
