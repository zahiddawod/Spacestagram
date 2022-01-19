import React, {useState, createContext, useContext} from 'react';
import {Toast, Frame} from '@shopify/polaris';

export const ToastContext = createContext<{
  showToast: (message: string) => void;
}>({
  showToast: () => {},
});

export const useToast: ToastHook = () => {
  return useContext(ToastContext);
};

const ToastContextProvider: React.FC = ({children}) => {
  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastActive((toastActive) => !toastActive);
  };

  return (
    <ToastContext.Provider value={{showToast}}>
      {children}
      {toastActive && (
        <div style={{height: '250px'}}>
          <Frame>
            <Toast
              content={toastMessage}
              onDismiss={() => setToastActive((toastActive) => !toastActive)}
            />
          </Frame>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;
