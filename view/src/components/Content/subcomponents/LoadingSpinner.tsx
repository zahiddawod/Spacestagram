import {forwardRef} from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} className="Center">
    <div className="Spinner">
      {[...Array(12)].map((e: any, i: number) => (
        <div key={'dash' + i}></div>
      ))}
    </div>
  </div>
));

export default LoadingSpinner;
