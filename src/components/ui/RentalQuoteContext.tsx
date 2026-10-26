"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { WhatsAppModal, DEFAULT_WHATSAPP_MESSAGE } from "./WhatsAppModal";

interface RentalQuoteContextType {
  openQuoteModal: (customMessage?: string, customTitle?: string) => void;
  closeQuoteModal: () => void;
  isModalOpen: boolean;
}

const RentalQuoteContext = createContext<RentalQuoteContextType>({
  openQuoteModal: () => {},
  closeQuoteModal: () => {},
  isModalOpen: false,
});

export function RentalQuoteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(DEFAULT_WHATSAPP_MESSAGE);
  const [title, setTitle] = useState("Chat with Citizen Construction Rentals");

  const openQuoteModal = useCallback((customMessage?: string, customTitle?: string) => {
    setMessage(customMessage || DEFAULT_WHATSAPP_MESSAGE);
    setTitle(customTitle || "Chat with Citizen Construction Rentals");
    setIsOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <RentalQuoteContext.Provider value={{ openQuoteModal, closeQuoteModal, isModalOpen: isOpen }}>
      {children}
      <WhatsAppModal
        isOpen={isOpen}
        onClose={closeQuoteModal}
        message={message}
        title={title}
      />
    </RentalQuoteContext.Provider>
  );
}

export function useRentalQuote() {
  return useContext(RentalQuoteContext);
}
