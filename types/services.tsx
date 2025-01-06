import { Service } from "./models";

const services: Service[] = [
    {
      id: '1',
      name: 'Men\'s Classic Haircut',
      price: 25,
      description: 'A timeless haircut tailored to your individual style. Includes a hot towel finish.',
      category: 'Haircut',
    },
    {
      id: '2',
      name: 'Men\'s Premium Haircut & Style',
      price: 40,
      description: 'A detailed haircut, styling with premium products, and a relaxing scalp massage.',
      category: 'Haircut',
    },
    {
      id: '3',
      name: 'Beard Sculpting & Trim',
      price: 20,
      description: 'Expert beard shaping, trimming, and conditioning for a polished look.',
      category: 'Beard Care',
    },
    {
      id: '4',
      name: 'Men\'s Hair Color (Single Process)',
      price: 60,
      description: 'A single-process hair color application to cover grays or enhance your natural color.',
      category: 'Hair Color',
    },
    {
      id: '5',
      name: 'Hot Towel Shave & Facial',
      price: 35,
      description: 'A luxurious hot towel shave combined with a refreshing facial treatment.',
      category: 'Shave & Facial',
    },
];

export default services;