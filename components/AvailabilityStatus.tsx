'use client';

import { useMemo } from 'react';
import { profile } from '@/data/profile';

export default function AvailabilityStatus() {
  const monthYear = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
      }).format(new Date()),
    [],
  );

  return (
    <p className="contact-availability section-label">
      {profile.availabilityLabelPrefix} {monthYear}
    </p>
  );
}
