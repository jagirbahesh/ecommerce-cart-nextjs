import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelopeSquare,
  faPhoneSquareAlt,
  faHome,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';

library.add(faEnvelopeSquare, faPhoneSquareAlt, faHome, faShoppingCart);

export default function Header(props) {
  const router = useRouter();
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
    <header>
      <div className="header-content-top">
        <div className="content">
          <span>
            <FontAwesomeIcon icon={faPhoneSquareAlt} />
            (+91)94268 23690
          </span>
          <span>
            <FontAwesomeIcon icon={faEnvelopeSquare} />
            bahesh.jagir@gmail.com
          </span>
        </div>
      </div>
      <div className="container">
        <strong className="logo">
          <FontAwesomeIcon icon={faHome} />
        </strong>
        <div className="nav-container">
          <nav className="featured-category">
            <ul className="nav-row">
              <li className="nav-row-list">
                <Link href="/">
                  <a
                    className={
                      router.pathname == '/'
                        ? 'nav-row-list-link active'
                        : 'nav-row-list-link'
                    }
                  >
                    Home
                  </a>
                </Link>
              </li>
              <li className="nav-row-list">
                <Link href="/shop">
                  <a
                    className={
                      router.pathname == '/shop' ||
                      router.pathname == '/shop/[pid]'
                        ? 'nav-row-list-link active'
                        : 'nav-row-list-link'
                    }
                  >
                    Shop
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <nav className="nav-content">
          <ul className="nav-content-list">
            <li className="nav-content-item">
              <Link href="/cart">
                <a className="nav-content-link">
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <span>{cart.length}</span>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
