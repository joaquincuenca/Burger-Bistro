const ProductCard = ({ item }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
        <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover"
            loading="lazy"
        />
        <div className="p-4 flex flex-col flex-1">
            <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
            <div className="mt-auto text-pink-600 font-bold text-lg">₱{item.price}</div>
        </div>
        </div>
    );
};

export default ProductCard;
