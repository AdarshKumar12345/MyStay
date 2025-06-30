'use client';

import React, { Suspense } from 'react';
import SearchModalContent from './SearchModalContent';

export default function SearchModal(props) {
  return (
    <Suspense fallback={null}>
      <SearchModalContent {...props} />
    </Suspense>
  );
}
