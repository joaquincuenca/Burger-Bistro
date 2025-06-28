const Cart = () => {
    return (
        <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/home')}
        className="mb-6 px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
      >
        ← Back to Home
      </button>
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <p>Your selected items will appear here.</p>
        </div>

        
    );
    console.log('Cart Items:', cart);
};

export default Cart;
