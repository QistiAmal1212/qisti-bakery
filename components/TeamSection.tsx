import React from 'react';

interface TeamMember {
  role: string;
  image: string;
  name?: string;
}

const teamMembers: TeamMember[] = [
  { 
    role: "The Visionary",
    name: "Sarah Qisti", 
    image: "https://pub-c449fbcb85e34d4da0c9302175ae5c4e.r2.dev/team/manager.jpeg" 
  },
  { 
    role: "Master Bakers",
    name: "The Culinary Team",
    image: "https://pub-c449fbcb85e34d4da0c9302175ae5c4e.r2.dev/team/bakers.jpeg" 
  },
  { 
    role: "Tech Lead",
    name: "Digital Craftsman",
    image: "https://pub-c449fbcb85e34d4da0c9302175ae5c4e.r2.dev/team/head%20of%20it.jpeg" 
  },
  { 
    role: "Atmosphere", 
    name: "The Entertainer",
    image: "https://pub-c449fbcb85e34d4da0c9302175ae5c4e.r2.dev/team/intertainer.jpeg" 
  },
  { 
    role: "Logistics",
    name: "The Minions", 
    image: "https://pub-c449fbcb85e34d4da0c9302175ae5c4e.r2.dev/team/minion.jpeg" 
  }
];

const TeamSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white text-bakery-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-bakery-400 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Who We Are</span>
            <h2 className="text-4xl md:text-5xl font-serif text-bakery-950 mb-6">
                Meet the <span className="italic text-bakery-400">Artisans</span>
            </h2>
            <p className="text-bakery-600 font-light leading-relaxed">
                Behind every masterpiece is a team of passionate creators dedicated to making your special moments unforgettable.
            </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
                <div 
                    key={idx} 
                    className="group relative aspect-[3/4] overflow-hidden rounded-sm cursor-pointer"
                >
                    {/* Image */}
                    <img 
                        src={member.image} 
                        alt={member.role} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bakery-950/90 via-bakery-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="w-8 h-[1px] bg-bakery-400 mb-4 origin-left transition-all duration-500 group-hover:w-16"></div>
                        <h3 className="text-white font-serif text-2xl italic mb-1">{member.name}</h3>
                        <p className="text-bakery-400 text-[10px] uppercase tracking-widest font-bold">{member.role}</p>
                    </div>

                    {/* Decorative Border on Hover */}
                    <div className="absolute inset-4 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-95 group-hover:scale-100 pointer-events-none"></div>
                </div>
            ))}
            
            {/* Join Us Card */}
            <div className="aspect-[3/4] bg-bakery-50 flex flex-col items-center justify-center text-center p-8 border border-bakery-100 group hover:bg-bakery-900 hover:text-white transition-colors duration-500">
                <div className="w-12 h-12 rounded-full border-2 border-bakery-400 flex items-center justify-center mb-6 group-hover:bg-bakery-400 group-hover:text-bakery-950 transition-colors">
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" /></svg>
                </div>
                <h3 className="font-serif text-2xl mb-2 italic">Join the Team</h3>
                <p className="text-xs font-bold uppercase tracking-widest opacity-60">We are hiring</p>
            </div>
        </div>

      </div>
    </section>
  );
};

export default TeamSection;