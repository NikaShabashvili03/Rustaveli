import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    // Function to fetch products
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            console.log(response.data); // Log the product data to verify img paths
            setProducts(response.data);
        } catch (err) {
            setError(err);
        }
    };
    

    // Use effect to fetch products when the component mounts
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Product List</h1>
            {error && <p>Error fetching products: {error.message}</p>}
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <img
                            src={`http://localhost:5000/photos/${product.img}`} // Ensure this points to the correct image URL
                            alt={product.name}
                            style={{ width: '100px', height: 'auto' }}
                        />

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
