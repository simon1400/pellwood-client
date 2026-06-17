import { useEffect, useState } from 'react';

const Loader = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="loader">
      {mounted && <span className="uk-margin-small-right" uk-spinner="ratio: 3"></span>}
    </div>
  )
}

export default Loader
