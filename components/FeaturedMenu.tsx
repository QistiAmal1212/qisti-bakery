import React, { useState, useEffect } from 'react';
import { MenuItem } from '../types';
import { useCart } from '../contexts/CartContext';

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Signature Choc Lava",
    description: "Rich, decadent chocolate cake with a molten Belgian chocolate center.",
    price: "RM 15.00",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=800&auto=format&fit=crop",
    category: "Best Seller"
  },
  {
    id: 2,
    name: "Classic Cheese Leleh",
    description: "Fluffy vanilla sponge submerged in our secret overflowing cream cheese sauce.",
    price: "RM 25.00",
    image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=800&auto=format&fit=crop",
    category: "Viral"
  },
  {
    id: 3,
    name: "Hokkaido Cheese Tarts",
    description: "Box of 6. Crunchy butter pastry filled with creamy, savory-sweet cheese mousse.",
    price: "RM 38.00",
    image: "https://images.unsplash.com/photo-1504113886838-5154797746d6?q=80&w=800&auto=format&fit=crop",
    category: "Box Set"
  },
  {
    id: 4,
    name: "Premium Choc Moist",
    description: "Ultra-moist chocolate sponge layered with smooth ganache.",
    price: "RM 18.00",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop",
    category: "Favorite"
  },
  {
    id: 5,
    name: "Nutella Pods",
    description: "Box of 16. Bite-sized crunchy pods filled with pure Nutella.",
    price: "RM 28.00",
    image: "https://images.unsplash.com/photo-1623594247528-94df5d992e59?q=80&w=800&auto=format&fit=crop",
    category: "Snack"
  },
  {
    id: 6,
    name: "Pandan Gula Melaka",
    description: "Fragrant pandan sponge with gula melaka buttercream.",
    price: "RM 22.00",
    image: "https://images.unsplash.com/photo-1628186252994-e3f9a73c0906?q=80&w=800&auto=format&fit=crop",
    category: "Local"
  },
  {
    id: 7,
    name: "Red Velvet Luxury",
    description: "Classic mild cocoa buttermilk sponge with tangry cream cheese frosting.",
    price: "RM 20.00",
    image: "https://images.unsplash.com/photo-1586788680434-30d324436962?q=80&w=800&auto=format&fit=crop",
    category: "Classic"
  },
  {
    id: 8,
    name: "Salted Caramel Macarons",
    description: "Box of 10. Delicate almond meringue shells with salted caramel.",
    price: "RM 45.00",
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=800&auto=format&fit=crop",
    category: "Gift"
  },
  {
    id: 9,
    name: "Matcha Crepe Cake",
    description: "Twenty paper-thin handmade crepes layered with light matcha cream.",
    price: "RM 24.00",
    image: "https://images.unsplash.com/photo-1595964205574-e3906eb46a6a?q=80&w=800&auto=format&fit=crop",
    category: "New"
  },
  {
    id: 10,
    name: "Berry Pavlova",
    description: "Crisp meringue shell with marshmallow center and fresh fruit.",
    price: "RM 18.00",
    image: "https://images.unsplash.com/photo-1629252327572-4d0413008064?q=80&w=800&auto=format&fit=crop",
    category: "Dessert"
  },
  {
    id: 11,
    name: "Tiramisu Box",
    description: "Italian classic. Coffee-soaked ladyfingers and mascarpone cream.",
    price: "RM 26.00",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800&auto=format&fit=crop",
    category: "Bestseller"
  },
  {
    id: 12,
    name: "Fruit Tartlets",
    description: "Box of 9. Sweet crust pastry filled with vanilla custard and fruits.",
    price: "RM 30.00",
    image: "https://images.unsplash.com/photo-1563729768640-481679f32387?q=80&w=800&auto=format&fit=crop",
    category: "Party"
  }
];

interface FeaturedMenuProps {
    isHomeView: boolean;
    onSeeAll?: () => void;
}

// Sidebar Categories
const categories = [
  { id: 'all', name: 'All Menu', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' }, // Grid Icon
  { id: 'popular', name: 'Top Picks', icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z' }, // Fire/Trending
  { id: 'cakes', name: 'Cakes', icon: 'M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z' }, // Cake
  { id: 'pastries', name: 'Pastries', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' }, // Basket/Pastry
  { id: 'desserts', name: 'Desserts', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' }, // Book/Menu (used for dessert list)
];

// Subcomponent for individual Menu Cards (Horizontal - Used in Home View)
const HorizontalMenuCard: React.FC<{ item: MenuItem }> = ({ item }) => {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addToCart(item);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="group flex flex-row gap-5 items-start p-4 rounded-2xl hover:bg-bakery-50 transition-colors duration-300 border border-transparent hover:border-bakery-100 animate-fade-in">
              {/* Image */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded-xl bg-bakery-100 shadow-sm relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="flex-grow flex flex-col justify-between h-full py-1">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-serif font-bold text-bakery-900 group-hover:text-bakery-600 transition-colors">
                        {item.name}
                        </h3>
                        <span className="text-bakery-900 font-sans text-sm font-bold whitespace-nowrap bg-bakery-100 px-2 py-1 rounded ml-2">{item.price}</span>
                    </div>
                    <p className="text-bakery-600 font-sans text-xs font-normal leading-relaxed mt-2 line-clamp-2">
                    {item.description}
                    </p>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                    <span className="text-[9px] uppercase tracking-widest text-bakery-400 font-bold">{item.category}</span>
                    <button 
                        onClick={handleAdd}
                        className={`px-4 py-2 text-white text-[10px] uppercase tracking-widest font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 active:scale-95 ${added ? 'bg-green-600 hover:bg-green-700' : 'bg-bakery-900 hover:bg-bakery-600'}`}
                    >
                        {added ? (
                            <>
                                <span>Added</span>
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            </>
                        ) : (
                            <span>Add +</span>
                        )}
                    </button>
                </div>
              </div>
        </div>
    )
}

// Subcomponent for Vertical Menu Cards (Used in Full Menu View)
const VerticalMenuCard: React.FC<{ item: MenuItem }> = ({ item }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
      addToCart(item);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col items-center text-center p-4 transition-all duration-300 hover:bg-bakery-50/50 rounded-xl">
      {/* Circle Image */}
      <div className="w-32 h-32 rounded-full overflow-hidden shadow-md mb-4 group relative">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>

      <div className="flex flex-col items-center flex-grow w-full">
        <span className="text-[9px] uppercase tracking-[0.2em] text-bakery-400 font-bold mb-1">{item.category}</span>
        <h3 className="font-serif font-bold text-lg text-bakery-900 leading-tight mb-2 h-12 flex items-center justify-center">
          {item.name}
        </h3>
        <p className="text-bakery-600 text-xs font-light line-clamp-2 mb-3 max-w-[200px]">
          {item.description}
        </p>
        <span className="font-sans font-bold text-bakery-900 text-lg mb-4">{item.price}</span>
        
        <button 
          onClick={handleAdd}
          className={`w-full max-w-[140px] py-2.5 text-white text-[10px] uppercase tracking-widest font-bold rounded-full transition-all duration-300 shadow-sm flex items-center justify-center gap-2 active:scale-95 ${added ? 'bg-green-600' : 'bg-bakery-900 hover:bg-bakery-700'}`}
        >
             {added ? 'Added' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};


const FeaturedMenu: React.FC<FeaturedMenuProps> = ({ isHomeView, onSeeAll }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('all');
  const itemsPerPage = isHomeView ? 4 : 6;

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  // Filter Logic
  const filteredItems = menuItems.filter(item => {
    if (isHomeView) return true; // Show filter on HomeView via slice, usually we just show first N
    if (activeCategory === 'all') return true;
    if (activeCategory === 'popular') return ['Best Seller', 'Viral', 'Favorite', 'Bestseller'].includes(item.category);
    if (activeCategory === 'cakes') return ['Classic', 'Local', 'New'].includes(item.category) || item.name.includes('Cake') || item.name.includes('Moist');
    if (activeCategory === 'pastries') return ['Box Set', 'Snack', 'Party'].includes(item.category) || item.name.includes('Tart') || item.name.includes('Pods');
    if (activeCategory === 'desserts') return ['Dessert', 'Gift'].includes(item.category) || item.name.includes('Macarons') || item.name.includes('Tiramisu');
    return true;
  });

  const displayItems = isHomeView 
    ? filteredItems.slice(0, 4) 
    : filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Smooth scroll to top of grid
    const grid = document.getElementById('menu-grid-top');
    if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // --- RENDER FOR HOME PAGE (TEASER) ---
  if (isHomeView) {
    return (
        <section id="menu" className="py-12 bg-white relative scroll-mt-32">
        <div className="max-w-5xl mx-auto px-6 sm:px-12 relative z-10">
            <div className="text-left mb-8">
                <h2 className="text-4xl md:text-5xl font-serif text-bakery-900">
                    Bakery Menu
                </h2>
                <div className="w-20 h-[2px] bg-bakery-400 mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {displayItems.map((item) => (
                <HorizontalMenuCard key={item.id} item={item} />
            ))}
            </div>
            
            <div className="mt-12 text-center">
                <button 
                    onClick={onSeeAll}
                    className="inline-flex items-center gap-2 px-8 py-4 border border-bakery-200 text-bakery-900 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-bakery-900 hover:text-white hover:border-bakery-900 transition-all duration-300"
                >
                    View Full Menu
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </button>
            </div>
        </div>
        </section>
    );
  }

  // --- RENDER FOR FULL MENU PAGE ---
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      
      {/* Sidebar - Sticky on Desktop, Scrollable bar on Mobile */}
      <aside className="w-full md:w-28 lg:w-32 bg-white md:min-h-screen md:sticky md:top-0 z-30 shrink-0 border-r border-bakery-100/50">
         <div className="md:h-screen md:overflow-y-auto hide-scrollbar py-4 md:py-24 px-2">
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 px-4 md:px-0 scrollbar-hide">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`flex flex-col items-center justify-center min-w-[80px] md:min-w-0 md:w-full p-3 rounded-xl transition-all duration-300 gap-2 group ${
                            activeCategory === cat.id 
                            ? 'bg-white shadow-md text-bakery-900 scale-105' 
                            : 'text-bakery-400 hover:bg-white/50 hover:text-bakery-600'
                        }`}
                    >
                        <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${activeCategory === cat.id ? 'bg-bakery-900 text-white' : 'bg-bakery-200/50 text-current'}`}>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={cat.icon} />
                            </svg>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-center leading-tight">
                            {cat.name}
                        </span>
                        {/* Active Indicator Line (Desktop only) */}
                        {activeCategory === cat.id && (
                             <div className="hidden md:block w-1 h-8 bg-bakery-900 absolute left-0 rounded-r-full"></div>
                        )}
                    </button>
                ))}
            </div>
         </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-white">
         <div className="max-w-4xl mx-auto px-6 py-8 md:py-12">
            
            {/* Promotional Banner */}
            <div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden relative mb-12 shadow-lg group">
                <img 
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2000&auto=format&fit=crop" 
                    alt="Fresh from the oven"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-bakery-900/80 to-transparent flex items-center p-8 md:p-12">
                     <div className="text-white max-w-md animate-fade-in-up">
                         <span className="bg-bakery-400 text-bakery-950 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-4 inline-block">Promo</span>
                         <h1 className="text-3xl md:text-5xl font-serif mb-2 italic">Just Bake Lah~</h1>
                         <p className="text-white/80 text-sm font-light">Enjoy 20% off all Chocolate Series items this weekend.</p>
                     </div>
                </div>
            </div>

            {/* Category Header */}
            <div id="menu-grid-top" className="flex items-center gap-4 mb-8">
                <div className="w-1.5 h-8 bg-bakery-900"></div>
                <h2 className="text-2xl md:text-3xl font-serif text-bakery-900 font-bold">
                    {categories.find(c => c.id === activeCategory)?.name} Series
                </h2>
            </div>

            {/* Menu Grid - 2 Column */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-12">
                {displayItems.length > 0 ? (
                    displayItems.map((item) => (
                        <VerticalMenuCard key={item.id} item={item} />
                    ))
                ) : (
                    <div className="col-span-2 py-20 text-center opacity-50">
                        <p className="font-serif text-xl italic text-bakery-500">No items found in this category.</p>
                    </div>
                )}
            </div>

            {/* Pagination (Scoped to Main Content) */}
            {filteredItems.length > itemsPerPage && (
                <div className="flex justify-center items-center mt-16 gap-2 border-t border-bakery-50 pt-8">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-bakery-900 disabled:opacity-30 disabled:cursor-not-allowed hover:text-bakery-500 transition-colors"
                    >
                        Prev
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-serif font-bold transition-all duration-300 ${
                                currentPage === number
                                    ? 'bg-bakery-900 text-white shadow-lg'
                                    : 'bg-bakery-100 text-bakery-900 hover:bg-bakery-200'
                            }`}
                        >
                            {number}
                        </button>
                    ))}

                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-bakery-900 disabled:opacity-30 disabled:cursor-not-allowed hover:text-bakery-500 transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}
            
            <div className="mt-20 text-center opacity-40">
                <p className="text-[10px] uppercase tracking-widest">End of list</p>
                <div className="w-1 h-8 bg-bakery-200 mx-auto mt-2"></div>
            </div>

         </div>
      </main>
    </div>
  );
};

export default FeaturedMenu;