import { MenuItem, FAQItem, Review } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'espresso',
    name: 'Classic Espresso',
    price: 3.50,
    inrPrice: 240,
    description: 'A double shot of our signature Midnight house blend, rich and full-bodied with a dark caramel finish and hazelnut-colored crema.',
    category: 'coffee-hot',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600',
    tags: ['Signature', 'Gluten-Free', 'Vegan'],
    calories: 5,
    ingredients: ['Filtered Water', 'Midnight House Espresso Blend Beans']
  },
  {
    id: 'cappuccino',
    name: 'Velvet Cappuccino',
    price: 4.50,
    inrPrice: 320,
    description: 'Equal parts of intense espresso, steamed organic milk, and dense velvety milk foam, dusted with premium cocoa powder.',
    category: 'coffee-hot',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=600',
    tags: ['Popular'],
    calories: 120,
    ingredients: ['Midnight House Espresso', 'Steamed Organic Whole Milk', 'Cocoa Powder Dusting']
  },
  {
    id: 'latte',
    name: 'Midnight Caffè Latte',
    price: 4.75,
    inrPrice: 340,
    description: 'Rich espresso combined with silky steamed milk and a delicate, hand-poured layer of microfoam.',
    category: 'coffee-hot',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=600',
    tags: ['Popular'],
    calories: 150,
    ingredients: ['Midnight House Espresso', 'Silky Steamed Whole Milk', 'Microfoam']
  },
  {
    id: 'flat-white',
    name: 'Artisanal Flat White',
    price: 4.50,
    inrPrice: 320,
    description: 'Double ristretto espresso shot blended with thin, velvety microfoam for a smooth, coffee-forward experience.',
    category: 'coffee-hot',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=600',
    tags: ['Barista Choice'],
    calories: 110,
    ingredients: ['Double Midnight Ristretto Shot', 'Fine Steamed Microfoam Milk']
  },
  {
    id: 'americano',
    name: 'Cafè Americano',
    price: 3.75,
    inrPrice: 260,
    description: 'A smooth, elegant double shot of espresso diluted with purified hot water, highlighting the subtle floral and chocolate notes.',
    category: 'coffee-hot',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=600',
    tags: ['Vegan', 'Gluten-Free'],
    calories: 5,
    ingredients: ['Purified Hot Water', 'Midnight House Espresso']
  },
  {
    id: 'mocha',
    name: 'Gourmet Caffè Mocha',
    price: 5.25,
    inrPrice: 380,
    description: 'Midnight house espresso blended with single-origin dark Belgian chocolate, steamed milk, and topped with shaved cocoa chocolate curls.',
    category: 'coffee-hot',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600',
    tags: ['Sweet', 'Indulgent'],
    calories: 290,
    ingredients: ['Midnight House Espresso', 'Belgian Dark Chocolate Ganache', 'Steamed Whole Milk']
  },
  {
    id: 'cold-brew',
    name: 'Slow-Steeped Cold Brew',
    price: 4.50,
    inrPrice: 320,
    description: 'Artisanal single-origin Ethiopian beans slow-steeped in cold spring water for 18 hours, serving a smooth, low-acidity cup.',
    category: 'coffee-cold',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600',
    tags: ['Refreshing', 'Vegan', 'Gluten-Free'],
    calories: 5,
    ingredients: ['Ethiopian Single-Origin Beans', 'Cold Spring Water', 'Ice']
  },
  {
    id: 'iced-coffee',
    name: 'Gold Coast Iced Latte',
    price: 4.75,
    inrPrice: 345,
    description: 'Espresso poured over clear artisanal ice, mixed with cold fresh milk and sweetened with organic vanilla bean syrup.',
    category: 'coffee-cold',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&q=80&w=600',
    tags: ['Popular', 'Sweet'],
    calories: 140,
    ingredients: ['Midnight House Espresso', 'Organic Vanilla Syrup', 'Cold Farm Milk', 'Ice']
  },
  {
    id: 'hot-chocolate',
    name: 'Belgian Dark Hot Cocoa',
    price: 4.50,
    inrPrice: 320,
    description: 'A decadent blend of 70% dark cocoa melted into creamy steamed milk, served with a freshly charred house-made marshmallow.',
    category: 'other-beverages',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=600',
    tags: ['Sweet', 'Indulgent'],
    calories: 270,
    ingredients: ['Belgian Cocoa Block', 'Steamed Whole Milk', 'Charred House Marshmallow']
  },
  {
    id: 'tea',
    name: 'Organic Whole Leaf Tea',
    price: 4.00,
    inrPrice: 280,
    description: 'Curated premium organic loose leaves. Choice of Imperial Earl Grey, Emerald Green Jasmine, or Citrus Chamomile.',
    category: 'other-beverages',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600',
    tags: ['Organic', 'Vegan', 'Gluten-Free'],
    calories: 0,
    ingredients: ['Loose Leaf Tea Blend', 'Filtered Hot Water']
  },
  {
    id: 'croissant',
    name: 'Buttery French Croissant',
    price: 4.25,
    inrPrice: 290,
    description: 'Flaky, buttery multi-layered puff pastry laminated with premium Normandy butter and baked to a perfect golden crisp.',
    category: 'pastries',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600',
    tags: ['Baked Daily', 'Vegetarian'],
    calories: 290,
    ingredients: ['Normandy Butter', 'Organic Wheat Flour', 'Natural Yeast', 'Cane Sugar', 'Sea Salt']
  },
  {
    id: 'tiramisu',
    name: 'Midnight Espresso Tiramisu',
    price: 6.50,
    inrPrice: 460,
    description: 'Traditional Italian delicacy layered with espresso-steeped ladyfinger biscuits, airy whipped mascarpone, and dark cocoa powder.',
    category: 'cakes-desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=600',
    tags: ['House Specialty', 'Vegetarian'],
    calories: 360,
    ingredients: ['Mascarpone Cream', 'Espresso-infused Savoiardi', 'Amaretto', 'Valrhona Cocoa Powder']
  }
];

export const WHY_CHOOSE_US_ITEMS = [
  {
    title: 'Freshly Roasted Beans',
    description: 'Our beans are micro-roasted in-house weekly, preserving delicate flavor profiles and maximum freshness.',
    icon: 'Sparkles'
  },
  {
    title: 'Skilled Baristas',
    description: 'Our team consists of passionate, certified coffee professionals trained to curate the perfect cup for you.',
    icon: 'UserCheck'
  },
  {
    title: 'Cozy Interior',
    description: 'Immerse yourself in a beautiful European-style setting featuring soft velvet, warm oak, and ambient lighting.',
    icon: 'Coffee'
  },
  {
    title: 'Free Wi-Fi',
    description: 'Enjoy high-speed, fiber-optic internet connection, making us the perfect space for quiet study or remote work.',
    icon: 'Wifi'
  },
  {
    title: 'Fast & Precise Service',
    description: 'We believe exceptional craftsmanship should not keep you waiting. Enjoy fast, attentive service always.',
    icon: 'Clock'
  },
  {
    title: 'Premium Ingredients',
    description: 'From organic single-origin dairy to organic local sugars and pure Belgian chocolate, we source only the finest.',
    icon: 'Award'
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'g1',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800',
    title: 'Barista Craft',
    tag: 'Artistry'
  },
  {
    id: 'g2',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800',
    title: 'Cozy Solitude',
    tag: 'Ambiance'
  },
  {
    id: 'g3',
    image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&q=80&w=800',
    title: 'Signature Machine',
    tag: 'Craft'
  },
  {
    id: 'g4',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    title: 'Morning Sweetness',
    tag: 'Delicacies'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Eleanor Vance',
    rating: 5,
    comment: 'Midnight Brew has easily become my favorite spot in town. The velvet cappuccino is divine, and the warm wooden interior makes me feel like I am in a cozy Parisian café. Outstanding service every time!',
    date: 'June 18, 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    isVerified: true
  },
  {
    id: 'rev-2',
    name: 'Marcus Sterling',
    rating: 5,
    comment: 'As a remote software developer, finding a quiet place with ultra-fast Wi-Fi and exceptional specialty coffee is rare. Their single-origin cold brew is exceptional—low acidity and super crisp.',
    date: 'July 2, 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    isVerified: true
  },
  {
    id: 'rev-3',
    name: 'Clara Dupont',
    rating: 5,
    comment: 'The croissants are incredibly buttery and flakey, just like home. Combined with a beautifully poured flat white, Midnight Brew offers the perfect luxurious morning escape. Highly recommend!',
    date: 'July 11, 2026',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
    isVerified: false
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What are Midnight Brew’s opening hours?',
    answer: 'We are open daily from 7:00 AM to 11:00 PM. Our kitchen closes for fresh pastries and specialty cakes at 10:30 PM, but you can order warm beverages and espresso until closing.',
    category: 'General'
  },
  {
    id: 'faq-2',
    question: 'Do you accept table reservations?',
    answer: 'Yes! While walk-ins are always welcome, we offer an elegant table booking service for friends, business meetings, or study groups. You can book directly using our website’s online reservation portal.',
    category: 'Reservations'
  },
  {
    id: 'faq-3',
    question: 'Do you offer takeaway and online ordering?',
    answer: 'Absolutely. All beverages, fresh pastries, and specialty desserts can be ordered for takeaway. Simply speak to our baristas at the front counter or call ahead to have your order ready.',
    category: 'Ordering'
  },
  {
    id: 'faq-4',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit and debit cards (Visa, Mastercard, American Express), Apple Pay, Google Pay, and touchless mobile payments. We are a cashless café to ensure swift and hygienic service.',
    category: 'General'
  },
  {
    id: 'faq-5',
    question: 'Is there parking available near the café?',
    answer: 'Yes, we offer complimentary customer parking right behind the building, along with secure bicycle racks. Valet parking is also available on Friday and Saturday evenings from 6:00 PM onwards.',
    category: 'General'
  }
];
