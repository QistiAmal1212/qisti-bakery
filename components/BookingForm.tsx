import React, { useState } from 'react';

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    eventDate: '',
    eventType: 'Wedding',
    theme: '',
    budget: 'RM 500 - RM 1,000',
    delivery: 'Pickup',
    name: '',
    contact: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi Qisti Bakery, I would like to inquire about a cake:%0A%0AEvent: ${formData.eventType}%0ADate: ${formData.eventDate}%0ABudget: ${formData.budget}%0ADelivery: ${formData.delivery}%0ATheme: ${formData.theme}%0A%0AName: ${formData.name}`;
    window.open(`https://wa.me/60139927122?text=${message}`, '_blank');
  };

  return (
    <section id="booking" className="bg-bakery-950 relative overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[800px]">
        
        {/* Left Side: Context/Inspiration */}
        <div className="lg:w-2/5 relative min-h-[400px] lg:min-h-full">
            <div className="absolute inset-0">
                <img 
                    src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=1200&auto=format&fit=crop" 
                    alt="Cake Detail" 
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-bakery-950/60 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-bakery-950 via-transparent to-transparent"></div>
            </div>
            
            <div className="relative z-10 p-12 lg:p-20 flex flex-col justify-end h-full">
                <div className="w-12 h-1 bg-bakery-400 mb-8"></div>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
                    Let's Create Something <span className="italic text-bakery-400">Extraordinary</span>
                </h2>
                <p className="text-bakery-200 font-light leading-relaxed mb-12 max-w-sm">
                    From intimate gatherings to grand celebrations, we translate your vision into edible art. Tell us your story.
                </p>
                
                <div className="space-y-4 text-sm text-bakery-300 font-light border-t border-white/10 pt-8">
                    <p className="flex items-center gap-4">
                        <span className="w-2 h-2 rounded-full bg-bakery-400"></span>
                        Bespoke Wedding Cakes
                    </p>
                    <p className="flex items-center gap-4">
                        <span className="w-2 h-2 rounded-full bg-bakery-400"></span>
                        Corporate & Event Gifting
                    </p>
                    <p className="flex items-center gap-4">
                        <span className="w-2 h-2 rounded-full bg-bakery-400"></span>
                        Custom Dessert Tables
                    </p>
                </div>
            </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:w-3/5 bg-bakery-900 p-8 lg:p-24 flex items-center">
            <div className="max-w-xl w-full mx-auto">
                <div className="mb-12">
                    <span className="text-bakery-400 font-bold tracking-[0.2em] uppercase text-xs mb-2 block">Inquiry Form</span>
                    <h3 className="text-2xl font-serif text-white italic">Start your Journey</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                    
                    {/* Event Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="group">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-bakery-400 mb-2 block group-focus-within:text-white transition-colors">Event Type</label>
                            <div className="relative border-b border-bakery-700 pb-2 transition-colors focus-within:border-bakery-400">
                                <select 
                                    name="eventType" 
                                    value={formData.eventType} 
                                    onChange={handleChange}
                                    className="w-full bg-transparent text-white focus:outline-none appearance-none cursor-pointer py-1"
                                >
                                    <option className="bg-bakery-900 text-bakery-200">Wedding</option>
                                    <option className="bg-bakery-900 text-bakery-200">Engagement</option>
                                    <option className="bg-bakery-900 text-bakery-200">Birthday</option>
                                    <option className="bg-bakery-900 text-bakery-200">Corporate Event</option>
                                    <option className="bg-bakery-900 text-bakery-200">Other</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-bakery-400">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>

                        <div className="group">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-bakery-400 mb-2 block group-focus-within:text-white transition-colors">Date</label>
                            <input 
                                type="date" 
                                name="eventDate"
                                value={formData.eventDate}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b border-bakery-700 pb-2 text-white focus:outline-none focus:border-bakery-400 transition-colors placeholder-bakery-700 py-1"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="group">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-bakery-400 mb-2 block group-focus-within:text-white transition-colors">Budget</label>
                            <div className="relative border-b border-bakery-700 pb-2 transition-colors focus-within:border-bakery-400">
                                <select 
                                    name="budget" 
                                    value={formData.budget}
                                    onChange={handleChange}
                                    className="w-full bg-transparent text-white focus:outline-none appearance-none cursor-pointer py-1"
                                >
                                    <option className="bg-bakery-900 text-bakery-200">RM 500 - RM 1,000</option>
                                    <option className="bg-bakery-900 text-bakery-200">RM 1,000 - RM 2,000</option>
                                    <option className="bg-bakery-900 text-bakery-200">RM 2,000 - RM 3,500</option>
                                    <option className="bg-bakery-900 text-bakery-200">RM 3,500+</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-bakery-400">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>

                         <div className="group">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-bakery-400 mb-2 block group-focus-within:text-white transition-colors">Collection</label>
                            <div className="flex gap-6 pt-2">
                                <label className="flex items-center gap-2 cursor-pointer text-bakery-200 hover:text-white transition-colors">
                                    <input 
                                        type="radio" 
                                        name="delivery" 
                                        value="Pickup" 
                                        checked={formData.delivery === 'Pickup'}
                                        onChange={handleChange}
                                        className="accent-bakery-400 h-4 w-4"
                                    />
                                    <span className="text-sm">Store Pickup</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer text-bakery-200 hover:text-white transition-colors">
                                    <input 
                                        type="radio" 
                                        name="delivery" 
                                        value="COD" 
                                        checked={formData.delivery === 'COD'}
                                        onChange={handleChange}
                                        className="accent-bakery-400 h-4 w-4"
                                    />
                                    <span className="text-sm">Delivery</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="group">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-bakery-400 mb-2 block group-focus-within:text-white transition-colors">Theme & Details</label>
                        <textarea 
                            name="theme"
                            value={formData.theme}
                            onChange={handleChange}
                            rows={2}
                            placeholder="Tell us about your colors, style, or any specific requirements..."
                            className="w-full bg-transparent border-b border-bakery-700 pb-2 text-white focus:outline-none focus:border-bakery-400 transition-colors placeholder-bakery-700 resize-none py-1"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        <div className="group">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-bakery-400 mb-2 block group-focus-within:text-white transition-colors">Your Name</label>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b border-bakery-700 pb-2 text-white focus:outline-none focus:border-bakery-400 transition-colors py-1"
                            />
                        </div>
                        <div className="group">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-bakery-400 mb-2 block group-focus-within:text-white transition-colors">Contact Number</label>
                             <input 
                                type="tel" 
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                required
                                placeholder="+60"
                                className="w-full bg-transparent border-b border-bakery-700 pb-2 text-white focus:outline-none focus:border-bakery-400 transition-colors py-1"
                            />
                        </div>
                    </div>

                    <div className="pt-8">
                        <button 
                            type="submit" 
                            className="group relative px-12 py-4 bg-bakery-400 text-bakery-950 font-bold uppercase tracking-[0.2em] rounded-sm overflow-hidden transition-all hover:bg-white w-full md:w-auto"
                        >
                            <span className="relative z-10">Send Inquiry</span>
                        </button>
                    </div>

                </form>
            </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;