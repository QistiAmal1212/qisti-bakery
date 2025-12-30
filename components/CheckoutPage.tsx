import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Order, CustomerDetails } from '../types';

interface CheckoutPageProps {
  onSuccess: (order: Order) => void;
  onCancel: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ onSuccess, onCancel }) => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('FPX');
  
  const [details, setDetails] = useState<CustomerDetails>({
    name: '',
    phone: '',
    email: '',
    pickupDate: '',
    pickupTime: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment gateway delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 100000).toString().padStart(6, '0')}`,
      items: [...cartItems],
      total: cartTotal,
      customer: details,
      timestamp: new Date().toISOString()
    };

    clearCart();
    setIsProcessing(false);
    onSuccess(newOrder);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-12 px-6">
        <h2 className="text-3xl font-serif text-bakery-900 mb-4">Your cart is empty</h2>
        <button onClick={onCancel} className="text-bakery-400 underline uppercase tracking-widest text-xs font-bold">Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-bakery-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <button onClick={onCancel} className="flex items-center gap-2 text-bakery-400 text-[10px] uppercase tracking-widest font-bold mb-8 hover:text-bakery-900 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Back to Menu
        </button>

        <h1 className="text-4xl font-serif text-bakery-900 mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-2 space-y-12">
            
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-12">
              
              {/* Pickup Details Section */}
              <section className="bg-white p-8 rounded-xl shadow-sm border border-bakery-100">
                <h2 className="text-lg font-serif font-bold text-bakery-900 mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-bakery-900 text-white flex items-center justify-center text-xs">1</span>
                  Pickup Details
                </h2>
                
                {/* Fixed Delivery Method */}
                <div className="mb-8 p-4 bg-bakery-50 rounded-lg border border-bakery-200 flex items-start gap-4">
                  <div className="p-2 bg-white rounded-full text-bakery-900">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-bakery-900 mb-1">Store Pickup Only</span>
                    <p className="text-xs text-bakery-600 leading-relaxed">
                      123 Jalan Ampang, 50450 Kuala Lumpur<br/>
                      <span className="text-bakery-400">Open Daily: 10:00 AM - 8:00 PM</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-bakery-400">Pickup Date</label>
                    <input 
                      type="date" 
                      name="pickupDate"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={details.pickupDate}
                      onChange={handleChange}
                      className="w-full bg-bakery-50 border border-bakery-200 rounded p-3 text-sm focus:outline-none focus:border-bakery-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-bakery-400">Pickup Time</label>
                    <input 
                      type="time" 
                      name="pickupTime"
                      required
                      min="10:00"
                      max="20:00"
                      value={details.pickupTime}
                      onChange={handleChange}
                      className="w-full bg-bakery-50 border border-bakery-200 rounded p-3 text-sm focus:outline-none focus:border-bakery-400"
                    />
                  </div>
                </div>
              </section>

              {/* Customer Details Section */}
              <section className="bg-white p-8 rounded-xl shadow-sm border border-bakery-100">
                <h2 className="text-lg font-serif font-bold text-bakery-900 mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-bakery-900 text-white flex items-center justify-center text-xs">2</span>
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-bakery-400">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="e.g. Sarah Lee"
                      value={details.name}
                      onChange={handleChange}
                      className="w-full bg-bakery-50 border border-bakery-200 rounded p-3 text-sm focus:outline-none focus:border-bakery-400"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-bakery-400">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        placeholder="+60 12 345 6789"
                        value={details.phone}
                        onChange={handleChange}
                        className="w-full bg-bakery-50 border border-bakery-200 rounded p-3 text-sm focus:outline-none focus:border-bakery-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-bakery-400">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        placeholder="sarah@example.com"
                        value={details.email}
                        onChange={handleChange}
                        className="w-full bg-bakery-50 border border-bakery-200 rounded p-3 text-sm focus:outline-none focus:border-bakery-400"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment Section */}
              <section className="bg-white p-8 rounded-xl shadow-sm border border-bakery-100">
                <h2 className="text-lg font-serif font-bold text-bakery-900 mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-bakery-900 text-white flex items-center justify-center text-xs">3</span>
                  Payment Method
                </h2>
                
                <div className="space-y-4">
                  <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'FPX' ? 'border-bakery-400 bg-bakery-50' : 'border-bakery-200 hover:border-bakery-300'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="FPX"
                      checked={paymentMethod === 'FPX'} 
                      onChange={() => setPaymentMethod('FPX')}
                      className="accent-bakery-900 w-5 h-5" 
                    />
                    <div className="flex-1">
                      <span className="block font-bold text-sm text-bakery-900">Online Banking (FPX)</span>
                      <span className="text-xs text-bakery-500">Secure payment via ToyyibPay / Billplz</span>
                    </div>
                  </label>

                  <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'Cash' ? 'border-bakery-400 bg-bakery-50' : 'border-bakery-200 hover:border-bakery-300'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="Cash"
                      checked={paymentMethod === 'Cash'} 
                      onChange={() => setPaymentMethod('Cash')}
                      className="accent-bakery-900 w-5 h-5" 
                    />
                    <div className="flex-1">
                      <span className="block font-bold text-sm text-bakery-900">Cash / QR on Pickup</span>
                      <span className="text-xs text-bakery-500">Pay at the counter when you collect your order</span>
                    </div>
                  </label>
                </div>
              </section>

            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="sticky top-32">
            <div className="bg-white p-8 rounded-xl shadow-xl border border-bakery-100">
              <h3 className="text-lg font-serif font-bold text-bakery-900 mb-6 pb-4 border-b border-bakery-100">Order Summary</h3>
              
              <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                     <div className="w-12 h-12 bg-bakery-100 rounded overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover"/>
                     </div>
                     <div className="flex-1">
                        <div className="flex justify-between items-start">
                             <h4 className="text-sm font-bold text-bakery-900">{item.name}</h4>
                             <span className="text-sm font-bold text-bakery-900">RM {(parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity).toFixed(2)}</span>
                        </div>
                        <div className="text-xs text-bakery-500 mt-1">Qty: {item.quantity}</div>
                     </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-bakery-100 text-sm">
                 <div className="flex justify-between text-bakery-600">
                    <span>Subtotal</span>
                    <span>RM {cartTotal.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-bakery-600">
                    <span>Tax (0%)</span>
                    <span>RM 0.00</span>
                 </div>
                 <div className="flex justify-between text-bakery-900 font-bold text-lg pt-2 border-t border-bakery-100 mt-2">
                    <span>Total</span>
                    <span>RM {cartTotal.toFixed(2)}</span>
                 </div>
              </div>

              <button 
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className={`w-full mt-8 py-4 bg-bakery-900 text-white font-bold uppercase tracking-[0.15em] rounded transition-all shadow-lg hover:bg-bakery-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
              >
                {isProcessing ? (
                   <>
                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                     Processing...
                   </>
                ) : (
                   `Pay RM ${cartTotal.toFixed(2)}`
                )}
              </button>
              
              <p className="text-[10px] text-center text-bakery-400 mt-4">
                 By clicking Pay, you agree to our Terms of Service.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;