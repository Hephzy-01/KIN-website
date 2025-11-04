import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AnimatedSection } from './components/AnimatedSection';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Programmes } from './components/Programmes';
import { GodsUniversity } from './components/GodsUniversity';
import { HandshakeIcon, JugglingIcon, ServiceIcon, WindIcon, AffirmationIcon, DeclarationIcon, FastIcon, KinFastIcon, PrefixIcon, BibleIcon } from './components/Icons';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'contact' | 'programmes' | 'gods-university'>('home');

  return (
    <div className="bg-white text-gray-800 font-sans antialiased overflow-x-hidden">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      {currentPage === 'about' ? (
        <About />
      ) : currentPage === 'contact' ? (
        <Contact />
      ) : currentPage === 'programmes' ? (
        <Programmes onNavigate={setCurrentPage} />
      ) : currentPage === 'gods-university' ? (
        <GodsUniversity />
      ) : (
      <main>
        {/* Hero Section */}
        <section id="home" className="relative h-[70vh] sm:h-[80vh] flex items-center justify-center text-center overflow-hidden pt-20">
            <div 
                className="absolute inset-0 bg-cover bg-center animate-zoom-out" 
                style={{ backgroundImage: "url(https://lh3.googleusercontent.com/d/1fruyjjfTaHdrR8GuvQRFBchD-3JPxBr8)" }}
                aria-hidden="true"
            >
                <div className="absolute inset-0 bg-brand-purple-dark opacity-50"></div>
            </div>

            <div className="relative z-10 px-4 py-8">
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-wider" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                   <span className="inline-block overflow-hidden whitespace-nowrap animate-typing-reveal border-r-4 border-r-brand-yellow">
                        KidsInspiring Nation<span className="text-brand-yellow">.</span>
                    </span>
                </h1>
                <AnimatedSection delay={2700}>
                    <p className="mt-4 sm:mt-6 max-w-4xl mx-auto text-lg sm:text-xl md:text-3xl lg:text-4xl text-gray-200 font-light px-2">
                        A Global Movement to Raise <span className="text-brand-yellow font-semibold">goDs</span> Who Build <span className="text-brand-yellow font-semibold">Nations!</span>
                    </p>
                </AnimatedSection>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-24 sm:h-48 bg-gradient-to-t from-white to-transparent" aria-hidden="true"></div>
        </section>

        {/* About Us Section */}
        <section className="relative py-16 sm:py-24 md:py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            <div className="absolute top-10 right-10 w-64 h-64 bg-brand-yellow/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-brand-purple/10 rounded-full filter blur-3xl"></div>
            <div className="max-w-7xl mx-auto relative z-10">
                <AnimatedSection>
                    <div className="text-center mb-12 sm:mb-16 md:mb-20">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-purple mb-4 sm:mb-6 px-2">What is KidsInspiring Nation?</h2>
                        <div className="w-24 sm:w-32 h-1.5 bg-brand-yellow mx-auto"></div>
                    </div>
                </AnimatedSection>
                <AnimatedSection delay={200}>
                    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 lg:p-20 border-t-4 border-brand-yellow">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed text-center">
                            KidsInspiring Nation (KIN) is a mission-driven organization empowering children to become exceptional leaders and nation-builders. For eight years, we've witnessed remarkable growth through programs rooted in biblical principles, raising children as 'goDs' who transform communities and nations through their Spirit, Skills, and Service.
                        </p>
                    </div>
                </AnimatedSection>
            </div>
        </section>

        {/* Core Values Section */}
        <section id="about" className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-brand-purple-dark overflow-hidden">
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-yellow-400/10 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-400/20 rounded-full filter blur-3xl opacity-50 animate-pulse-slow"></div>
            <div className="max-w-7xl mx-auto relative z-10">
                <AnimatedSection>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-3 sm:mb-4 px-2" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.3)' }}>
                        Our Core Values
                    </h2>
                    <div className="w-20 sm:w-24 h-1 bg-brand-yellow mx-auto mb-8 sm:mb-12"></div>
                </AnimatedSection>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {coreValues.map((value, index) => (
                        <AnimatedSection key={index} delay={index * 150}>
                            <div className="relative h-full p-6 sm:p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-xl overflow-hidden group transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2">
                                <div className="absolute -bottom-4 -right-2 text-[8rem] sm:text-[10rem] font-black text-white/5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                                    {value.letter}
                                </div>
                                <div className="relative">
                                    <h3 className="text-2xl sm:text-3xl font-bold text-brand-yellow">{value.title}</h3>
                                    <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-300">{value.description}</p>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>


        {/* Nation Building Strategies Section */}
        <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
            <div className="absolute top-10 right-10 w-96 h-96 bg-brand-yellow/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-purple/10 rounded-full filter blur-3xl"></div>
            <div className="max-w-7xl mx-auto relative z-10">
                <AnimatedSection>
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple mb-3 sm:mb-4 px-2">Our Nation Building Strategies</h2>
                        <div className="w-24 sm:w-32 h-1.5 bg-brand-yellow mx-auto mb-6 sm:mb-8"></div>
                        <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-5xl mx-auto px-2">
                            At KidsInspiring Nation (KIN), our nation-building strategies are thoughtfully adapted into impactful programs and events. These initiatives are firmly rooted in the <span className="text-brand-purple font-semibold">Word of God</span>, which serves as the unshakable foundation and indispensable cornerstone for the transformation and growth of our nation, Nigeria.
                        </p>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={200}>
                    <p className="text-center text-gray-600 text-base sm:text-lg mb-8 sm:mb-12 font-medium px-2">
                        These strategies, designed to drive meaningful change, include:
                    </p>
                </AnimatedSection>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                    {nationBuildingStrategies.map((strategy, index) => (
                        <AnimatedSection key={index} delay={index * 80}>
                            <div className="relative bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-brand-yellow/30 transition-all duration-300 hover:-translate-y-2 border-l-4 border-brand-yellow group">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-brand-purple rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-brand-yellow font-bold text-base sm:text-lg">{index + 1}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-brand-purple group-hover:text-brand-purple-dark transition-colors">
                                            {strategy}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                <AnimatedSection delay={nationBuildingStrategies.length * 80}>
                    <div className="text-center">
                        <button onClick={() => setCurrentPage('programmes')} className="inline-block bg-brand-yellow text-brand-purple-dark font-bold py-3 px-6 sm:py-4 sm:px-10 rounded-full text-base sm:text-lg uppercase tracking-wider hover:bg-brand-yellow-dark transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                            Learn More
                        </button>
                    </div>
                </AnimatedSection>
            </div>
        </section>

        {/* goDs University Highlight Section */}
        <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-brand-purple-dark to-brand-purple overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23FDB913%22%20fill-opacity%3D%220.05%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M5%200h1L0%206V5zM6%205v1H5z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
            <div className="max-w-6xl mx-auto relative z-10">
                <AnimatedSection>
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 px-2"><span className="lowercase">go</span>D'<span className="lowercase">s</span> <span className="text-brand-yellow">University</span> (<span className="lowercase text-white">g</span><span className="text-brand-yellow">U</span>)</h2>
                        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 font-semibold mb-3 sm:mb-4 px-2">In Spirit | by Skills | For Service</p>
                        <div className="w-24 sm:w-32 h-1.5 bg-brand-yellow mx-auto mb-6 sm:mb-8"></div>
                    </div>
                </AnimatedSection>
                
                <AnimatedSection delay={200}>
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 md:p-12 mb-6 sm:mb-8">
                        <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed text-center mb-4 sm:mb-6">
                            The goDs University is the training arm of KidsInspiring Nation (KIN), founded to raise children who build nations and shift generational paradigms as goDs. Through our carefully curated 7-year pathway, we help children develop unique spiritual strength, harness untapped skills, and maximize decades of service to God through nation-building.
                        </p>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={300}>
                    <div className="text-center">
                        <button onClick={() => setCurrentPage('gods-university')} className="inline-block bg-brand-yellow text-brand-purple-dark font-bold py-3 px-6 sm:py-4 sm:px-10 rounded-full text-base sm:text-lg uppercase tracking-wider hover:bg-brand-yellow-dark transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                            Explore goDs University
                        </button>
                    </div>
                </AnimatedSection>
            </div>
        </section>

        {/* Mysteries Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M5%200h1L0%206V5zM6%205v1H5z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]">
            <div className="max-w-7xl mx-auto">
                <AnimatedSection>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-brand-purple mb-3 sm:mb-4 px-2">Our Mysteries</h2>
                    <div className="w-20 sm:w-24 h-1 bg-brand-yellow mx-auto mb-8 sm:mb-12"></div>
                </AnimatedSection>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {mysteries.map((mystery, index) => (
                        <AnimatedSection key={index} delay={index * 100}>
                            <div className="bg-white p-5 sm:p-6 rounded-xl h-full transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-brand-yellow/30 text-center">
                                <div className="flex justify-center mb-3 sm:mb-4">
                                  {mystery.icon}
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-brand-purple mb-2 group-hover:text-brand-yellow-dark transition-colors">{mystery.title}</h3>
                                <p className="text-sm sm:text-base text-gray-600">{mystery.description}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>

        {/* 3 Core Tripod System */}
        <section id="tripod-system" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <AnimatedSection>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-brand-purple mb-3 sm:mb-4 px-2">Our 3 Core Tripod System</h2>
                    <div className="w-20 sm:w-24 h-1 bg-brand-yellow mx-auto mb-8 sm:mb-12"></div>
                </AnimatedSection>
                <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                    {tripodSystems.map((system, index) => (
                         <AnimatedSection key={index} delay={index * 150}>
                            <div className="bg-white p-5 sm:p-6 rounded-xl h-full transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-brand-yellow/30 text-center">
                                <div className="flex justify-center mb-3 sm:mb-4">{system.icon}</div>
                                <h3 className="text-lg sm:text-xl font-bold text-brand-purple mb-2">{system.title}</h3>
                                <p className="text-sm sm:text-base text-gray-600">{system.description}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>


        {/* Partner with us */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
                <AnimatedSection initialState='opacity-0 -translate-x-10' finalState='opacity-100 translate-x-0'>
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple mb-3 sm:mb-4">Partner With Us</h2>
                        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600">
                            Our work would reach a billion children over the next 20 years. To do that, we need to be at the center of birthing, raising and nurturing children as gods. You can walk with God as a god-raiser in KIN through your giving.
                        </p>
                        <a href="https://paystack.shop/pay/KINgive" target="_blank" rel="noopener noreferrer" className="mt-6 sm:mt-8 inline-block bg-brand-yellow text-brand-purple-dark font-bold py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg uppercase tracking-wider hover:bg-brand-yellow-dark transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                            Give to this cause
                        </a>
                    </div>
                </AnimatedSection>
                <AnimatedSection initialState='opacity-0 translate-x-10' finalState='opacity-100 translate-x-0'>
                    <div className="flex justify-center animate-float">
                        <HandshakeIcon className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 text-brand-yellow drop-shadow-lg" />
                    </div>
                </AnimatedSection>
            </div>
        </section>

        {/* Volunteer Section */}
        <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M5%200h1L0%206V5zM6%205v1H5z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
                <AnimatedSection initialState='opacity-0 -translate-x-10' finalState='opacity-100 translate-x-0'>
                    <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-brand-purple to-brand-purple-dark shadow-2xl flex items-center justify-center">
                        <svg className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 text-brand-yellow animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                        </svg>
                    </div>
                </AnimatedSection>
                 <AnimatedSection initialState='opacity-0 translate-x-10' finalState='opacity-100 translate-x-0'>
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-purple mb-3 sm:mb-4">Volunteer</h2>
                        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600">
                           At KIN, we volunteer as covenant servants. A covenant servant is one who has chosen to raise gods at KidsInspiring with their time, energy, resources, and money. Join us today to be part of this covenant mandate.
                        </p>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLScb5JrFmB_l1yHbVG789MmLqaCGFRWTWdm5aRQQhnJGQJ8nAA/viewform" target="_blank" rel="noopener noreferrer" className="mt-6 sm:mt-8 inline-block bg-brand-yellow text-brand-purple-dark font-bold py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg uppercase tracking-wider hover:bg-brand-yellow-dark transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                            Join the team
                        </a>
                    </div>
                </AnimatedSection>
            </div>
        </section>
      </main>
      )}
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

const coreValues = [
    { letter: "G", title: "Grit", description: "Never say Never, the ability to give all it takes" },
    { letter: "O", title: "Obedience", description: "Following the Word no matter the Cost" },
    { letter: "D", title: "Dedication", description: "The audacity to work until Christ is established on Earth in Nations" },
    { letter: "S", title: "Spirit", description: "To live the Spirit-Filled, Spirit-Instructed, Spirit-Led, Spirit-Answering Kind of Life" },
];

const nationBuildingStrategies = [
    "THE KIDSINSPIRING NATION DEVOTIONAL (KIND)",
    "The goDs EXPERIENCE",
    "THE goDs UNIVERSITY",
    "The goD CELLS",
    "THE DANIEL FAST",
    "THE NEHEMIAH FAST",
    "THE PSALM 119 CHALLENGE AND IT'S SCHOOL-LEVEL EXTENSION",
    "THE SEVEN-DECADE COVENANT AND PRAYER WALK REVOLUTION",
    "THE JESUS CHRIST CONCERT"
];

const timeline = [
  { date: "Feb - March 2026", event: "Psalm 119 Awareness" },
  { date: "March - April 2026", event: "Psalm 119 Registration Portal opens" },
  { date: "April - May 2026", event: "Psalm 119 Recitation Uploads" },
  { date: "May - July 2026", event: "Psalm 119 Stage 1 & 2 CBT Tests" },
  { date: "August 2026", event: "Psalm 119 Grand Finalists Announcements" },
  { date: "July & Sept 2026", event: "Psalm 119 Community Impact Project" },
  { date: "Sept & Dec 2026", event: "Psalm 119 Grand Finale Preparation" },
  { date: "Dec 2026", event: "Psalm 119 Grand Finale" },
];

const mysteries = [
    { 
      title: "KIN Monthly Daily Affirmation", 
      description: "Daily declarations are taken by the god-children daily.",
      icon: <AffirmationIcon className="w-12 h-12 text-brand-yellow" /> 
    },
    { 
      title: "KIN Declarations", 
      description: "Scripture birthed content written and taken regularly to inculcate God's word. It is also known as “Faith Released in the Air”.",
      icon: <DeclarationIcon className="w-12 h-12 text-brand-yellow" />
    },
    { 
      title: "Daniel Fast", 
      description: "Held in January for all princes, princesses, gods of KIN. A three day water & vegetables fast with 1 hour prayer every 3 hours.",
      icon: <FastIcon className="w-12 h-12 text-brand-yellow" />
    },
    { 
      title: "KIN Fast", 
      description: "God-children are required to fast on Sundays and at all weekly meetings.",
      icon: <KinFastIcon className="w-12 h-12 text-brand-yellow" />
    },
    { 
      title: "KIN ‘god’ prefix", 
      description: "Each child inducted into KidsInspiring Nation has the prefix ‘god’ in front of their names. This is in reference to their DNA in God.",
      icon: <PrefixIcon className="w-12 h-12 text-brand-yellow" />
    },
    { 
      title: "Always-On-Bible", 
      description: "As gods, they are required to carry the bible everywhere they are and go.",
      icon: <BibleIcon className="w-12 h-12 text-brand-yellow" />
    },
];

const tripodSystems = [
    {
        icon: <WindIcon className="w-12 h-12 text-brand-yellow" />,
        title: "Spirit",
        description: "Hearing the voice of God’s Spirit, Praying in the Spirit, and Knowing the Spirit of Christ as a Friend. It is our core.",
    },
    {
        icon: <JugglingIcon className="w-12 h-12 text-brand-yellow" />,
        title: "Skills",
        description: "There is a gift God has deposited in every god-children. Each god develops their skills until they become icons to their world.",
    },
    {
        icon: <ServiceIcon className="w-12 h-12 text-brand-yellow" />,
        title: "Service",
        description: "Every god is on a covenant to serve God using their Spirit through their skills to solve national & global challenges.",
    }
];

export default App;