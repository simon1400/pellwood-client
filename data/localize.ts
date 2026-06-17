export default (location?: string | string[] | null) => {
  let lang = 'cz';
  let currency = 'Kč';

  if (location === 'en') {
    lang = 'en';
    currency = '€';
  } else {
    lang = 'cz';
    currency = 'Kč';
  }

  return { lang, currency };
}
