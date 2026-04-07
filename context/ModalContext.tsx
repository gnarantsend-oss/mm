import React, { createContext, useState } from 'react';
import { Media } from '../types';

interface ModalContextType {
  isModal: boolean;
  setIsModal: (value: boolean) => void;
  modalData: Media;
  setModalData: (data: Media) => void;
}

const defaultMedia: Media = {
  id: 0,
  title: '',
  overview: '',
  poster: '',
  banner: '',
  rating: 0,
  genre: [],
  bunnyEmbedUrl: '',
  tags: []
};

export const ModalContext = createContext<ModalContextType>({
  isModal: false,
  setIsModal: () => {},
  modalData: defaultMedia,
  setModalData: () => {}
});

export function ModalContextProvider({ children }: { children: React.ReactNode }) {
  const [isModal, setIsModal] = useState(false);
  const [modalData, setModalData] = useState<Media>(defaultMedia);

  return (
    <ModalContext.Provider value={{ isModal, setIsModal, modalData, setModalData }}>
      {children}
    </ModalContext.Provider>
  );
}
