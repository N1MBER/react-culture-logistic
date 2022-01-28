import { useEffect, useState } from 'react';

type Size = {
  width?: number;
  height?: number;
};

export const useWindowDimensions = () => {
  const [size, setSize] = useState<Size>({});

  useEffect(() => {
    window.addEventListener('resize', () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
  }, []);

  return size;
};
