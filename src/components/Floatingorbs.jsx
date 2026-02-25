import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';

export default function MarketingBackground() {
  return (
    <div style={{ 
      position: 'absolute', 
      inset: 0, 
      overflow: 'hidden', 
      zIndex: 0 
    }}>
      <Suspense fallback={<div style={{ width: '100%', height: '100%', background: '#33174A' }} />}>
        <Spline
        scene="https://prod.spline.design/QVEG4DQ-IrD3RObA/scene.splinecode" 
        style={{ width: '100%', height: '100%' }}
        />
      </Suspense>
      
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, transparent 50%, rgba(51,23,74,0.8) 100%)',
        pointerEvents: 'none',
        zIndex: 1
      }} />
    </div>
  );
}