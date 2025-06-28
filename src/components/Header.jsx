const Header = () => {
    return (
        <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl md:text-3xl font-extrabold text-pink-600 tracking-wide">
            Burger Bistro
        </h1>

        <nav className="flex gap-6 pr-2">
            <a
            href="/"
            className="text-gray-700 hover:text-pink-600 font-medium transition-colors px-2"
            >
            Home
            </a>
            <a
            href="/menu"
            className="text-gray-700 hover:text-pink-600 font-medium transition-colors px-2"
            >
            Menu
            </a>
            <a
            href="/cart"
            className="text-gray-700 hover:text-pink-600 font-medium transition-colors px-2"
            >
            Cart
            </a>
        </nav>
        </header>
    );
};

export default Header;
