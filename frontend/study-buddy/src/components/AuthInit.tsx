'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

export default function AuthInit() {
  const initAuth = useStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return null;
}
