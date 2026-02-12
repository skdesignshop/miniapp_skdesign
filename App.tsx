
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Page, Product, CartItem, TelegramUser, Review } from './types';
import { INITIAL_PRODUCTS, ADMIN_USERNAME, TELEGRAM_BOT_USERNAME, CATEGORIES } from './constants';

// --- UTILS ---
const saveToDB = (key: string, data: any) => localStorage.setItem(`sk_${key}`, JSON.stringify(data));
const getFromDB = (key: string) => {
  const data = localStorage.getItem(`sk_${key}`);
  return data ? JSON.parse(data) : null;
};

// Map des couleurs pour les badges
const getBadgeStyles = (badge: string) => {
  const b = badge.toUpperCase();
  if (b.includes('PREMIUM') || b.includes('ELITE')) return 'bg-amber-500/20 text-amber-300 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
  if (b.includes('BEST-SELLER') || b.includes('HOT')) return 'bg-rose-600/20 text-rose-300 border-rose-600/30 shadow-[0_0_10px_rgba(225,29,72,0.2)]';
  if (b.includes('PROMO') || b.includes('DEAL')) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
  if (b.includes('ANIMÉ') || b.includes('VIDEO') || b.includes('MOTION')) return 'bg-purple-500/20 text-purple-300 border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]';
  if (b.includes('4K') || b.includes('HD')) return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]';
  if (b.includes('CREATION') || b.includes('BRANDING')) return 'bg-blue-500/20 text-blue-300 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]';
  if (b.includes('BOT') || b.includes('SOCIAL')) return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]';
  if (b.includes('VIP')) return 'bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-white border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]';
  return 'bg-white/10 text-white/80 border-white/10';
};

// --- COMPONENTS ---

const BrandingFooter: React.FC = () => (
  <div className="flex flex-col items-center gap-3 py-12 px-6">
    <a 
      href={`https://t.me/${ADMIN_USERNAME}`} 
      target="_blank" 
      className="group relative flex items-center gap-3 px-6 py-3 glass rounded-2xl border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 active:scale-95"
    >
      <div className="absolute inset-0 bg-blue-500/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <span className="text-xs font-black tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
        DÉVELOPPÉ PAR @{ADMIN_USERNAME}
      </span>
      <span className="certified-badge material-symbols-rounded text-xl fill-current">verified</span>
    </a>
    <p className="text-[9px] font-bold text-white/10 tracking-[0.4em] uppercase">Digital Excellence Industry</p>
  </div>
);

const Header: React.FC<{ cartCount: number }> = ({ cartCount }) => (
  <header className="sticky top-0 z-50 flex items-center justify-between p-5 glass border-b border-white/5">
    <div className="flex items-center gap-4">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
        <img 
          src="https://i.postimg.cc/Y9bh0hq7/06A8DA72-16DC-4A70-8307-12A286F8139A.jpg" 
          alt="Logo" 
          className="relative w-14 h-14 rounded-2xl object-cover border border-white/10"
        />
      </div>
      <div>
        <h1 className="text-sm font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">SK DESIGN</h1>
        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mt-1">INDUSTRY</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <button className="p-2.5 rounded-xl glass hover:bg-white/10 transition-all group">
        <span className="material-symbols-rounded text-xl group-hover:scale-110 transition-transform">search</span>
      </button>
      <button className="relative p-2.5 rounded-xl glass hover:bg-white/10 transition-all group">
        <span className="material-symbols-rounded text-xl group-hover:scale-110 transition-transform">shopping_bag</span>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 flex items-center justify-center text-[10px] font-black rounded-full border-2 border-[#030303] animate-bounce">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  </header>
);

const ProductCard: React.FC<{ product: Product; onOpen: (p: Product) => void; onLike: (id: string) => void; isLiked: boolean }> = ({ product, onOpen, onLike, isLiked }) => (
  <div 
    className="relative group glass rounded-[32px] p-2.5 border border-white/5 transition-all duration-500 active:scale-95 shimmer-container card-glow-hover"
    onClick={() => onOpen(product)}
  >
    <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-neutral-900 shadow-2xl">
      <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
      
      <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
        {product.badges?.map(badge => (
          <span 
            key={badge} 
            className={`text-[8px] font-black backdrop-blur-md px-2 py-1 rounded-lg border uppercase tracking-tighter transition-transform group-hover:scale-105 duration-300 ${getBadgeStyles(badge)}`}
          >
            {badge}
          </span>
        ))}
      </div>

      <button 
        onClick={(e) => { e.stopPropagation(); onLike(product.id); }}
        className={`absolute top-3 right-3 p-2.5 backdrop-blur-xl rounded-2xl transition-all duration-300 z-20 group/heart ${isLiked ? 'bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-black/30 hover:bg-white/10'}`}
      >
        <span className={`material-symbols-rounded text-lg transition-all duration-300 ${isLiked ? 'fill-current heart-active' : 'text-white/50 group-hover/heart:text-white'}`}>
          favorite
        </span>
      </button>

      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-xs font-black text-white truncate uppercase tracking-tighter">{product.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm font-black text-blue-400">{product.price}€</span>
          <div className="flex items-center gap-1">
             <span className="material-symbols-rounded text-[12px] text-white/30 fill-current">star</span>
             <span className="text-[10px] font-bold text-white/30">4.9</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN APP ---

export default function App() {
  const [tgUser, setTgUser] = useState<TelegramUser | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>('shop');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  // Light follower effect
  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!cursorGlowRef.current) return;
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
      cursorGlowRef.current.style.left = `${x}px`;
      cursorGlowRef.current.style.top = `${y}px`;
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

  // Persistence Logic
  useEffect(() => {
    // @ts-ignore
    const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
    setTgUser(user || { id: 1, first_name: 'Client VIP', username: 'Guest' });

    const localProducts = getFromDB('products');
    setProducts(localProducts || INITIAL_PRODUCTS);

    const localLikes = getFromDB('likes');
    if (localLikes) setLikedIds(localLikes);

    const localHistory = getFromDB('orderHistory');
    if (localHistory) setOrderHistory(localHistory);

    // @ts-ignore
    window.Telegram?.WebApp?.expand();
  }, []);

  const isAdmin = tgUser?.username === ADMIN_USERNAME;

  const handleLike = (id: string) => {
    setLikedIds(prev => {
      const isAlreadyLiked = prev.includes(id);
      const newLikes = isAlreadyLiked ? prev.filter(i => i !== id) : [...prev, id];
      saveToDB('likes', newLikes);
      
      // Update local products like count
      const updatedProducts = products.map(p => 
        p.id === id ? { ...p, likes: isAlreadyLiked ? Math.max(0, p.likes - 1) : p.likes + 1 } : p
      );
      setProducts(updatedProducts);
      saveToDB('products', updatedProducts);
      return newLikes;
    });
    
    // @ts-ignore
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium');
  };

  const addToCart = (p: Product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === p.id);
      if (exists) return prev.map(item => item.id === p.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...p, quantity: 1 }];
    });
    // @ts-ignore
    window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success');
  };

  const finalizeOrder = () => {
    const total = cart.reduce((a, b) => a + (b.price * b.quantity), 0);
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString('fr-FR'),
      items: cart.map(i => ({ name: i.name, price: i.price })),
      total: total
    };

    const updatedHistory = [newOrder, ...orderHistory];
    setOrderHistory(updatedHistory);
    saveToDB('orderHistory', updatedHistory);

    const text = `NOUVELLE COMMANDE SK DESIGN INDUSTRY%0A${cart.map(i => `• ${i.name} (${i.price}€)`).join('%0A')}%0A%0A💰 Total: ${total}€`;
    window.open(`https://t.me/${TELEGRAM_BOT_USERNAME}?text=${text}`);
    setCart([]);
    // @ts-ignore
    window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success');
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => selectedCategory === 'Tous' || p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div className="min-h-screen pb-32">
      <div ref={cursorGlowRef} className="cursor-glow"></div>
      
      <Header cartCount={cart.length} />

      {currentPage === 'shop' && (
        <main className="p-5 space-y-10 animate-up">
          {/* Horizontal Scroll Hero */}
          <section className="space-y-4">
            <div className="flex justify-between items-end px-2">
               <div>
                  <h2 className="text-xl font-black tracking-tighter uppercase">Disponible</h2>
                  <p className="text-[10px] font-bold text-blue-400/60 tracking-[0.2em] uppercase">Nos dernières pépites</p>
               </div>
               <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Scroll →</span>
            </div>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar -mx-5 px-5 pb-2">
              {products.slice(0, 4).map(p => (
                <div key={p.id} onClick={() => setViewingProduct(p)} className="min-w-[280px] h-48 rounded-[32px] glass p-1 relative overflow-hidden group shadow-2xl border-white/10 shimmer-container card-glow-hover">
                   <img src={p.img} alt="" className="w-full h-full object-cover rounded-[28px] opacity-40 group-hover:opacity-60 transition-opacity" />
                   <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent">
                      <div className="flex gap-1 mb-2">
                        {p.badges?.slice(0, 1).map(badge => (
                          <span key={badge} className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${getBadgeStyles(badge)}`}>{badge}</span>
                        ))}
                      </div>
                      <h4 className="text-lg font-black leading-tight uppercase truncate">{p.name}</h4>
                      <p className="text-xs font-bold text-blue-400">{p.price}€</p>
                   </div>
                </div>
              ))}
            </div>
          </section>

          {/* Categories */}
          <section className="flex gap-2.5 overflow-x-auto hide-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black tracking-widest transition-all border-2 ${selectedCategory === cat ? 'bg-white text-black border-white shadow-xl shadow-white/10' : 'bg-white/5 border-white/5 text-white/40 hover:text-white/70'}`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </section>

          {/* Product Grid */}
          <section className="grid grid-cols-2 gap-4">
            {filteredProducts.map(p => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onOpen={setViewingProduct} 
                onLike={handleLike} 
                isLiked={likedIds.includes(p.id)}
              />
            ))}
          </section>

          <BrandingFooter />
        </main>
      )}

      {currentPage === 'creations' && (
        <main className="p-6 space-y-8 animate-up">
           <div className="text-center py-10">
              <h2 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 uppercase">Showcase</h2>
              <p className="text-xs font-bold text-white/20 tracking-[0.3em] mt-2 uppercase tracking-[0.4em]">Réalisations</p>
           </div>
           <div className="grid grid-cols-1 gap-8">
              {products.filter(p => p.category === 'Creation' || p.badges?.includes('CREATION')).map((p, i) => (
                <div key={p.id} className="group relative glass rounded-[40px] p-2 border-white/10 shadow-2xl overflow-hidden shimmer-container card-glow-hover" onClick={() => setViewingProduct(p)}>
                   <div className="aspect-video rounded-[32px] overflow-hidden">
                      <img src={p.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   </div>
                   <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                         <div>
                            <h4 className="font-black text-xl uppercase tracking-tighter">{p.name}</h4>
                            <p className="text-[10px] font-bold text-blue-400/60 uppercase">High-End Branding</p>
                         </div>
                         <div className="flex gap-1">
                            {[...Array(5)].map((_, idx) => <span key={idx} className="material-symbols-rounded text-sm text-yellow-500 fill-current">star</span>)}
                         </div>
                      </div>
                      <button className="w-full py-4 glass rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-colors">Détails Projet</button>
                   </div>
                </div>
              ))}
              {products.filter(p => p.category === 'Creation' || p.badges?.includes('CREATION')).length === 0 && (
                <div className="py-20 text-center opacity-20">
                  <span className="material-symbols-rounded text-6xl">gallery_thumbnail</span>
                  <p className="mt-4 font-black uppercase tracking-widest">Aucune création à afficher</p>
                </div>
              )}
           </div>
           <BrandingFooter />
        </main>
      )}

      {currentPage === 'profile' && (
        <main className="p-6 space-y-8 animate-up">
          <div className="relative p-10 glass rounded-[48px] text-center border-white/10 shadow-2xl overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full"></div>
              <img 
                src={`https://t.me/i/userpic/320/${tgUser?.username}.jpg`} 
                alt="Avatar" 
                className="w-32 h-32 rounded-full mx-auto border-4 border-white/5 shadow-2xl relative"
                onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${tgUser?.first_name}&background=0088cc&color=fff`; }}
              />
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-4 border-[#030303] certified-badge shadow-lg">
                <span className="material-symbols-rounded text-sm text-white font-bold">verified</span>
              </div>
            </div>
            <h2 className="text-3xl font-black tracking-tighter">{tgUser?.first_name}</h2>
            <p className="text-xs font-bold text-white/30 uppercase tracking-[0.3em] mt-1">@{tgUser?.username}</p>
            
            <div className="grid grid-cols-2 gap-4 mt-10">
               <div className="p-4 glass rounded-[24px]">
                  <p className="text-2xl font-black text-blue-400">{cart.length}</p>
                  <p className="text-[9px] font-black text-white/20 uppercase">Panier</p>
               </div>
               <div className="p-4 glass rounded-[24px]">
                  <p className="text-2xl font-black text-purple-400">{likedIds.length}</p>
                  <p className="text-[9px] font-black text-white/20 uppercase">Favoris</p>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-black tracking-tighter uppercase px-2">Historique des Commandes</h3>
            <div className="space-y-3">
               {orderHistory.map(order => (
                 <div key={order.id} className="p-5 glass rounded-[32px] border-white/5 group">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Commande #{order.id.toString().slice(-4)}</span>
                       <span className="text-[10px] font-bold text-white/20">{order.date}</span>
                    </div>
                    <div className="space-y-1">
                       {order.items.map((item: any, idx: number) => (
                         <p key={idx} className="text-xs font-bold text-white/60">• {item.name}</p>
                       ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                       <span className="text-xs font-black uppercase opacity-40">Total Payé</span>
                       <span className="text-lg font-black text-white">{order.total}€</span>
                    </div>
                 </div>
               ))}
               {orderHistory.length === 0 && (
                 <div className="py-12 text-center glass rounded-[32px] opacity-20 border-dashed border-2 border-white/10">
                    <span className="material-symbols-rounded text-4xl mb-2">history</span>
                    <p className="text-xs font-bold uppercase tracking-widest">Aucune commande passée</p>
                 </div>
               )}
            </div>
          </div>

          <div className="space-y-3">
             <button className="w-full p-5 glass rounded-[32px] flex justify-between items-center group active:scale-95 transition-all">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                      <span className="material-symbols-rounded">support_agent</span>
                   </div>
                   <span className="font-bold text-sm">Contacter le Support</span>
                </div>
                <span className="material-symbols-rounded text-white/20">chevron_right</span>
             </button>
             <button className="w-full p-5 glass rounded-[32px] flex justify-between items-center group active:scale-95 transition-all">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                      <span className="material-symbols-rounded">diamond</span>
                   </div>
                   <span className="font-bold text-sm">Passer Premium</span>
                </div>
                <span className="material-symbols-rounded text-white/20">chevron_right</span>
             </button>
          </div>
          <BrandingFooter />
        </main>
      )}

      {currentPage === 'admin' && isAdmin && (
        <AdminPanel products={products} setProducts={(p) => { setProducts(p); saveToDB('products', p); }} />
      )}

      {/* Product Details Modal */}
      {viewingProduct && (
        <div className="fixed inset-0 z-[60] bg-[#030303] flex flex-col animate-up">
          <div className="p-5 flex justify-between items-center glass border-b border-white/5">
            <button onClick={() => setViewingProduct(null)} className="p-3 glass rounded-2xl hover:bg-white/10 active:scale-90 transition-transform">
               <span className="material-symbols-rounded">close</span>
            </button>
            <div className="text-center">
               <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Service Insight</h4>
               <p className="text-xs font-black text-blue-400 uppercase tracking-tighter">{viewingProduct.category}</p>
            </div>
            <button className="p-3 glass rounded-2xl hover:bg-white/10">
               <span className="material-symbols-rounded">share</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto hide-scrollbar">
            <div className="relative aspect-square">
               <img src={viewingProduct.img} className="w-full h-full object-cover" alt="" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent"></div>
               
               <div className="absolute top-6 left-6 flex flex-wrap gap-2 max-w-[80%]">
                 {viewingProduct.badges?.map(badge => (
                   <span key={badge} className={`text-[10px] font-black backdrop-blur-md px-3 py-1.5 rounded-xl border uppercase tracking-wider ${getBadgeStyles(badge)}`}>
                     {badge}
                   </span>
                 ))}
               </div>

               <button 
                onClick={(e) => { e.stopPropagation(); handleLike(viewingProduct.id); }}
                className={`absolute bottom-6 right-6 p-4 backdrop-blur-xl rounded-full transition-all duration-300 z-20 ${likedIds.includes(viewingProduct.id) ? 'bg-red-500 text-white shadow-[0_0_25px_rgba(239,68,68,0.5)]' : 'bg-black/50 text-white/50 border border-white/10'}`}
               >
                <span className={`material-symbols-rounded text-2xl ${likedIds.includes(viewingProduct.id) ? 'fill-current heart-active' : ''}`}>
                  favorite
                </span>
               </button>
            </div>

            <div className="px-6 -mt-16 relative z-10 space-y-8 pb-32">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                   <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">{viewingProduct.name}</h1>
                   <div className="flex gap-4">
                      <span className="text-2xl font-black text-blue-500">{viewingProduct.price}€</span>
                      <div className="flex items-center gap-1.5 glass px-3 rounded-xl border-white/5">
                         <span className="material-symbols-rounded text-xs text-blue-400 fill-current">thumb_up</span>
                         <span className="text-xs font-black">{viewingProduct.likes} Likes</span>
                      </div>
                   </div>
                </div>
              </div>

              <div className="glass p-8 rounded-[40px] border-white/10 relative overflow-hidden group shadow-2xl">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform">
                    <span className="material-symbols-rounded text-7xl">auto_awesome</span>
                 </div>
                 <h3 className="text-xs font-black text-white/30 uppercase tracking-[0.3em] mb-4">Description</h3>
                 <p className="text-sm font-medium leading-relaxed text-white/70">{viewingProduct.desc}</p>
              </div>

              <div className="space-y-6">
                 <div className="flex justify-between items-center px-2">
                    <h3 className="text-lg font-black tracking-tighter uppercase">Derniers Avis</h3>
                    <span className="text-[10px] font-black text-blue-400 underline uppercase tracking-widest cursor-pointer">Voir plus</span>
                 </div>
                 <div className="space-y-4">
                    {viewingProduct.reviews?.map(rev => (
                      <div key={rev.id} className="p-6 glass rounded-[32px] border-white/5 hover:border-blue-500/20 transition-all">
                         <div className="flex justify-between items-start mb-3">
                            <span className="text-xs font-black uppercase text-blue-400">{rev.user}</span>
                            <span className="text-[10px] font-bold text-white/10 uppercase tracking-widest">{rev.date}</span>
                         </div>
                         <p className="text-xs font-medium text-white/60 italic leading-relaxed">"{rev.comment}"</p>
                      </div>
                    ))}
                    {(!viewingProduct.reviews || viewingProduct.reviews.length === 0) && (
                      <div className="p-10 text-center glass rounded-[32px] opacity-30 border-dashed border-2 border-white/10">
                         <span className="material-symbols-rounded text-4xl mb-2">reviews</span>
                         <p className="text-xs font-bold uppercase tracking-widest">Aucun avis pour l'instant</p>
                      </div>
                    )}
                 </div>
              </div>
            </div>
          </div>

          <div className="p-6 glass border-t border-white/5 bg-black/40 backdrop-blur-3xl">
            <button 
              onClick={() => { addToCart(viewingProduct); setViewingProduct(null); }}
              className="w-full py-6 rounded-[30px] bg-gradient-to-r from-blue-700 to-blue-500 font-black text-lg tracking-tighter shadow-2xl shadow-blue-600/40 active:scale-95 transition-all flex items-center justify-center gap-4 group btn-glow"
            >
              <span className="material-symbols-rounded text-2xl group-hover:rotate-12 transition-transform">add_shopping_cart</span>
              AJOUTER AU PANIER
            </button>
          </div>
        </div>
      )}

      {/* Floating Order Summary */}
      {cart.length > 0 && currentPage === 'shop' && (
        <div className="fixed bottom-32 inset-x-6 z-40 animate-bounce-in">
          <div className="glass p-5 rounded-[32px] border-2 border-blue-500/40 flex items-center justify-between shadow-2xl backdrop-blur-3xl bg-black/70">
             <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                   <span className="material-symbols-rounded font-black text-3xl text-white">receipt_long</span>
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{cart.length} Services</p>
                   <p className="text-2xl font-black text-white">{cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)}€</p>
                </div>
             </div>
             <button 
               onClick={finalizeOrder}
               className="px-8 py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all active:scale-95 shadow-xl btn-glow"
             >
               Finaliser
             </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed bottom-6 inset-x-6 z-50 p-2 glass rounded-[36px] border-white/10 shadow-2xl flex justify-around items-center">
        {[
          { id: 'shop', icon: 'storefront' },
          { id: 'creations', icon: 'auto_awesome' },
          { id: 'profile', icon: 'person' },
          ...(isAdmin ? [{ id: 'admin', icon: 'settings_suggest' }] : [])
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id as Page)}
            className={`p-4 rounded-[28px] transition-all duration-500 active:scale-90 ${currentPage === item.id ? 'bg-white text-black scale-110 shadow-xl' : 'text-white/30 hover:text-white/60'}`}
          >
            <span className={`material-symbols-rounded text-2xl ${currentPage === item.id ? 'fill-current' : ''}`}>{item.icon}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

// --- ADMIN PANEL ---

const AdminPanel: React.FC<{ products: Product[]; setProducts: (p: Product[]) => void }> = ({ products, setProducts }) => {
  const [form, setForm] = useState<Partial<Product>>({ name: '', price: 0, img: '', desc: '', category: 'Service' });
  const [editingId, setEditingId] = useState<string | null>(null);

  const save = () => {
    if (!form.name || !form.price) return;
    let next;
    if (editingId) {
      next = products.map(p => p.id === editingId ? { ...p, ...form } : p);
    } else {
      next = [...products, { ...form, id: Date.now().toString(), likes: 0, badges: [], reviews: [] } as Product];
    }
    setProducts(next);
    setEditingId(null);
    setForm({ name: '', price: 0, img: '', desc: '', category: 'Service' });
    // @ts-ignore
    window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success');
  };

  return (
    <div className="p-6 space-y-10 animate-up">
      <div className="flex justify-between items-center bg-blue-500/10 p-8 rounded-[40px] border border-blue-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent -z-10"></div>
        <div>
           <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">Gestion</h2>
           <p className="text-[10px] font-black text-blue-400/50 tracking-widest mt-2 uppercase">Espace Propriétaire</p>
        </div>
        <span className="material-symbols-rounded text-4xl text-blue-500 animate-pulse">analytics</span>
      </div>

      <div className="glass p-8 rounded-[40px] border-white/10 space-y-6 shadow-2xl">
        <h3 className="font-black uppercase tracking-tighter text-lg">{editingId ? 'Modifier Service' : 'Nouveau Service'}</h3>
        <div className="space-y-4">
           <input 
             className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
             placeholder="Nom du service" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
           />
           <div className="flex gap-4">
             <input 
               type="number" className="w-1/2 bg-white/5 border border-white/5 rounded-2xl p-5 text-sm focus:outline-none transition-all"
               placeholder="Prix €" value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})}
             />
             <select 
               className="w-1/2 bg-neutral-900 border border-white/5 rounded-2xl p-5 text-sm focus:outline-none transition-all"
               value={form.category} onChange={e => setForm({...form, category: e.target.value as any})}
             >
                {CATEGORIES.filter(c => c !== 'Tous').map(c => <option key={c} value={c}>{c}</option>)}
             </select>
           </div>
           <input 
             className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-sm font-mono opacity-50"
             placeholder="URL Image" value={form.img} onChange={e => setForm({...form, img: e.target.value})}
           />
           <textarea 
             className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-sm h-32 focus:outline-none resize-none transition-all"
             placeholder="Description..." value={form.desc} onChange={e => setForm({...form, desc: e.target.value})}
           />
           <button onClick={save} className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-all shadow-xl">
             {editingId ? 'Mettre à jour' : 'Enregistrer'}
           </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-black text-white/20 uppercase tracking-[0.3em] px-2">Catalogue SK Design</h3>
        {products.map(p => (
          <div key={p.id} className="glass p-4 rounded-[32px] flex items-center gap-4 border-white/5 group hover:border-blue-500/20 transition-all">
            <img src={p.img} alt="" className="w-16 h-16 rounded-2xl object-cover group-hover:scale-105 transition-transform" />
            <div className="flex-1 min-w-0">
               <h4 className="font-black text-sm truncate uppercase tracking-tighter">{p.name}</h4>
               <p className="text-[10px] font-black text-blue-400 mt-0.5">{p.price}€ • {p.category}</p>
            </div>
            <div className="flex gap-2">
               <button onClick={() => { setEditingId(p.id); setForm(p); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="p-3 glass rounded-xl text-blue-400 hover:bg-blue-500 hover:text-white transition-all"><span className="material-symbols-rounded text-sm">edit</span></button>
               <button onClick={() => setProducts(products.filter(item => item.id !== p.id))} className="p-3 glass rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all"><span className="material-symbols-rounded text-sm">delete</span></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
