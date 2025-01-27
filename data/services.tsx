import { Service, ServiceCategory } from "@/types/models";

const services: Service[] = [
    {
      id: '6f3b1541-c4c1-4370-9526-62a673a0789a',
      name: 'Men\'s Classic Haircut',
      price: 25,
      description: 'A timeless haircut tailored to your individual style. Includes a hot towel finish.',
      category: ServiceCategory.Haircut
    },
    {
      id: '8841a1c0-6bc3-4a1d-aa11-0ee30cd479e2',
      name: 'Men\'s Premium Haircut & Style',
      price: 40,
      description: 'A detailed haircut, styling with premium products, and a relaxing scalp massage.',
      category: ServiceCategory.Haircut
    },
    {
      id: '96669132-ba7c-4a7a-b0fe-79d35031ec8b',
      name: 'Beard Sculpting & Trim',
      price: 20,
      description: 'Expert beard shaping, trimming, and conditioning for a polished look.',
      category: ServiceCategory.Grooming
    },
    {
      id: '893f44ae-f1cd-4ae1-b6d1-702edb049112',
      name: 'Men\'s Hair Color (Single Process)',
      price: 60,
      description: 'A single-process hair color application to cover grays or enhance your natural color.',
      category: ServiceCategory.Treatment
    },
    {
      id: '302b16a8-8af2-4fd1-a50e-159854bf1c6f',
      name: 'Hot Towel Shave & Facial',
      price: 35,
      description: 'A luxurious hot towel shave combined with a refreshing facial treatment.',
      category: ServiceCategory.Grooming
    },
];

export default services;