import { createContext, useContext, useState, useEffect, useRef } from 'react';

interface DriveStatus {
  isDriving: boolean;
  startTime: Date | null;
  duration: string;
}

interface DriveContextType {
  isDriving: boolean;
  driveStatus: DriveStatus;
  startDrive: () => void;
  stopDrive: () => void;
}

const initialDriveStatus: DriveStatus = {
  isDriving: false,
  startTime: null,
  duration: '00:00:00',
};

const DriveContext = createContext<DriveContextType>({
  isDriving: false,
  driveStatus: initialDriveStatus,
  startDrive: () => {},
  stopDrive: () => {},
});

export const useDrive = () => useContext(DriveContext);

interface DriveProviderProps {
  children: React.ReactNode;
}

export function DriveProvider({ children }: DriveProviderProps) {
  const [driveStatus, setDriveStatus] = useState<DriveStatus>(initialDriveStatus);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');
  };
  
  const updateDuration = () => {
    if (!driveStatus.startTime) return;
    
    const now = new Date();
    const diff = Math.floor((now.getTime() - driveStatus.startTime.getTime()) / 1000);
    
    setDriveStatus(prev => ({
      ...prev,
      duration: formatDuration(diff),
    }));
  };
  
  const startDrive = () => {
    if (driveStatus.isDriving) return;
    
    const startTime = new Date();
    setDriveStatus({
      isDriving: true,
      startTime,
      duration: '00:00:00',
    });
    
    timerRef.current = setInterval(updateDuration, 1000);
  };
  
  const stopDrive = () => {
    if (!driveStatus.isDriving) return;
    
    setDriveStatus(prev => ({
      isDriving: false,
      startTime: null,
      duration: prev.duration,
    }));
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  return (
    <DriveContext.Provider value={{ 
      isDriving: driveStatus.isDriving, 
      driveStatus, 
      startDrive, 
      stopDrive 
    }}>
      {children}
    </DriveContext.Provider>
  );
}