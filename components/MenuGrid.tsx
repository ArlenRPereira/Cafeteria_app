import React, { useState } from 'react';
import { MENU_ITEMS } from '../constants';
import { MenuItem, Category } from '../types';
import { Plus, Info } from 'lucide-react';

interface MenuGridProps {
  onAddToOrder: (item: MenuItem) => void;
}

export const MenuGrid: React.FC<MenuGridProps> = ({ onAddToOrder }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos');

  const categories = ['Todos', ...Object.values(Category)];
  
  const filteredItems = selectedCategory === 'Todos' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-6 pb-24">
      {/* Category Filter */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide -mx-4 px-4 sticky top-16 bg-coffee-50/95 backdrop-blur z-10 py-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat as Category | 'Todos')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat 
                ? 'bg-stone-800 text-white' 
                : 'bg-white text-stone-600 border border-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 flex gap-4 h-full">
            <div className="w-24 h-24 flex-shrink-0 bg-stone-100 rounded-xl overflow-hidden relative">
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-semibold text-stone-800">{item.name}</h3>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2">{item.description}</p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold text-amber-700">R$ {item.price.toFixed(2)}</span>
                <button 
                  onClick={() => onAddToOrder(item)}
                  className="w-8 h-8 rounded-full bg-stone-100 text-stone-800 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors"
                  aria-label={`Adicionar ${item.name} ao pedido`}
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};