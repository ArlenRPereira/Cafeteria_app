import { Category, MenuItem } from './types';

export const APP_EMAIL = "arlen.ricardo@gmail.com";

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Espresso Tradicional',
    description: 'Café intenso e encorpado, extraído na pressão ideal.',
    price: 6.50,
    category: Category.HOT_COFFEE,
    imageUrl: 'https://picsum.photos/400/300?random=1',
    calories: 10
  },
  {
    id: '2',
    name: 'Cappuccino Italiano',
    description: 'Espresso, leite vaporizado e uma camada generosa de espuma.',
    price: 12.00,
    category: Category.HOT_COFFEE,
    imageUrl: 'https://picsum.photos/400/300?random=2',
    calories: 120
  },
  {
    id: '3',
    name: 'Latte Macchiato',
    description: 'Leite vaporizado manchado com uma dose de espresso.',
    price: 14.00,
    category: Category.HOT_COFFEE,
    imageUrl: 'https://picsum.photos/400/300?random=3',
    calories: 150
  },
  {
    id: '4',
    name: 'Cold Brew Citrus',
    description: 'Café extraído a frio por 12h com notas cítricas de laranja.',
    price: 16.00,
    category: Category.ICED_COFFEE,
    imageUrl: 'https://picsum.photos/400/300?random=4',
    calories: 15
  },
  {
    id: '5',
    name: 'Iced Latte Caramelo',
    description: 'Espresso gelado com leite e xarope artesanal de caramelo.',
    price: 18.00,
    category: Category.ICED_COFFEE,
    imageUrl: 'https://picsum.photos/400/300?random=5',
    calories: 220
  },
  {
    id: '6',
    name: 'Pão de Queijo Mineiro',
    description: 'Porção com 3 unidades, receita tradicional da Canastra.',
    price: 12.00,
    category: Category.FOOD,
    imageUrl: 'https://picsum.photos/400/300?random=6',
    calories: 300
  },
  {
    id: '7',
    name: 'Croissant de Manteiga',
    description: 'Massa folhada francesa, leve e crocante.',
    price: 15.00,
    category: Category.FOOD,
    imageUrl: 'https://picsum.photos/400/300?random=7',
    calories: 280
  },
  {
    id: '8',
    name: 'Torrada com Abacate',
    description: 'Pão de fermentação natural tostado com creme de avocado.',
    price: 22.00,
    category: Category.FOOD,
    imageUrl: 'https://picsum.photos/400/300?random=8',
    calories: 320
  },
  {
    id: '9',
    name: 'Cheesecake de Frutas Vermelhas',
    description: 'Base de biscoito, creme suave e calda rústica de frutas.',
    price: 18.00,
    category: Category.SWEETS,
    imageUrl: 'https://picsum.photos/400/300?random=9',
    calories: 450
  },
  {
    id: '10',
    name: 'Brownie 70% Cacau',
    description: 'Denso, úmido e com pedaços de nozes.',
    price: 14.00,
    category: Category.SWEETS,
    imageUrl: 'https://picsum.photos/400/300?random=10',
    calories: 380
  },
];