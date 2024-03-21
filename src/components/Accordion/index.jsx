import React, { useRef, useEffect } from 'react';
import s from './Accordion.module.css';

const Accordion = ({ className, label, children }) => {
  const dialogRef = useRef(null);

  return (
    <details className={`${s.dialog} ${className ? className : ''}`} ref={dialogRef}>
      <summary>{label}</summary>
      <div className={s.section}>
        {children}
      </div>
    </details>
  );
};

export default Accordion;