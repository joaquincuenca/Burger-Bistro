import AppRoutes from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
};

export default App;
