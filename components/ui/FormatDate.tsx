'use client';

import { useEffect, useState } from 'react';

function FormattedDate({ date }: { date: Date }) {
  const [formatted, setFormatted] = useState('');

  useEffect(() => {
    setFormatted(date.toLocaleDateString());
  }, [date]);

  return <span>{formatted}</span>;
}

export default FormattedDate;
