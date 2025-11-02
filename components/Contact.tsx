import React from 'react';
import { AnimatedSection } from './AnimatedSection';

export const Contact: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center text-center overflow-hidden pt-32 pb-20 bg-gradient-to-br from-brand-purple-dark via-brand-purple to-brand-purple-dark">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23FDB913%22%20fill-opacity%3D%220.05%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M5%200h1L0%206V5zM6%205v1H5z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        <div className="relative z-10 px-4">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-wide mb-6" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}>
              Reach Out to <span className="text-brand-yellow">Us</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Be part of this movement to raise gods and build nations
            </p>
            <div className="w-32 h-1.5 bg-brand-yellow mx-auto mt-6 animate-pulse"></div>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Contact Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Email Card */}
            <AnimatedSection delay={100}>
              <div className="bg-white rounded-2xl shadow-xl p-8 h-full border-t-4 border-brand-yellow hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-brand-purple mb-4 text-center">Email Us</h3>
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  For enquiries and better information, please send us an email
                </p>
                <a href="mailto:kidsinspiringnation@gmail.com" className="block text-center text-brand-purple font-semibold hover:text-brand-yellow transition-colors duration-300 break-all">
                  kidsinspiringnation@gmail.com
                </a>
              </div>
            </AnimatedSection>

            {/* Phone Card */}
            <AnimatedSection delay={200}>
              <div className="bg-white rounded-2xl shadow-xl p-8 h-full border-t-4 border-brand-yellow hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-brand-purple mb-4 text-center">Call Us</h3>
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  If you prefer to speak with someone directly, feel free to call us
                </p>
                <a href="tel:+2348122673417" className="block text-center text-brand-purple font-semibold text-xl hover:text-brand-yellow transition-colors duration-300">
                  +234 812 267 3417
                </a>
              </div>
            </AnimatedSection>

            {/* Location Card */}
            <AnimatedSection delay={300}>
              <div className="bg-white rounded-2xl shadow-xl p-8 h-full border-t-4 border-brand-yellow hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-brand-purple mb-4 text-center">Visit Us</h3>
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  You can also visit our office through the address below
                </p>
                <address className="not-italic text-center text-brand-purple font-semibold leading-relaxed">
                  goDsHub 0.1, Oremetta, Ota 11226, Ogun State
                </address>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-brand-purple-dark to-brand-purple relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-brand-yellow rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-brand-yellow rounded-full filter blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Join the Movement?
            </h2>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Whether you want to volunteer, partner with us, or learn more about our programs, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:kidsinspiringnation@gmail.com" className="bg-brand-yellow text-brand-purple-dark font-bold py-4 px-8 rounded-full text-lg uppercase tracking-wider hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-xl">
                Send us an Email
              </a>
              <a href="tel:+2348122673417" className="bg-white/10 backdrop-blur-sm text-white border-2 border-white font-bold py-4 px-8 rounded-full text-lg uppercase tracking-wider hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                Call us Now
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};
