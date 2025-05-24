import { createContext, useContext, useState, useEffect } from 'react';

interface BiometricData {
  heartRate: number;
  heartRateStatus: 'normal' | 'warning' | 'critical' | 'inactive';
  hrv: number;
  hrvStatus: 'normal' | 'warning' | 'critical' | 'inactive';
  gsr: number;
  gsrStatus: 'normal' | 'warning' | 'critical' | 'inactive';
  temperature: number;
  temperatureStatus: 'normal' | 'warning' | 'critical' | 'inactive';
}

interface BiometricContextType {
  biometrics: BiometricData;
  isActive: boolean;
  startMonitoring: () => void;
  stopMonitoring: () => void;
}

const initialBiometrics: BiometricData = {
  heartRate: 0,
  heartRateStatus: 'inactive',
  hrv: 0,
  hrvStatus: 'inactive',
  gsr: 0,
  gsrStatus: 'inactive',
  temperature: 0,
  temperatureStatus: 'inactive',
};

const BiometricContext = createContext<BiometricContextType>({
  biometrics: initialBiometrics,
  isActive: false,
  startMonitoring: () => {},
  stopMonitoring: () => {},
});

export const useBiometrics = () => useContext(BiometricContext);

interface BiometricProviderProps {
  children: React.ReactNode;
}

export function BiometricProvider({ children }: BiometricProviderProps) {
  const [biometrics, setBiometrics] = useState<BiometricData>(initialBiometrics);
  const [isActive, setIsActive] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  
  const getRandomHeartRate = () => {
    // Normal: 60-100, Warning: 50-60 or 100-120, Critical: <50 or >120
    const random = Math.random();
    if (random < 0.7) {
      return { value: Math.floor(60 + Math.random() * 40), status: 'normal' as const };
    } else if (random < 0.9) {
      return Math.random() < 0.5
        ? { value: Math.floor(50 + Math.random() * 10), status: 'warning' as const }
        : { value: Math.floor(100 + Math.random() * 20), status: 'warning' as const };
    } else {
      return Math.random() < 0.5
        ? { value: Math.floor(30 + Math.random() * 20), status: 'critical' as const }
        : { value: Math.floor(120 + Math.random() * 30), status: 'critical' as const };
    }
  };
  
  const getRandomHRV = () => {
    // Normal: 20-60, Warning: 10-20 or 60-80, Critical: <10 or >80
    const random = Math.random();
    if (random < 0.7) {
      return { value: Math.floor(20 + Math.random() * 40), status: 'normal' as const };
    } else if (random < 0.9) {
      return Math.random() < 0.5
        ? { value: Math.floor(10 + Math.random() * 10), status: 'warning' as const }
        : { value: Math.floor(60 + Math.random() * 20), status: 'warning' as const };
    } else {
      return Math.random() < 0.5
        ? { value: Math.floor(Math.random() * 10), status: 'critical' as const }
        : { value: Math.floor(80 + Math.random() * 20), status: 'critical' as const };
    }
  };
  
  const getRandomGSR = () => {
    // Normal: 2-20, Warning: 0.5-2 or 20-25, Critical: <0.5 or >25
    const random = Math.random();
    if (random < 0.7) {
      return { value: 2 + Math.random() * 18, status: 'normal' as const };
    } else if (random < 0.9) {
      return Math.random() < 0.5
        ? { value: 0.5 + Math.random() * 1.5, status: 'warning' as const }
        : { value: 20 + Math.random() * 5, status: 'warning' as const };
    } else {
      return Math.random() < 0.5
        ? { value: Math.random() * 0.5, status: 'critical' as const }
        : { value: 25 + Math.random() * 5, status: 'critical' as const };
    }
  };
  
  const getRandomTemperature = () => {
    // Normal: 36.1-37.2, Warning: 35-36.1 or 37.2-38, Critical: <35 or >38
    const random = Math.random();
    if (random < 0.7) {
      return { value: 36.1 + Math.random() * 1.1, status: 'normal' as const };
    } else if (random < 0.9) {
      return Math.random() < 0.5
        ? { value: 35 + Math.random() * 1.1, status: 'warning' as const }
        : { value: 37.2 + Math.random() * 0.8, status: 'warning' as const };
    } else {
      return Math.random() < 0.5
        ? { value: 34 + Math.random() * 1, status: 'critical' as const }
        : { value: 38 + Math.random() * 1, status: 'critical' as const };
    }
  };
  
  const updateBiometrics = () => {
    const heartRateData = getRandomHeartRate();
    const hrvData = getRandomHRV();
    const gsrData = getRandomGSR();
    const temperatureData = getRandomTemperature();
    
    setBiometrics({
      heartRate: heartRateData.value,
      heartRateStatus: heartRateData.status,
      hrv: hrvData.value,
      hrvStatus: hrvData.status,
      gsr: parseFloat(gsrData.value.toFixed(1)),
      gsrStatus: gsrData.status,
      temperature: parseFloat(temperatureData.value.toFixed(1)),
      temperatureStatus: temperatureData.status,
    });
  };
  
  const startMonitoring = () => {
    if (isActive) return;
    
    setIsActive(true);
    updateBiometrics();
    
    const id = setInterval(updateBiometrics, 3000);
    setIntervalId(id);
  };
  
  const stopMonitoring = () => {
    if (!isActive) return;
    
    setIsActive(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    
    setBiometrics(initialBiometrics);
  };
  
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);
  
  return (
    <BiometricContext.Provider value={{ biometrics, isActive, startMonitoring, stopMonitoring }}>
      {children}
    </BiometricContext.Provider>
  );
}