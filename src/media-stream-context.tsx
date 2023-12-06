import React, { createContext, useState, useContext, ReactNode } from 'react';

type MediaStreamContextType = {
  mediaStream: MediaStream | null;
  setMediaStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
};

const MediaStreamContext = createContext<MediaStreamContextType | null>(null);

interface WebcamProviderProps {
  children: ReactNode;
}

export const useMediaStream = () => {
  const context = useContext(MediaStreamContext);
  if (!context) {
    throw new Error("useMediaStream must be used within a MediaStreamProvider");
  }
  return context;
};

export const MediaStreamProvider: React.FC<WebcamProviderProps> = ({ children }) => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  return (
    <MediaStreamContext.Provider value={{ mediaStream, setMediaStream }}>
      {children}
    </MediaStreamContext.Provider>
  );
};
