import React from 'react';
import { CartItem, User } from '../types';
import { Trash2, Minus, Plus, X, Send } from 'lucide-react';
import { Button } from './Button';
import { APP_EMAIL } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  user: User | null;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  user,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSendOrder = () => {
    if (!user) return;

    const itemsList = cart.map(item => `- ${item.quantity}x ${item.name} (R$ ${(item.price * item.quantity).toFixed(2)})`).join('\n');
    const subject = encodeURIComponent(`PEDIDO MESA ${user.tableNumber} - ${user.name}`);
    const body = encodeURIComponent(`
NOVO PEDIDO CAFETERIA
---------------------
Cliente: ${user.name}
Mesa: ${user.tableNumber}
Token: ${user.token}
Horário: ${new Date().toLocaleTimeString()}

ITENS DO PEDIDO:
${itemsList}

---------------------
TOTAL: R$ ${total.toFixed(2)}

Por favor, confirmar recebimento e preparar.
    `.trim());

    // Trigger Mailto
    window.location.href = `mailto:${APP_EMAIL}?subject=${subject}&body=${body}`;
    
    // In a real app, we would wait for API confirmation. 
    // Here we clear cart and show success (handled by parent usually, but simple here)
    setTimeout(() => {
        alert("Aplicativo de email aberto! Por favor, envie o email para confirmar o pedido.");
        onClearCart();
        onClose();
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end isolate">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-white">
          <h2 className="font-serif text-xl font-bold text-stone-800">Seu Pedido</h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-4">
              <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center">
                <Send size={24} className="opacity-50" />
              </div>
              <p>Seu carrinho está vazio.</p>
              <Button variant="outline" onClick={onClose}>Ver Cardápio</Button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 items-start">
                <img src={item.imageUrl} className="w-16 h-16 rounded-lg object-cover bg-stone-100" />
                <div className="flex-1">
                  <h4 className="font-medium text-stone-800">{item.name}</h4>
                  <p className="text-amber-700 font-semibold text-sm">R$ {item.price.toFixed(2)}</p>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-7 h-7 flex items-center justify-center rounded-full border border-stone-200 text-stone-600 hover:bg-stone-50"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-full border border-stone-200 text-stone-600 hover:bg-stone-50"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => onRemoveItem(item.id)}
                  className="text-stone-300 hover:text-red-500 p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-5 border-t border-stone-100 bg-stone-50">
            <div className="flex justify-between items-end mb-4">
              <span className="text-stone-500">Total</span>
              <span className="text-2xl font-serif font-bold text-stone-900">R$ {total.toFixed(2)}</span>
            </div>
            <Button 
              fullWidth 
              onClick={handleSendOrder}
              disabled={!user}
            >
              <Send size={18} />
              Enviar para Cozinha
            </Button>
            {!user && (
              <p className="text-xs text-red-500 mt-2 text-center">Faça login para enviar o pedido.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};