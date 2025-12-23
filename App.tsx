import React, { useState, useEffect } from 'react';
import { User, CartItem, MenuItem } from './types';
import { Login } from './components/Login';
import { MenuGrid } from './components/MenuGrid';
import { CartDrawer } from './components/CartDrawer';
import { AiBarista } from './components/AiBarista';
import { ShoppingBag, LogOut, Coffee } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load user from local storage on mount (optional persistence)
  useEffect(() => {
    const savedUser = localStorage.getItem('cafe_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('cafe_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('cafe_user');
  };

  const addToOrder = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-coffee-50 pb-20">
      {/* Header */}
      <header className="bg-white sticky top-0 z-30 border-b border-stone-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center text-white">
              <Coffee size={20} />
            </div>
            <h1 className="font-serif text-xl font-bold text-stone-900 hidden sm:block">Café Conectado</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-stone-900">{user.name}</p>
              <p className="text-xs text-stone-500">Mesa {user.tableNumber} • Token: {user.token}</p>
            </div>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-stone-600 hover:text-amber-600 transition-colors"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              onClick={handleLogout}
              className="p-2 text-stone-400 hover:text-stone-800 transition-colors"
              title="Sair da Mesa"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="font-serif text-3xl font-bold text-stone-900">Nosso Menu</h2>
          <p className="text-stone-500 mt-2">Escolha seus favoritos e enviaremos o pedido para a cozinha.</p>
        </div>
        
        <MenuGrid onAddToOrder={addToOrder} />
      </main>

      {/* Components */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        user={user}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
      />
      
      <AiBarista cart={cart} />
    </div>
  );
};

export default App;