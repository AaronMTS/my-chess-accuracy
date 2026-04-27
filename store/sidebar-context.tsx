"use client";

import { createContext, useContext, useState } from "react";

type SidebarContextType = {
  isShown: boolean;
  toggle: (newValue: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export default function SidebarContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isShown, setIsShown] = useState(false);

  function toggle(newValue: boolean) {
    setIsShown((prevValue) => (prevValue !== newValue ? newValue : prevValue));
  }

  const ctxValue = { isShown, toggle };

  return (
    <SidebarContext.Provider value={ctxValue}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within SidebarContextProvider");
  }

  return context;
}
