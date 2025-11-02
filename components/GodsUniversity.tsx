import React from 'react';
import { AnimatedSection } from './AnimatedSection';

export const GodsUniversity: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center text-center overflow-hidden pt-32 pb-20 bg-gradient-to-br from-brand-purple-dark via-brand-purple to-brand-purple-dark">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23FDB913%22%20fill-opacity%3D%220.05%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M5%200h1L0%206V5zM6%205v1H5z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        <div className="relative z-10 px-4">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-wide mb-6" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}>
              <span className="lowercase">go</span>D'<span className="lowercase">s</span> <span className="text-brand-yellow">University</span> (<span className="lowercase text-white">g</span><span className="text-brand-yellow">U</span>)
            </h1>
            <p className="text-2xl md:text-3xl text-gray-200 font-semibold mb-4">In Spirit | by Skills | For Service</p>
            <div className="w-32 h-1.5 bg-brand-yellow mx-auto mt-6 animate-pulse"></div>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection delay={100}>
              <div className="bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-2xl shadow-2xl p-8 h-full text-white">
                <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <svg className="w-10 h-10 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Vision
                </h3>
                <p className="text-xl leading-relaxed">To raise goDs, - in Spirit, by Skills, for Service, - for Kingdom Advancement through Nation Building.</p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <div className="bg-gradient-to-br from-brand-yellow to-yellow-500 rounded-2xl shadow-2xl p-8 h-full text-brand-purple-dark">
                <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Mission
                </h3>
                <p className="text-xl leading-relaxed">Raising children who develop their Spirit, discover their skills and deliver their generation in service as goDs.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Pathways */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-bold text-center text-brand-purple mb-4">goDs University Pathways: Spirit</h2>
            <div className="w-24 h-1 bg-brand-yellow mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto mb-12">
              The pathways of the goDs University have been crafted with our experience over the years, leading various goD-Children at the KidsInspiring Nation towards Spiritual growth among others. These pathways would also be led by qualified instructors, teachers & coaches who are a testament of tracked Spiritual Growth and a certainty of truth that children can do the impossible in Christ. We wait in joyous celebration as we celebrate all of the goD-Children who enroll and complete their tracks at the goDs University.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
            {pathways.map((pathway, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-brand-yellow">
                  <h3 className="text-xl font-bold text-brand-purple mb-2">{pathway}</h3>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-bold text-center text-brand-purple mb-4">goDs University 2026 - Academic Session</h2>
            <p className="text-2xl text-center text-gray-600 mb-12">Courses Offered</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-brand-yellow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-brand-purple text-brand-yellow font-black text-xl px-4 py-2 rounded-lg">{course.code}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-brand-purple">{course.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">Duration: {course.duration}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{course.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* goD Points */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-purple-dark text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">goD Points Average (gPA)</h2>
            <div className="w-24 h-1 bg-brand-yellow mx-auto mb-12"></div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedSection delay={100}>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-brand-yellow mb-6">What are goD Points?</h3>
                <p className="text-lg leading-relaxed mb-6">
                  At the gU, we run an incentive-based system which is a measure of growth, called the goD Points - gP. The goD Points help to measure growth across Behavioral, Character & Spiritual areas for every goD-Child.
                </p>
                <p className="text-lg leading-relaxed">
                  The goD Points are administered by the gU, but can be awarded by the Spirit-Filled Parents, Coaches or goDs-Support or any other nominated body by the goDs University.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-brand-yellow mb-6">Earn goD Points For:</h3>
                <ul className="space-y-3">
                  {godPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-brand-yellow flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-lg">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={300}>
            <div className="mt-12 bg-brand-yellow text-brand-purple-dark rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">The Currency Value of the goD Points</h3>
              <p className="text-lg leading-relaxed">
                The cumulative of the goD Points attained by every enrolled goD-Child can be used to obtain discounts, products, and partake of unique experiences at the KidsInspiring Nation.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why goDs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-bold text-center text-brand-purple mb-12">Why we call them goDs?</h2>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-t-4 border-brand-yellow mb-8">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                We did not call them goDs, He, the God of the universe called them so. <span className="text-brand-purple font-semibold">Psalm 82:6</span>
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                When Yahweh sent Prophet Moses to rescue His people from another nation, Yahweh called Him a goD to the King. <span className="text-brand-purple font-semibold">Exodus 7:1</span>
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Politician Daniel, who served for decades by the breath of God, was said to have had the Spirit of the holy gods. <span className="text-brand-purple font-semibold">Daniel 5:2</span>
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                Apostle Paul, after teaching a group of people from greek cities, performing signs & miracles, was referred to as a goD. <span className="text-brand-purple font-semibold">Acts 12:32</span>
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-2xl shadow-2xl p-8 md:p-12 text-white text-center">
              <p className="text-2xl font-bold leading-relaxed mb-4">
                The child of an eagle is not a duck.<br/>
                The child of a dog, is not a rat;<br/>
                The child of a lion is not a puppy;<br/>
                The child of a cow is not a chick;
              </p>
              <p className="text-2xl font-bold text-brand-yellow leading-relaxed">
                Why should the child of God be called an animal?<br/>
                Ye are goDs - children of the Most High.
              </p>
              <p className="text-xl mt-6 leading-relaxed">
                We therefore call them goDs - sons and daughters of their Father, God.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

const pathways = [
  "Psalm 119 Values Memorization - P119",
  "Fasting & Praying in the Spirit - F&P",
  "Word Challenge - Wc (OT+NT)"
];

const courses = [
  {
    code: "F & P",
    title: "Fasting & Prayers in the Spirit",
    duration: "44 weeks",
    description: "A 44-week module that challenges enrollees to maintain a daily minimum of an hour, Praying in the Spirit, and a 24-hour weekly Fasting regimen."
  },
  {
    code: "WC - OT",
    title: "Word Challenge - Old Testament",
    duration: "44 weeks",
    description: "Enrollees go through 748 chapters of the old testament, reading, studying, memorizing and meditating on the historical, doctrinal and prophetic relationship of God towards His people."
  },
  {
    code: "P119",
    title: "Psalm 119 Values Memorization",
    duration: "44 weeks",
    description: "This pathway takes enrollees on a journey towards memorizing, meditating & manifesting God's Word."
  },
  {
    code: "WC - NT",
    title: "Word Challenge - New Testament",
    duration: "44 weeks",
    description: "Enrollees go through 441 chapters which comprises the New Testament, Psalm & Proverbs. Enrollees would be required to share a teaching on a weekly basis from their study of the Word."
  }
];

const godPoints = [
  "Studying God's Word Daily",
  "Memorizing God's Word Daily",
  "Praying in the Holy Spirit",
  "Attendance at KIN Daily Devotional (KIND)",
  "Exceptional Acts of Academic Performance",
  "Exceptional Acts of Service",
  "Exceptional Acts of Skill Development",
  "Exceptional Acts of Spiritual Growth"
];
