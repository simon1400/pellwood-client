export default (location) => {

  var lang = 'cz',
      currency = 'Kč'
  if(location === 'en'){
    lang = 'en';
    currency = '€';
  }else{
    lang = 'cz';
    currency = 'Kč';
  }

  return {lang, currency}
}
