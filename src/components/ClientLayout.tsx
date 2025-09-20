import React from "react";
import { LanguageProvider } from "../contexts/LanguageContext";
import Layout from "./Layout";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <Layout>{children}</Layout>
    </LanguageProvider>
  );
};

export default ClientLayout;
