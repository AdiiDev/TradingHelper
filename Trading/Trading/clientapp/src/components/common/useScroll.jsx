import { useRef } from 'react'

const useScroll = () => {
  const elRef = useRef(null);
  const executeScroll = () => elRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });

  return [executeScroll, elRef];
};

export default useScroll