import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

const Checkout = () => {
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        const storedBasket = JSON.parse(localStorage.getItem('basket')) || [];
        console.log("Stored Basket:", storedBasket); // Debugging: Check the type of storedBasket
        setCartProducts(storedBasket);
    }, []);

    const removeItemFromCart = (productId) => {
        const updatedCart = cartProducts.filter(product => product.id !== productId);
        setCartProducts(updatedCart);
        localStorage.setItem('basket', JSON.stringify(updatedCart));
    };

    const increaseQuantity = (productId) => {
        const updatedCart = cartProducts.map(product => {
            if (product.id === productId && product.count < 10) { // Maximum quantity limit is set to 10
                return { ...product, count: product.count + 1 };
            }
            return product;
        });
        setCartProducts(updatedCart);
        localStorage.setItem('basket', JSON.stringify(updatedCart));
    };

    const decreaseQuantity = (productId) => {
        const updatedCart = cartProducts.map(product => {
            if (product.id === productId && product.count > 1) { // Minimum quantity limit is set to 1
                return { ...product, count: product.count - 1 };
            }
            return product;
        });
        setCartProducts(updatedCart);
        localStorage.setItem('basket', JSON.stringify(updatedCart));
    };

    const handleQuantityChange = (event, productId) => {
        const quantity = parseInt(event.target.value);
        if (!isNaN(quantity) && quantity >= 1 && quantity <= 10) { // Quantity should be between 1 and 10
            const updatedCart = cartProducts.map(product => {
                if (product.id === productId) {
                    return { ...product, count: quantity };
                }
                return product;
            });
            setCartProducts(updatedCart);
            localStorage.setItem('basket', JSON.stringify(updatedCart));
        }
    };

    // const totalPrice = cartProducts.reduce((total, product) => total + (product.price * product.count), 0);

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            {cartProducts.map((product, index) => (
                <div key={index} className="checkout-item">
                    <img src={product.image} alt={product.name} className='checkout-img' />
                    <div className="checkout-details">
                        <p>{product.name}</p>
                        <p>Price: ${product.price}</p>
                        <div className="quantity-control">
                            <button onClick={() => decreaseQuantity(product.id)}>-</button>
                            <input type="number" value={product.count} onChange={(e) => handleQuantityChange(e, product.id)} />
                            <button onClick={() => increaseQuantity(product.id)}>+</button>
                        </div>
                        <p>Total: ${product.price * product.count}</p>
                    </div>
                    <MdDelete className="delete-icon" onClick={() => removeItemFromCart(product.id)} />
                </div>
            ))}
            <div className="total-price">
                <p>Total Price: </p>
            </div>
            <Link to="/" className="back-link">Go Back</Link>
        </div>
    );
}

export default Checkout;

