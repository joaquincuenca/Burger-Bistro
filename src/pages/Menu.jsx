// src/pages/Menu.jsx
import { useState } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Menu = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const burgerItems = products
        .filter(product => product.category?.toLowerCase() === 'burger')
        .slice(0, 16);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false);

    const handleAddToCart = (product) => {
        setSelectedProduct(product);
        setQuantity(1);
        setShowModal(true);
    };

    const confirmAddToCart = () => {
        if (!selectedProduct) return;
        const item = { ...selectedProduct, quantity };
        addToCart(item);
        setShowModal(false);
        alert(`✅ Added ${quantity} × ${selectedProduct.name} to cart!`);
    };

    const increaseQty = () => setQuantity(prev => prev + 1);
    const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 px-6 py-5">
        <div className="max-w-screen-xl mx-auto">
            <button
            onClick={() => navigate(-1)}
            className="mb-6 px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
            >
            ← Back
            </button>

            <h2 className="text-4xl font-extrabold text-pink-600 mb-10 text-center">
            Our Burger Menu
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {burgerItems.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow p-4 flex flex-col justify-between hover:shadow-lg hover:scale-105 transition">
                <ProductCard item={product} />
                <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded text-sm"
                >
                    Add to Cart
                </button>
                </div>
            ))}
            </div>
        </div>

        {/* Quantity Modal */}
        {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-xl max-w-md w-full transition duration-300">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                Add to Cart: {selectedProduct?.name}
                </h3>

                <div className="flex items-center mb-6">
                <span className="text-gray-700 mr-4">Quantity:</span>
                <div className="flex items-center gap-2">
                    <button
                    onClick={decreaseQty}
                    className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
                    >
                    −
                    </button>
                    <span className="min-w-[30px] text-center">{quantity}</span>
                    <button
                    onClick={increaseQty}
                    className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
                    >
                    +
                    </button>
                </div>
                </div>

                <div className="flex justify-end gap-4">
                <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
                >
                    Cancel
                </button>
                <button
                    onClick={confirmAddToCart}
                    className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded"
                >
                    Confirm
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
};

export default Menu;
