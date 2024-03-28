import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./crud.css";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [basket, setBasket] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3005/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    useEffect(() => {
        const storedBasket = JSON.parse(localStorage.getItem('basket')) || {};
        setBasket(storedBasket);
    }, []);

    const addToBasket = (productId) => {
        const selectedProduct = products.find(product => product.Id === productId);
        const updatedBasket = { ...basket };
        const count = (updatedBasket[productId]?.count || 0) + 1;
        const totalPrice = (updatedBasket[productId]?.totalPrice || 0) + parseFloat(selectedProduct.Price);
        updatedBasket[productId] = {
            count,
            name: selectedProduct.Name,
            price: selectedProduct.Price,
            totalPrice,
            image: selectedProduct.ProductImage
        };
        setBasket(updatedBasket);
        localStorage.setItem('basket', JSON.stringify(updatedBasket));
    };

    return (
        <div className='mainproduct'>
            {products.map(product => (
                <div key={product.Id} className='product' style={{ position: "relative", overflow: "hidden" }}>
                    {product.isNew && (
                        <div className="newProduct">New</div>
                    )}
                    {product.isSale && (
                        <div className="newProduct sale">Sale</div>
                    )}
                    <div className='productimg'>
                        <img src={product.ProductImage} alt={product.Name} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <span className='crudspan' style={{ fontSize: "18px", fontWeight: "bold" }}>{product.Name}</span>
                    <p style={{ fontSize: "16px", color: "#333" }}>{product.Price}</p>
                    <button onClick={() => addToBasket(product.Id)}>Add to basket</button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
