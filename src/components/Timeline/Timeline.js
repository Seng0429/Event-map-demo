import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const milestones = [
  { year: '1931', title: 'Planting Roots', desc: 'AIA officially opens its first branch in Singapore.', side: 'left' },
  { year: '1992', title: 'AIA Tower', desc: 'The iconic AIA Tower opens in the heart of Robinson Road.', side: 'right' },
  { year: '2006', title: 'AIA Singapore', desc: 'Celebrating nearly a century of protecting Singaporean families.', side: 'left' },
  { year: '2016', title: 'Cultural Impact', desc: 'Celebrating the cultural impact of AIA in Singapore.', side: 'right' },
  { year: '2020', title: 'Innovation', desc: 'Innovation events', side: 'left' },
  { year: '2026', title: '95 Years Strong', desc: 'Celebrating nearly a century of protecting Singaporean families.', side: 'right' }
];

export default function Timeline() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div style={{ backgroundColor: '#fff', color: '#333', padding: '100px 0' }}>
      <header style={{ textAlign: 'center', marginBottom: '100px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800' }}>Walk With AIA</h1>
        <p>A 95-Year Legacy of Impact</p>
      </header>

      <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
        {/* The Animated Center Line */}
        <motion.div 
          style={{ 
            position: 'absolute', left: '50%', top: 0, bottom: 0, 
            width: '4px', backgroundColor: '#d31145', originY: 0, scaleY 
          }} 
        />

        {milestones.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.side === 'left' ? 'flex-start' : 'flex-end', marginBottom: '150px', width: '100%' }}>
            <motion.div 
              initial={{ opacity: 0, x: m.side === 'left' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ width: '40%', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
            >
              <h2 style={{ color: '#d31145', margin: 0 }}>{m.year}</h2>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}