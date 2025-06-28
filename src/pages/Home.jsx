import Header from '../components/Header';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-pink-50">
        <Header />

        <main className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 gap-10">
            {/* Left Section */}
            <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mb-6">
                Craving Something Delicious?
                <br />
                <span className="text-pink-600">Order with Burger Bistro</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8">
                Get your favorite meals delivered fresh & fast. Experience the joy of hassle-free online food ordering.
            </p>
            <a
                href="/menu"
                className="inline-block px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white text-lg rounded-xl transition duration-300"
            >
                View Menu
            </a>
            </div>

            {/* Right Section (Hero Image) */}
            <div className="flex-1 flex justify-center">
            <img
                src="https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/M6HASPARCZHYNN4XTUYT7H6PTE.jpg&w=1600&h=900"
                alt="Delicious Burger"
                className="w-full max-w-md rounded-3xl shadow-xl object-cover"
            />
            </div>
        </main>
        </div>
    );
};

export default Home;
