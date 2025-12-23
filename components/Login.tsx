import React, { useState } from 'react';
import { User } from '../types';
import { Button } from './Button';
import { Coffee } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [table, setTable] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !table.trim()) return;

    const token = Math.random().toString(36).substring(2, 10).toUpperCase();
    onLogin({
      name: name.trim(),
      tableNumber: table.trim(),
      token,
      checkInTime: new Date()
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl border border-stone-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mb-4">
            <Coffee size={32} />
          </div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">Bem-vindo</h1>
          <p className="text-stone-500 mt-2 text-center">Identifique-se para acessar o cardápio e fazer pedidos.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">Seu Nome</label>
            <input
              id="name"
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl bg-stone-800 text-white placeholder-stone-400 border border-stone-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
              placeholder="Ex: Ana Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="table" className="block text-sm font-medium text-stone-700 mb-1">Número da Mesa</label>
            <input
              id="table"
              type="text" // text allows "4B" etc.
              inputMode="numeric"
              required
              className="w-full px-4 py-3 rounded-xl bg-stone-800 text-white placeholder-stone-400 border border-stone-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
              placeholder="Ex: 12"
              value={table}
              onChange={(e) => setTable(e.target.value)}
            />
          </div>

          <Button type="submit" fullWidth className="mt-6">
            Acessar Cardápio
          </Button>
        </form>
      </div>
    </div>
  );
};