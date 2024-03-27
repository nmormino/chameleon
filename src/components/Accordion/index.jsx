import React, { useRef, useEffect } from 'react';
import s from './Accordion.module.css';
import { ChevronDown } from 'react-feather';

const Accordion = ({ className, label, children, ...rest }) => {
  const dialogRef = useRef(null);

  return (
    <details className={`${s.dialog} ${className ? className : ''}`} ref={dialogRef} {...rest}>
      <summary>
        {label}
        <ChevronDown size={36} />
      </summary>
      <div className={s.section}>
        {children}
      </div>
    </details>
  );
};

export default Accordion;