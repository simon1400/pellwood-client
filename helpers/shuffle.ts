export const shuffle = <T,>(array: T[], count?: number): T[] => {
  if (!Array.isArray(array)) return [];
  
  // Create a shallow clone to avoid mutating the original source array
  const shuffled = [...array];
  
  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // If count is provided, return only the requested number of elements
  if (count !== undefined && count > 0) {
    return shuffled.slice(0, count);
  }
  
  return shuffled;
};

export default shuffle;
