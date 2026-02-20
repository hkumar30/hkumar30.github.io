import { useState, useEffect, useRef } from 'react';
import './TitleCycle.css';

const TITLES = ['Cloud Developer', 'Fullstack Developer', 'C++ Developer'];
const WRITE_DURATION = 900;
const PAUSE_AFTER_WRITE = 700;
const SCRIBBLE_DURATION = 500;
const PAUSE_AFTER_SCRIBBLE = 300;
const UNSCRATCH_DELAY = 600;

export default function TitleCycle({ active }) {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState('');
  const [showCurrentScribble, setShowCurrentScribble] = useState(false);
  const [phase, setPhase] = useState('idle');
  const timerRef = useRef(null);
  const idxRef = useRef(0);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    if (!active) return undefined;

    const hasPlayed = sessionStorage.getItem('hk-titles-animated');
    if (hasPlayed) {
      setLines(TITLES.map((t, i) => ({ text: t, id: i })));
      setCurrentLine('');
      setShowCurrentScribble(false);
      setPhase('revealed');
      return undefined;
    }

    let mounted = true;

    const runStep = () => {
      if (!mounted) return;
      const idx = idxRef.current;

      if (idx >= TITLES.length) {
        setCurrentLine('');
        setShowCurrentScribble(false);
        // Brief pause then unscratch all
        timerRef.current = setTimeout(() => {
          if (!mounted) return;
          setPhase('revealed');
          sessionStorage.setItem('hk-titles-animated', '1');
        }, UNSCRATCH_DELAY);
        return;
      }

      const text = TITLES[idx];
      setCurrentLine(text);
      setShowCurrentScribble(false);
      setPhase('writing');

      timerRef.current = setTimeout(() => {
        setPhase('pause');
        timerRef.current = setTimeout(() => {
          setPhase('scribble');
          setShowCurrentScribble(true);
          timerRef.current = setTimeout(() => {
            setLines((prev) => [...prev, { text, id: idx }]);
            setCurrentLine('');
            setShowCurrentScribble(false);
            idxRef.current += 1;
            timerRef.current = setTimeout(runStep, PAUSE_AFTER_SCRIBBLE);
          }, SCRIBBLE_DURATION);
        }, PAUSE_AFTER_WRITE);
      }, WRITE_DURATION);
    };

    idxRef.current = 0;
    setLines([]);
    setPhase('writing');
    timerRef.current = setTimeout(runStep, 350);

    return () => {
      mounted = false;
      clearTimer();
    };
  }, [active]);

  const isRevealed = phase === 'revealed';

  return (
    <div className="title-cycle" aria-label="Developer titles">
      {lines.map((line) => (
        <div
          key={line.id}
          className={`title-line ${isRevealed ? 'revealed' : 'struck'}`}
        >
          <span className={`title-text ${isRevealed ? 'revealed-text' : ''}`}>
            {line.text}
          </span>
          {!isRevealed && (
            <svg className="scribble-svg" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
              <path
                className="scribble-path"
                d="M0,6 C20,2 40,10 60,5 C80,1 100,11 120,4 C140,9 160,2 180,7 C190,4 200,6 200,6"
                fill="none"
                stroke="var(--red-pen)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      ))}

      {currentLine && (
        <div className={`title-line current ${phase === 'writing' ? 'writing' : ''}`}>
          <span className="title-text">{currentLine}</span>
          {showCurrentScribble && (
            <svg className="scribble-svg animating" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
              <path
                className="scribble-path"
                d="M0,6 C20,2 40,10 60,5 C80,1 100,11 120,4 C140,9 160,2 180,7 C190,4 200,6 200,6"
                fill="none"
                stroke="var(--red-pen)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      )}
    </div>
  );
}
