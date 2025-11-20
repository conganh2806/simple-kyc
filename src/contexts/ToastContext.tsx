import React, { createContext, useContext, useRef } from "react";
import { Toast } from "primereact/toast";
import { ToastStatus, ToastPosition } from "../constants/Toast";
import CustomToast from "../components/CustomToast";

interface ToastContextType {
  showToast: (
    severity: ToastStatus,
    summary: string,
    detail: string,
    life?: number
  ) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const toastRef = useRef<Toast>(null);

  const showToast = (
    severity: ToastStatus,
    summary: string,
    detail: string,
    life = 3000
  ) => {
    toastRef.current?.show({ severity, summary, detail, life });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <CustomToast ref={toastRef} position={ToastPosition.TopRight} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
