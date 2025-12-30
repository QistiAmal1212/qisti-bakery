import React from 'react';
import { useCart } from '../contexts/CartContext';

interface CartDrawerProps {
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout }) => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    cartTotal,
    cartCount
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceed = () => {
    setIsCartOpen(false);
    onCheckout();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 animate-slide-left">
        
        {/* Header */}
        <div className="p-6 bg-bakery-950 text-white flex justify-between items-center shadow-md">
          <div className="flex items-center gap-3">
             <span className="text-xl font-serif italic">Your Selection</span>
             <span className="bg-bakery-400 text-bakery-950 text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="text-white/50 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-bakery-50">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
              <svg className="w-16 h-16 text-bakery-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="font-serif text-lg text-bakery-900">Your cart is empty</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-xs font-bold uppercase tracking-widest text-bakery-600 underline"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-bakery-100">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-bakery-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h4 className="font-serif font-bold text-bakery-900 leading-tight">{item.name}</h4>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-bakery-300 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-sm text-bakery-500 font-bold">{item.price}</span>
                    
                    <div className="flex items-center gap-3 bg-bakery-50 rounded-full px-2 py-1 border border-bakery-200">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-bakery-900 hover:text-bakery-600 disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-bakery-900 hover:text-bakery-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-bakery-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-bakery-400">Total Estimate</span>
              <span className="text-2xl font-serif font-bold text-bakery-900">RM {cartTotal.toFixed(2)}</span>
            </div>
            
            <button 
              onClick={handleProceed}
              className="w-full py-4 bg-bakery-900 text-white rounded-full font-bold uppercase tracking-[0.15em] hover:bg-bakery-700 transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;