import React, { useState } from 'react';
import { AnimatedSection } from './AnimatedSection';

interface ProgrammesProps {
  onNavigate?: (page: 'home' | 'about' | 'contact' | 'programmes' | 'gods-university') => void;
}

export const Programmes: React.FC<ProgrammesProps> = ({ onNavigate }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-white">
      {/* Hero Title Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center text-center overflow-hidden pt-32 pb-20 bg-gradient-to-br from-brand-purple-dark via-brand-purple to-brand-purple-dark">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23FDB913%22%20fill-opacity%3D%220.05%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M5%200h1L0%206V5zM6%205v1H5z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        <div className="relative z-10 px-4">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-wide mb-6" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}>
              KIN <span className="text-brand-yellow">Expressions</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">Our Programmes</p>
            <div className="w-32 h-1.5 bg-brand-yellow mx-auto mt-6 animate-pulse"></div>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Programmes Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {programmes.map((programme, index) => (
              <AnimatedSection key={index} delay={index * 50} className={index === programmes.length - 1 ? 'md:col-span-2 md:max-w-2xl md:mx-auto' : ''}>
                <div className="bg-white rounded-2xl border-l-4 border-brand-yellow hover:scale-[1.02] transition-all duration-300 animate-glow-pulse">
                  <button
                    onClick={() => toggleExpand(index)}
                    className="w-full p-6 md:p-8 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex-1">
                      <h3 className="text-xl md:text-3xl font-bold text-brand-purple">{programme.title}</h3>
                    </div>
                    <div className="ml-4">
                      <svg
                        className={`w-6 h-6 text-brand-purple transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      expandedIndex === index ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8">
                      <div className="w-20 h-1 bg-brand-yellow mb-6"></div>
                      <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                        {programme.content.map((paragraph, pIndex) => (
                          <p key={pIndex}>{paragraph}</p>
                        ))}
                        {programme.title === "THE goDs UNIVERSITY" && onNavigate && (
                          <div className="mt-6 text-center">
                            <button 
                              onClick={() => onNavigate('gods-university')}
                              className="inline-block bg-brand-yellow text-brand-purple-dark font-bold py-3 px-8 rounded-full text-base uppercase tracking-wider hover:bg-brand-yellow-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                              Learn More
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const programmes = [
  {
    title: "THE KIDSINSPIRING NATION DEVOTIONAL (KIND)",
    content: [
      "KIND, since its inception in 2021, has delivered daily devotional teachings directly to children's homes through online platforms - Telegram and YouTube (which was re-launched this year). What began as a small initiative has grown remarkably into the similitude of a teaching ministry, reaching hundreds of children this year alone. KidsInspiring Nation is confident that this program will leave a lasting legacy, influencing generations to come with the power of God's Word."
    ]
  },
  {
    title: "goDs EXPERIENCE",
    content: [
      "The goD Experience is a programme that takes the form of a Sunday Service for goDS, by goDs to raise children as goDs."
    ]
  },
  {
    title: "The goD cells",
    content: [
      "The goD cell is the smallest of the programme structure of KIN. It is an initiative to reach more godchildren, by having the goDchildren teach other children around them and in their community what they learn in the various programmes of KIN."
    ]
  },
  {
    title: "THE goDs UNIVERSITY",
    content: [
      "Founded on the following scriptures: Luke 2.52. Judges 7.7, Genesis 14.14, 1 Samuel 23:8, the goDs University is the training arm of the KidsInspiring Nation (KIN). It was founded with an aim: to raise children who build nations and shift Generational paradigms as goDs.",
      "Over the first six years, God gave us unique programmes that intuitively stand apart and have generated immeasurable impact in the lives of children, across nations.",
      "In 2024, the goDs University was launched and these unique programmes were curated into a 7-year pathway and integrated goDs University. This divinely and well-curated pathway would help any child/teenager develop unique spiritual strength, harness and polish untapped skills, and maximise decades of service to God through nation-building."
    ]
  },
  {
    title: "THE DANIEL FAST",
    content: [
      "Inspired by Daniel 1:8-20, which describes the fast undertaken by Daniel, Hananiah, Mishael, and Azariah, the Daniel Fast is an annual spiritual practice. During this fast, the children abstain from regular meals, consuming only fruits and water. They are also given the opportunity to tarry long in prayers. The Daniel Fast is broken into 3 weekends of 48 hour fasts and 15 sessions of an hour long supplication. The fast takes place in January, from Friday to Sunday each week."
    ]
  },
  {
    title: "THE NEHEMIAH FAST",
    content: [
      "Inspired by Nehemiah Chapter One, the Nehemiah Fast is an 18-hour fast during which the children abstain from all food, fruits and water, taking in nothing. This fast is dedicated to interceding for our nation, Nigeria, with prayers offered every hour over the 18-hour period. It is observed whenever elections are held in Nigeria. The next Nehemiah Fast & Prayer would be held in 2027 during Nigeria's election day."
    ]
  },
  {
    title: "THE PSALM 119 CHALLENGE AND IT'S SCHOOL-LEVEL EXTENSION",
    content: [
      "In a bid to further nation building, the KIN launched the Psalm 119 Schools Challenge about three years ago. The challenge encourages schools to motivate their students to engage with Psalm 119 and derive national values from the interpreted meanings of its verses.",
      "Over the years, the Psalm 119 Schools Challenge has experienced significant growth. Starting with a modest initial fund of ₦11,917.60 (Eleven Thousand, Nine Hundred and Seventeen Naira, Sixty Kobo), the 2025 edition awarded over ₦3 million (Three Million Naira) in educational scholarships and prizes. The challenge will continue to be held annually until every school in the nation embraces the national values embedded in the 176 verses of Psalm 119."
    ]
  },
  {
    title: "The Seven-Decade Covenant and Prayer Walk Revolution",
    content: [
      "This is a special and annual program that focuses on nation-building through prayer and action."
    ]
  },
  {
    title: "The Jesus Christ concert",
    content: [
      "Since it's inception eight (8) years ago, this cherished annual event celebrates the true essence of Christmas. The Jesus Christ Concert with a core aim of ensuring that the children see Jesus as Father and Christ during the Christmas Season. It points the children to the personality of Jesus Christ as the main reason for the Season of Christmas.",
      "Another core aim of the event is to reflect on the blessings God has poured out on KIN and everyone connected to our mission."
    ]
  }
];
