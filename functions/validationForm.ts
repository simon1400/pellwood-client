export const validateName = (name: string): boolean => {
  // Uses modern Unicode \p{L} to seamlessly match any letter (including accents)
  const regex = /^[\p{L}\s,.'-]+$/u;
  return regex.test(name || '');
};

export const validationEmail = (email: string): boolean => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validationPhone = (phone: string): boolean => {
  // Removed buggy /g flag
  const re = /^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
  return re.test(phone || '');
};

export const validationAddress = (address: string): boolean => {
  // Added Unicode support for Czech street names, removed buggy /g flag, added dot for abbreviations
  const re = /^[\p{L}0-9\s,.'-]*$/u;
  return re.test(address || '');
};

type FormState = Record<string, any>;
type FormErrors = Record<string, any>;

const validationForm = (
  type: string,
  state: FormState,
  error: FormErrors,
  setError: (errors: FormErrors) => void
): boolean => {
  let isInvalid = false;
  const value = state[type] || '';

  if (type === 'email') {
    isInvalid = !validationEmail(value);
  } else if (type === 'name' || type === 'surname' || type === 'city') {
    isInvalid = !validateName(value);
  } else if (type === 'phone') {
    isInvalid = !validationPhone(value);
  } else if (type === 'address') {
    isInvalid = !validationAddress(value);
  }

  if (isInvalid) {
    setError({ ...error, [type]: true });
    return true; // true means "has error"
  }

  return false;
};

export default validationForm;
