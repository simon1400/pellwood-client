import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from '@/hooks/useTranslation';

const Head = () => {
  const router = useRouter();
  const { t } = useTranslation();

  let headText = '';
  if (router.pathname === '/basket') {
    headText = t('yourBasket');
  } else if (router.pathname === '/basket/checkout') {
    headText = t('order');
  }

  if (!headText) return null;

  return (
    <div className="tm-basket-head">
      <h1>{headText}</h1>
    </div>
  );
};

export default Head;
