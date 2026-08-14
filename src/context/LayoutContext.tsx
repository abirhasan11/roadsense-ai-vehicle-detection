import React, { createContext, useContext } from 'react';

export type LayoutMode = 'phoneFrame' | 'wideResponsive';

interface LayoutContextType {
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  isPhoneFrame: boolean;
}

export const LayoutContext = createContext<LayoutContextType>({
  layoutMode: 'wideResponsive',
  setLayoutMode: () => {},
  isPhoneFrame: false,
});

export const useLayout = () => useContext(LayoutContext);
