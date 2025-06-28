import { useState } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Menu = () => {
    const navigate = useNavigate();

    const burgerItems = products
        .filter(product => product.category?.toLowerCase() === 'burger')
        .slice(0, 16);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [cart, setCart] = useState([]);
    const [showCartPanel, setShowCartPanel] = useState(false);

    const handleAddToCart = (product) => {
        setSelectedProduct(product);
        setQuantity(1);
        setShowModal(true);
    };

    const confirmAddToCart = () => {
        if (!selectedProduct) return;

        const existing = cart.find(item => item.id === selectedProduct.id);
        if (existing) {
            setCart(prev =>
                prev.map(item =>
                    item.id === selectedProduct.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            );
        } else {
            setCart(prev => [...prev, { ...selectedProduct, quantity }]);
        }

        setShowModal(false);
    };

    const increaseQty = () => setQuantity(prev => prev + 1);
    const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const incrementCartItem = (productId) => {
        setCart(prev =>
            prev.map(item =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decrementCartItem = (productId) => {
        setCart(prev =>
            prev
                .map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
                        <div
                            key={product.id}
                            className="bg-white rounded-xl shadow p-4 flex flex-col justify-between transform transition-transform hover:scale-105 hover:shadow-lg"
                        >
                            <ProductCard item={product} />
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="mt-4 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded text-sm transition"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
<div className="bg-white border border-gray-300 pointer-events-auto rounded-xl px-4 py-5 sm:px-6 sm:py-6 shadow-xl w-[90%] max-w-sm transition duration-300 flex flex-col items-center text-center">

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

            <button
                onClick={() => setShowCartPanel(prev => !prev)}
                className="fixed bottom-6 right-6 bg-pink-600 text-white p-4 rounded-full shadow-lg hover:bg-pink-700 z-50"
                aria-label="Cart"
            >
                <FaShoppingCart size={24} />
                {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {cart.length}
                    </span>
                )}
            </button>

            {showCartPanel && (
                <div className="fixed bottom-20 right-6 w-80 max-w-[90vw] bg-white rounded-xl shadow-2xl p-4 z-50 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">🛒 Your Cart</h3>
                    {cart.length === 0 ? (
                        <p className="text-sm text-gray-500">Cart is empty.</p>
                    ) : (
                        <>
                            <ul className="space-y-4 max-h-60 overflow-y-auto">
                                {cart.map(item => (
                                    <li key={item.id} className="flex items-center justify-between text-sm">
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-800">{item.name}</div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <button
                                                    onClick={() => decrementCartItem(item.id)}
                                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded"
                                                >
                                                    −
                                                </button>
                                                <span className="w-6 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => incrementCartItem(item.id)}
                                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-pink-600 font-semibold ml-4">
                                            ₱{(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 text-sm font-semibold text-gray-700">
                                <div className="flex justify-between mb-3">
                                    <span>Total:</span>
                                    <span className="text-pink-600">₱{total.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded text-sm transition"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Menu;
