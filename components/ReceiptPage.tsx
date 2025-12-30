import React from 'react';
import { Order } from '../types';

interface ReceiptPageProps {
  order: Order;
  onHome: () => void;
}

const ReceiptPage: React.FC<ReceiptPageProps> = ({ order, onHome }) => {
  return (
    <div className="min-h-screen bg-bakery-50 py-32 px-6 flex justify-center items-start">
      <div className="bg-white w-full max-w-lg shadow-2xl rounded-sm overflow-hidden animate-fade-in-up relative">
        
        {/* Decorative Top Border */}
        <div className="h-2 bg-gradient-to-r from-bakery-400 via-bakery-500 to-bakery-400"></div>

        <div className="p-8 md:p-12 text-center">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <h1 className="text-3xl font-serif text-bakery-900 mb-2">Payment Successful</h1>
            <p className="text-bakery-500 text-sm mb-8">Thank you for your order, {order.customer.name.split(' ')[0]}!</p>

            {/* Receipt Details */}
            <div className="border border-bakery-100 rounded-lg p-6 bg-bakery-50/50 text-left mb-8">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-bakery-200/50">
                    <span className="text-[10px] uppercase tracking-widest text-bakery-400 font-bold">Order ID</span>
                    <span className="font-mono text-sm font-bold text-bakery-900">{order.id}</span>
                </div>
                
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-xs">
                        <span className="text-bakery-500">Pickup Date</span>
                        <span className="text-bakery-900 font-bold">{order.customer.pickupDate}</span>
                    </div>
                     <div className="flex justify-between text-xs">
                        <span className="text-bakery-500">Pickup Time</span>
                        <span className="text-bakery-900 font-bold">{order.customer.pickupTime}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <span className="text-[10px] uppercase tracking-widest text-bakery-400 font-bold block mb-2">Items</span>
                    {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs text-bakery-900">
                             <span>{item.quantity}x {item.name}</span>
                             <span>RM {(parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-4 border-t border-bakery-900/10 flex justify-between items-center">
                    <span className="font-serif text-lg text-bakery-900">Total Paid</span>
                    <span className="font-serif text-lg font-bold text-bakery-900">RM {order.total.toFixed(2)}</span>
                </div>
            </div>

            <div className="space-y-3">
                <button 
                    onClick={() => window.print()}
                    className="w-full py-3 border border-bakery-200 text-bakery-900 font-bold uppercase tracking-widest text-xs rounded hover:bg-bakery-50 transition-colors"
                >
                    Print Receipt
                </button>
                <button 
                    onClick={onHome}
                    className="w-full py-3 bg-bakery-900 text-white font-bold uppercase tracking-widest text-xs rounded hover:bg-bakery-700 transition-colors"
                >
                    Return to Home
                </button>
            </div>

            <p className="mt-8 text-[10px] text-bakery-400 text-center max-w-xs mx-auto leading-relaxed">
                Please show this receipt at the counter when collecting your order.
                A copy has been sent to {order.customer.email}.
            </p>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;