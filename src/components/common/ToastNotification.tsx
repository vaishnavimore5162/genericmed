import React, { useEffect } from 'react';

interface ToastNotificationProps {
  message: string | null;
  onClose: () => void;
  icon?: string;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ message, onClose, icon = 'check_circle' }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 transform translate-y-0 opacity-100 max-w-[90vw]">
      <div className="bg-[#213145] text-[#eaf1ff] px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-[#86f2e4]/30">
        <span className="material-symbols-outlined text-[18px] text-[#89f5e7]">{icon}</span>
        <span className="font-body-sm text-[13px] font-medium truncate">{message}</span>
      </div>
    </div>
  );
};
