import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import QRCode from 'react-qr-code';


const Checkout = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [showQRCode, setShowQRCode] = useState(false);
    const [qrData, setQrData] = useState('');

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
        setCart(JSON.parse(storedCart));
        }
    }, []);

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleConfirmCheckout = async () => {
        try {
        const orderDetails = [];

        for (const item of cart) {
            const order = {
            product_id: item.id,
            product_name: item.name,
            quantity: item.quantity,
            price_per_unit: item.price,
            total_price: item.price * item.quantity,
            };

            const { error } = await supabase.from('orders').insert([order]);
            if (error) throw error;

            orderDetails.push(order);
        }

        const qrPayload = {
            timestamp: new Date().toISOString(),
            total: total.toFixed(2),
            items: orderDetails,
        };

        const qrString = JSON.stringify(qrPayload);

        // Save QR to Supabase
        const { error: qrError } = await supabase.from('order_qrcodes').insert([
            {
            qr_code_data: qrString,
            order_summary: qrPayload,
            },
        ]);
        if (qrError) throw qrError;

        setQrData(qrString);
        setShowQRCode(true);
        setCart([]);
        localStorage.removeItem('cart');
        } catch (error) {
        console.error('❌ Failed to save order:', error.message);
        alert('Failed to save order. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-pink-600 mb-6">Checkout Summary</h2>

            {cart.length === 0 && !showQRCode ? (
            <p className="text-gray-600">🛒 Your cart is empty.</p>
            ) : (
            <>
                {!showQRCode && (
                <>
                    <ul className="divide-y divide-gray-200 mb-6">
                    {cart.map((item) => (
                        <li key={item.id} className="py-4 flex justify-between items-start">
                        <div>
                            <p className="font-medium text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-500">
                            Quantity: {item.quantity} × ₱{item.price.toFixed(2)}
                            </p>
                        </div>
                        <div className="font-semibold text-pink-600">
                            ₱{(item.price * item.quantity).toFixed(2)}
                        </div>
                        </li>
                    ))}
                    </ul>

                    <div className="text-right text-lg font-semibold mb-6">
                    Total: <span className="text-pink-600">₱{total.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-end gap-4">
                    <button
                        onClick={() => navigate('/menu')}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
                    >
                        ← Back to Menu
                    </button>
                    <button
                        onClick={handleConfirmCheckout}
                        className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded"
                    >
                        Confirm Checkout
                    </button>
                    </div>
                </>
                )}

                {showQRCode && (
                <div className="text-center mt-10">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">✅ Order Confirmed!</h3>
                    <p className="mb-2 text-gray-600">Here is your QR code:</p>
                    <div className="inline-block p-4 bg-white border shadow rounded">
                    <QRCode value={qrData} size={200} />
                    </div>
                    <p className="text-sm text-gray-400 mt-2">Scan or print this for reference.</p>
                </div>
                )}
            </>
            )}
        </div>
        </div>
    );
};

export default Checkout;
