export default (location) => {
  var lang = 'cz',
      currency = 'Kč'
  if(window.location.pathname.split('/')[1] === 'en'){
    lang = 'en';
    currency = '€';
  }else if(window.location.pathname.split('/')[1] === 'de'){
    lang = 'de';
    currency = '&euro;';
  }else{
    lang = 'cz';
    currency = 'Kč';
  }

  return {lang, currency}
}
