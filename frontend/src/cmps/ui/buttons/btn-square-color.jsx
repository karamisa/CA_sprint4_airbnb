import { useEffect, useRef } from 'react';
import classes from './btn-square-color.module.css';

export function BtnSquareColor({ children, ...props }) {
  /*   button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = ((e.clientX - rect.left) * 100) / button.clientWidth;
    const y = ((e.clientY - rect.top) * 100) / button.clientHeight;
    button.style.setProperty('--mouse-x', x);
    button.style.setProperty('--mouse-y', y);
  });
 */
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (ev) => {
      const rect = buttonRef.current.getBoundingClientRect();
      const x =
        ((ev.clientX - rect.left) * 100) / buttonRef.current.clientWidth;
      const y =
        ((ev.clientY - rect.top) * 100) / buttonRef.current.clientHeight;

      buttonRef.current.style.setProperty('--mouse-x', x);
      buttonRef.current.style.setProperty('--mouse-y', y);
    };
    buttonRef.current.addEventListener('mousemove', handleMouseMove);

    return () => {
      buttonRef.current.removeEventListener('mousemove', handleMouseMove);
    };
  }, [buttonRef]);

  return (
    <button ref={buttonRef} {...props} className={classes.btnSquareColor}>
      {children}
    </button>
  );
}
