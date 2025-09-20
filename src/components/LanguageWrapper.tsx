import React from "react";
import { LanguageProvider } from "../contexts/LanguageContext";

interface LanguageWrapperProps {
  children: React.ReactNode;
}

const LanguageWrapper: React.FC<LanguageWrapperProps> = ({ children }) => {
  return <LanguageProvider>{children}</LanguageProvider>;
};

export default LanguageWrapper;
