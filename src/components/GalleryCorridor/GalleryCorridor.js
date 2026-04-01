import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ALL_EVENTS_ORDER_1, ALL_EVENTS_ORDER_2, ALL_EVENTS_ORDER_3 } from './allEvents';

const milestones = [
  { year: '1931', img: 'https://placehold.co/600x400/d31145/FFF?text=1931', title: 'Founding', ALL_EVENTS: ALL_EVENTS_ORDER_1 },
  { year: '1955', img: 'https://placehold.co/600x400/22c55e/FFF?text=1955', title: 'Global Growth', ALL_EVENTS: ALL_EVENTS_ORDER_2 },
  { year: '1975', img: 'https://placehold.co/600x400/8b5cf6/FFF?text=1975', title: 'Expansion', ALL_EVENTS: ALL_EVENTS_ORDER_3 },
  { year: '1998', img: 'https://placehold.co/600x400/06b6d4/FFF?text=1998', title: 'Digital Era', ALL_EVENTS: ALL_EVENTS_ORDER_2 },
  { year: '2012', img: 'https://placehold.co/600x400/0ea5e9/FFF?text=2012', title: 'Innovation', ALL_EVENTS: ALL_EVENTS_ORDER_1 },
  { year: '2026', img: 'https://placehold.co/600x400/f59e0b/FFF?text=2026', title: '95 Years', ALL_EVENTS: ALL_EVENTS_ORDER_3 },
];

const PhotoNode = ({ item, index, total }) => {
  const { scrollYProgress } = useScroll();
  
  const start = index / total;
  const end = (index + 1) / total;
  const span = end - start;
  const isLeft = index % 2 === 0;
  
  const xPos = isLeft ? '-140%' : '40%'; 

  const z = useTransform(scrollYProgress, [start, start + span * 0.6], [-4000, 1200]);
  const scale = useTransform(scrollYProgress, [start, start + span * 0.6], [0.8, 1.2]);

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.05, start + (span * 0.55), start + (span * 0.6)],
    [index === 0 ? 1 : 0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        x: xPos,
        y: '-50%',
        z,
        scale,
        rotateY: 0,
        opacity,
        transformStyle: 'preserve-3d',
        width: '420px',
        willChange: 'transform, opacity'
      }}
    >
      <div style={{ 
        background: '#fff', 
        padding: '12px', 
        border: '1px solid #f0f0f0',
        boxShadow: '0 25px 50px rgba(0,0,0,0.08)' 
      }}>
        <img src={item.img} alt={item.year} style={{ width: '100%', display: 'block' }} />
        <div style={{ 
          color: '#111', 
          textAlign: 'center', 
          paddingTop: '16px', 
          fontFamily: 'system-ui, -apple-system, sans-serif' 
        }}>
          <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '800', letterSpacing: '-0.5px' }}>{item.year}</h3>
          <p style={{ margin: '4px 0 0', fontSize: '0.75rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '1px' }}>
            {item.title}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const PhotoWall = ({ index, total, list }) => {
  const { scrollYProgress } = useScroll();
  const start = index / total;
  const end = (index + 1) / total;
  const span = end - start;

  const opacity = useTransform(
    scrollYProgress,
    [start + (span * 0.6), start + (span * 0.65), start + (span * 0.9), start + (span * 0.95)],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [start + (span * 0.6), start + (span * 0.95)],
    [1.05, 0.95]
  );

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '15px',
        padding: '15px',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        opacity,
        scale,
        zIndex: 5,
        pointerEvents: 'none' 
      }}
    >
      {list.map(event => (
        <div 
          key={event.id} 
          style={{ 
            background: '#fff', 
            padding: '10px', 
            border: '1px solid #e5e5e5',
            boxShadow: '0 5px 15px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <img 
              src={event.thumbnail} 
              alt={event.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          <div style={{ 
            paddingTop: '8px', 
            textAlign: 'center', 
            fontSize: '0.6rem', 
            color: '#000000', 
            fontFamily: 'system-ui, sans-serif', 
            textTransform: 'uppercase', 
            letterSpacing: '0.5px' 
          }}>
            {event.title.length > 30 ? event.title.slice(0, 27) + '...' : event.title}
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default function GalleryCorridor() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <div style={{ height: '1200vh', width: '100%' }} />
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        perspective: '1200px',
        transformStyle: 'preserve-3d',
        overflow: 'hidden',
        background: 'radial-gradient(circle at center, #ffffff 0%, #f9f9f9 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none'
      }}>
        
        {milestones.map((item, i) => (
          <React.Fragment key={i}>
            <PhotoNode item={item} index={i} total={milestones.length} />
            <PhotoWall index={i} total={milestones.length} list={item.ALL_EVENTS} />
          </React.Fragment>
        ))}

        <div style={{ 
          color: '#646464', 
          position: 'absolute', 
          bottom: '40px', 
          fontSize: '0.6rem', 
          letterSpacing: '5px',
          fontWeight: '500'
        }}>
          SCROLL
        </div>
      </div>
    </div>
  );
}