import { useRouter } from 'next/router';
import localize from '@/data/localize';
import translate from '@/data/staticTranslate';

export const useTranslation = () => {
  const router = useRouter();
  const { lang, currency } = localize(router.locale);

  // Helper to cleanly grab translations 
  const t = (key: keyof typeof translate) => {
    const languageKey = lang as 'cz' | 'en' | 'de';
    // Fallback to English if the translation doesn't exist for the current language
    return translate[key]?.[languageKey] || translate[key]?.['en'] || '';
  };

  return { t, lang, currency };
};
