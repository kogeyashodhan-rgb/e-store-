const products = [
  // Mobiles
  { name: 'Apple iPhone 15 Pro Max', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80', description: 'Experience the best of Apple with A17 Pro.', brand: 'Apple', category: 'Mobiles', price: 134900, discount: 5, rating: 4.8, numReviews: 125, countInStock: 10 },
  { name: 'Samsung Galaxy S24 Ultra', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80', description: 'The ultimate Android phone with Galaxy AI.', brand: 'Samsung', category: 'Mobiles', price: 129999, discount: 8, rating: 4.7, numReviews: 156, countInStock: 12 },
  { name: 'Google Pixel 8 Pro', image: 'https://images.unsplash.com/photo-1598327105666-5b89351cb315?w=500&q=80', description: 'Pro-level photography and AI features.', brand: 'Google', category: 'Mobiles', price: 106999, discount: 15, rating: 4.6, numReviews: 89, countInStock: 8 },
  { name: 'OnePlus 12 5G', image: 'https://images.unsplash.com/photo-1655823158097-ff2b6196ff31?w=500&q=80', description: 'Smooth Beyond Belief.', brand: 'OnePlus', category: 'Mobiles', price: 69999, discount: 12, rating: 4.5, numReviews: 430, countInStock: 25 },
  { name: 'Nothing Phone (2)', image: 'https://images.unsplash.com/photo-1605236453806-6ff3685286b5?w=500&q=80', description: 'Come to the bright side.', brand: 'Nothing', category: 'Mobiles', price: 44999, discount: 20, rating: 4.4, numReviews: 210, countInStock: 18 },

  // Electronics & Computers
  { name: 'MacBook Air M2', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&q=80', description: 'Supercharged by M2.', brand: 'Apple', category: 'Electronics', price: 114900, discount: 81, rating: 4.9, numReviews: 230, countInStock: 8 },
  { name: 'Dell XPS 15', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80', description: 'Creator powerhouse laptop.', brand: 'Dell', category: 'Electronics', price: 189990, discount: 10, rating: 4.6, numReviews: 45, countInStock: 5 },
  { name: 'Sony WH-1000XM5', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', description: 'Industry leading noise cancellation.', brand: 'Sony', category: 'Electronics', price: 29900, discount: 81, rating: 4.7, numReviews: 450, countInStock: 15 },
  { name: 'iPad Pro 12.9"', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80', description: 'Ultimate iPad experience with M2.', brand: 'Apple', category: 'Electronics', price: 112900, discount: 5, rating: 4.8, numReviews: 310, countInStock: 12 },
  { name: 'Samsung 34" Odyssey G8', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80', description: 'Ultra-wide gaming experience.', brand: 'Samsung', category: 'Electronics', price: 124500, discount: 81, rating: 4.9, numReviews: 88, countInStock: 4 },
  { name: 'Sony Mirrorless Camera', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80', description: 'Professional grade photography.', brand: 'Sony', category: 'Electronics', price: 85900, discount: 10, rating: 4.6, numReviews: 89, countInStock: 5 },
  { name: 'DJI Mini 4 Pro', image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=500&q=80', description: 'Mini camera drone with omnidirectional obstacle sensing.', brand: 'DJI', category: 'Electronics', price: 74990, discount: 8, rating: 4.8, numReviews: 124, countInStock: 6 },

  // Appliances
  { name: 'LG OLED TV 55"', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80', description: 'Stunning 4K visuals.', brand: 'LG', category: 'Appliances', price: 145000, discount: 12, rating: 4.9, numReviews: 67, countInStock: 3 },
  { name: 'Dyson V15 Detect', image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&q=80', description: 'Most powerful cordless vacuum.', brand: 'Dyson', category: 'Appliances', price: 65900, discount: 81, rating: 4.6, numReviews: 120, countInStock: 7 },
  { name: 'Samsung 8KG Washing Machine', image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&q=80', description: 'EcoBubble technology front load.', brand: 'Samsung', category: 'Appliances', price: 34500, discount: 25, rating: 4.5, numReviews: 320, countInStock: 15 },
  { name: 'Philips Air Fryer XL', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80', description: 'Healthy frying with Rapid Air tech.', brand: 'Philips', category: 'Appliances', price: 9999, discount: 30, rating: 4.7, numReviews: 890, countInStock: 40 },
  { name: 'Whirlpool 265L Refrigerator', image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500&q=80', description: 'Frost free double door fridge.', brand: 'Whirlpool', category: 'Appliances', price: 26490, discount: 18, rating: 4.3, numReviews: 410, countInStock: 22 },

  // Fashion
  { name: 'Nike Air Max', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80', description: 'Comfort and style combined.', brand: 'Nike', category: 'Fashion', price: 12990, discount: 15, rating: 4.5, numReviews: 210, countInStock: 20 },
  { name: 'Nike Jordan Retro', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80', description: 'Classic street style.', brand: 'Nike', category: 'Fashion', price: 18990, discount: 81, rating: 4.8, numReviews: 312, countInStock: 5 },
  { name: 'Levi\'s 511 Slim Fit Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80', description: 'Classic denim jeans.', brand: 'Levi\'s', category: 'Fashion', price: 2999, discount: 40, rating: 4.4, numReviews: 540, countInStock: 100 },
  { name: 'Puma Running Shoes', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80', description: 'Lightweight performance running shoes.', brand: 'Puma', category: 'Fashion', price: 4599, discount: 50, rating: 4.2, numReviews: 890, countInStock: 85 },
  { name: 'Casio G-Shock Watch', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&q=80', description: 'Tough analog-digital watch.', brand: 'Casio', category: 'Fashion', price: 8995, discount: 10, rating: 4.7, numReviews: 1200, countInStock: 30 },

  // Furniture
  { name: 'Ergonomic Office Chair', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80', description: 'Comfortable mesh office chair.', brand: 'Herman Miller', category: 'Furniture', price: 45000, discount: 20, rating: 4.8, numReviews: 150, countInStock: 10 },
  { name: 'Solid Wood Dining Table', image: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=500&q=80', description: '6-seater teak wood dining table.', brand: 'Wakefit', category: 'Furniture', price: 28990, discount: 35, rating: 4.5, numReviews: 85, countInStock: 4 },
  { name: 'Queen Size Bed', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80', description: 'Engineered wood bed with storage.', brand: 'Pepperfry', category: 'Furniture', price: 15999, discount: 45, rating: 4.2, numReviews: 320, countInStock: 12 },

  // Grocery & Essentials
  { name: 'Organic Almonds 1kg', image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=500&q=80', description: 'Premium quality California almonds.', brand: 'Happilo', category: 'Grocery', price: 1200, discount: 30, rating: 4.6, numReviews: 2400, countInStock: 200 },
  { name: 'Extra Virgin Olive Oil 1L', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80', description: 'Cold extracted olive oil from Spain.', brand: 'Borges', category: 'Grocery', price: 1450, discount: 15, rating: 4.7, numReviews: 890, countInStock: 50 },
  { name: 'Dark Roast Coffee Beans', image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80', description: '100% Arabica fresh roasted coffee.', brand: 'Blue Tokai', category: 'Grocery', price: 450, discount: 5, rating: 4.8, numReviews: 1500, countInStock: 80 }
];
module.exports = products;
