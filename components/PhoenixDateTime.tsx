'use client';

import { useEffect, useMemo, useState } from 'react';

const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Los_Angeles',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const TIME_FORMATTER = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Los_Angeles',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
  timeZoneName: 'short',
});

export default function PhoenixDateTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const interval = window.setInterval(update, 30000);
    return () => window.clearInterval(interval);
  }, []);

  const values = useMemo(() => {
    if (!now) {
      return { date: '--', time: '--' };
    }

    return {
      date: DATE_FORMATTER.format(now).toUpperCase(),
      time: TIME_FORMATTER.format(now).toUpperCase(),
    };
  }, [now]);

  return (
    <>
      <span className="home-hero-date">{values.date}</span>
      <span className="home-hero-time">{values.time}</span>
    </>
  );
}
