import React from 'react';
import { AnimatedSection } from './AnimatedSection';

export const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Title Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center text-center overflow-hidden pt-32 pb-20 bg-gradient-to-br from-brand-purple-dark via-brand-purple to-brand-purple-dark">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23FDB913%22%20fill-opacity%3D%220.05%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M5%200h1L0%206V5zM6%205v1H5z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        <div className="relative z-10 px-4">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-wide mb-6" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}>
              Our Identity as we <span className="text-brand-yellow">Build Nations</span>
            </h1>
            <div className="w-32 h-1.5 bg-brand-yellow mx-auto animate-pulse"></div>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Vision & Mission */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-brand-yellow/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-brand-purple/10 rounded-full filter blur-3xl"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection delay={100}>
              <div className="bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-2xl shadow-2xl p-8 h-full text-white relative overflow-hidden group hover:-translate-y-2 transition-all duration-300">
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18.5c-4.28-1.04-7-5.35-7-9.5V8.3l7-3.11 7 3.11V11c0 4.15-2.72 8.46-7 9.5z"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <svg className="w-10 h-10 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Vision
                </h3>
                <p className="text-xl leading-relaxed">Raising gods & building nations.</p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <div className="bg-gradient-to-br from-brand-yellow to-yellow-500 rounded-2xl shadow-2xl p-8 h-full text-brand-purple-dark relative overflow-hidden group hover:-translate-y-2 transition-all duration-300">
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Mission
                </h3>
                <p className="text-xl leading-relaxed">To raise god-children who develop their Spirit, discover their Skills and deliver their Nations by selfless service that brings absolute glory to God.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Founding Scripture */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-purple-dark">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-4">Our Founding Scripture</h2>
            <p className="text-center text-gray-300 mb-3 text-lg max-w-4xl mx-auto leading-relaxed">
              Our Founding Scripture is based on <span className="text-brand-yellow font-semibold">3 inner tenets</span> for the child - their Spirit, their Skills, their Service (calling), and <span className="text-brand-yellow font-semibold">2 outer tenets</span> to their world - the Selection & the Signs.
            </p>
            <p className="text-center text-gray-400 mb-12">Daniel 1 verses 4, 8, 17, 20 & 21</p>
          </AnimatedSection>
          
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-brand-yellow/30 -translate-y-1/2 z-0"></div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
              {foundingScriptures.map((scripture, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className="relative">
                    {/* Step Number Circle */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center text-brand-purple font-black text-xl shadow-lg z-20">
                      {index + 1}
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 pt-10 h-full border-2 border-white/20 hover:border-brand-yellow hover:bg-white/15 transition-all duration-300 hover:-translate-y-2">
                      <div className="flex flex-col items-center gap-3 mb-4">
                        <span className="text-xl font-bold text-brand-yellow">{scripture.verse}</span>
                        <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${scripture.type === 'inner' ? 'bg-brand-yellow text-brand-purple' : 'bg-white/30 text-white border-2 border-white'}`}>
                          {scripture.label}
                        </span>
                      </div>
                      <p className="text-gray-200 leading-relaxed text-sm text-center">{scripture.text}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white bg-[url('data:image/svg+xml,%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M5%200h1L0%206V5zM6%205v1H5z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">Our Goals</h2>
              <div className="w-24 h-1 bg-brand-yellow mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Five pillars guiding our mission to raise god-children</p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {goals.map((goal, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="relative bg-white p-8 rounded-2xl h-full shadow-lg hover:shadow-2xl hover:shadow-brand-yellow/40 transition-all duration-300 hover:-translate-y-3 border-2 border-transparent hover:border-brand-yellow group">
                  {/* Number Badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <span className="text-brand-yellow font-black text-xl">{index + 1}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 bg-brand-yellow/10 rounded-full flex items-center justify-center group-hover:bg-brand-yellow/20 transition-colors duration-300">
                      {goalIcons[index]}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed text-center font-medium text-lg">{goal}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">Meet the Team</h2>
              <div className="w-24 h-1 bg-brand-yellow mx-auto"></div>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {team.map((member, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-24 h-24 bg-brand-yellow rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-brand-purple">{member.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-brand-yellow font-semibold mb-2">{member.title}</p>
                  <p className="text-gray-300 text-sm">{member.role}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const foundingScriptures = [
  {
    verse: "Vs 4",
    label: "Selection",
    type: "outer",
    text: "Children in whom is no blemish, but well favored, skillful in knowledge, cunning in wisdom, understanding science, such as have the ability to stand before kings, that understand the tongue & learning of the chaldeans (nations)."
  },
  {
    verse: "Vs 8",
    label: "Spirit",
    type: "inner",
    text: "But Daniel purposed in his heart that he would not defile himself with the portion of the king's meat, nor with the wine which he drank: therefore he requested of the prince of the eunuchs that he might not defile himself."
  },
  {
    verse: "Vs 17",
    label: "Skills",
    type: "inner",
    text: "As for these four children, God gave them knowledge and skill in all learning and wisdom: and Daniel had understanding in all visions and dreams."
  },
  {
    verse: "Vs 20",
    label: "Service",
    type: "inner",
    text: "And in all matters of wisdom and understanding, that the king enquired of them, he found them ten times better than all the magicians and astrologers that were in all his realm."
  },
  {
    verse: "Vs 21",
    label: "Star Signs",
    type: "outer",
    text: "And Daniel continued even unto the first year of king Cyrus."
  }
];

const goals = [
  "Show the reality of our saviour, Jesus Christ to children.",
  "Help children walk with the Spirit of God, all their days.",
  "Help children discover the skills to unleash their talents through God.",
  "Raise children who are examples in their conduct as a model of a new nation.",
  "Deliver nations (Nigeria) by the god-children raised as leaders in their fields."
];

const goalIcons = [
  <svg className="w-8 h-8 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>,
  <svg className="w-8 h-8 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg className="w-8 h-8 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>,
  <svg className="w-8 h-8 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>,
  <svg className="w-8 h-8 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
];

const team = [
  {
    name: "Mrs Titilayo",
    title: "gr TTN - Titilayo",
    role: "Administrator"
  },
  {
    name: "Mr Giwa David",
    title: "grK - Giwa David",
    role: "Technologist"
  }
];
