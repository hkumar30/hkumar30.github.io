import { useState, useEffect } from 'react';
import './NameAnimation.css';

export default function NameAnimation({ onComplete }) {
  const [phase, setPhase] = useState('hidden');

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('hk-name-animated');
    if (hasPlayed) {
      setPhase('done');
      onComplete?.();
      return;
    }

    const t1 = setTimeout(() => setPhase('writing'), 200);
    const t2 = setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem('hk-name-animated', '1');
      onComplete?.();
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <h1 className={`name-animation ${phase}`}>
      <span className="name-text">Harsh Kumar</span>
    </h1>
  );
}
