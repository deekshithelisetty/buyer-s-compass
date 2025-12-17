import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface PincodeContextType {
  pincode: string;
  setPincode: (pincode: string) => void;
}

const PincodeContext = createContext<PincodeContextType | undefined>(undefined);

export function PincodeProvider({ children }: { children: ReactNode }) {
  const [pincode, setPincodeState] = useState("560001");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load pincode from localStorage on mount
  useEffect(() => {
    const savedPincode = localStorage.getItem("pincode");
    if (savedPincode) {
      setPincodeState(savedPincode);
    }
    setIsLoaded(true);
  }, []);

  // Save pincode to localStorage when it changes
  const setPincode = (newPincode: string) => {
    setPincodeState(newPincode);
    localStorage.setItem("pincode", newPincode);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <PincodeContext.Provider value={{ pincode, setPincode }}>
      {children}
    </PincodeContext.Provider>
  );
}

export function usePincode() {
  const context = useContext(PincodeContext);
  if (context === undefined) {
    throw new Error("usePincode must be used within a PincodeProvider");
  }
  return context;
}
