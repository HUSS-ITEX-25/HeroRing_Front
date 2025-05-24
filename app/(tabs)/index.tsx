import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bell, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import HeaderBar from '@/components/HeaderBar';
import BiometricCard from '@/components/BiometricCard';
import DriveStatusCard from '@/components/DriveStatusCard';
import AlertCard from '@/components/AlertCard';
import BottomSheet from '@/components/BottomSheet';
import { useBiometrics } from '@/contexts/BiometricContext';
import { useDrive } from '@/contexts/DriveContext';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { biometrics, startMonitoring, stopMonitoring, isActive } = useBiometrics();
  const { driveStatus, startDrive, stopDrive, isDriving } = useDrive();
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'drowsiness' | 'health' | null>(null);
  const [showSheet, setShowSheet] = useState(false);
  
  const alertOpacity = useSharedValue(0);
  const alertScale = useSharedValue(0.95);
  
  const handleDismissAlert = () => {
    setShowAlert(false);
  };

  const handleSimulateAlert = (type: 'drowsiness' | 'health') => {
    setAlertType(type);
    setShowAlert(true);
    alertScale.value = withSpring(1);
    alertOpacity.value = withSpring(1);
  };

  const handleToggleDrive = () => {
    if (isDriving) {
      stopDrive();
      stopMonitoring();
    } else {
      startDrive();
      startMonitoring();
      // Simulate drowsiness alert after 8 seconds
      setTimeout(() => {
        handleSimulateAlert('drowsiness');
      }, 8000);
      
      // Simulate health alert after 15 seconds
      setTimeout(() => {
        handleSimulateAlert('health');
      }, 15000);
    }
  };

  const alertCardStyle = useAnimatedStyle(() => {
    return {
      opacity: alertOpacity.value,
      transform: [{ scale: alertScale.value }],
    };
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <HeaderBar title="Drive Monitor" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <DriveStatusCard 
          isDriving={isDriving}
          duration={driveStatus.duration}
          onToggle={handleToggleDrive}
        />
        
        <View style={styles.biometricsContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Real-time Biometrics</Text>
          <View style={styles.biometricsGrid}>
            <BiometricCard 
              title="Heart Rate"
              value={biometrics.heartRate}
              unit="BPM"
              status={biometrics.heartRateStatus}
              iconName="heart"
            />
            <BiometricCard 
              title="HRV"
              value={biometrics.hrv}
              unit="ms"
              status={biometrics.hrvStatus}
              iconName="activity"
            />
            <BiometricCard 
              title="GSR"
              value={biometrics.gsr}
              unit="μS"
              status={biometrics.gsrStatus}
              iconName="zap"
            />
            <BiometricCard 
              title="Temperature"
              value={biometrics.temperature}
              unit="°C"
              status={biometrics.temperatureStatus}
              iconName="thermometer"
            />
          </View>
        </View>
        
        <View style={styles.simulateContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Simulation Controls</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.simulateButton, { backgroundColor: colors.warning }]} 
              onPress={() => handleSimulateAlert('drowsiness')}
            >
              <Bell size={20} color="#FFF" />
              <Text style={styles.simulateButtonText}>Simulate Drowsiness</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.simulateButton, { backgroundColor: colors.error }]} 
              onPress={() => handleSimulateAlert('health')}
            >
              <AlertTriangle size={20} color="#FFF" />
              <Text style={styles.simulateButtonText}>Simulate Health Alert</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      {showAlert && (
        <Animated.View style={[styles.alertContainer, alertCardStyle]}>
          <AlertCard 
            type={alertType} 
            onDismiss={handleDismissAlert}
            onMoreInfo={() => setShowSheet(true)}
          />
        </Animated.View>
      )}
      
      <BottomSheet 
        isVisible={showSheet} 
        onClose={() => setShowSheet(false)} 
        title={alertType === 'drowsiness' ? 'Drowsiness Alert' : 'Health Alert'}
      >
        <View style={styles.sheetContent}>
          <Text style={[styles.sheetDescription, { color: colors.text }]}>
            {alertType === 'drowsiness' 
              ? 'We detected signs of drowsiness based on your biometric data. HRV decreases, along with reduced GSR and consistent patterns in movement, may indicate drowsiness.'
              : 'We detected potential health concerns. Sudden changes in heart rate, decreasing skin temperature, and unusual GSR patterns may indicate a possible health issue.'}
          </Text>
          <Text style={[styles.sheetSubtitle, { color: colors.text }]}>Recommendations:</Text>
          <View style={styles.recommendationItem}>
            <View style={[styles.recommendationDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.recommendationText, { color: colors.text }]}>
              {alertType === 'drowsiness' 
                ? 'Find a safe place to stop and rest'
                : 'Pull over safely if possible'}
            </Text>
          </View>
          <View style={styles.recommendationItem}>
            <View style={[styles.recommendationDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.recommendationText, { color: colors.text }]}>
              {alertType === 'drowsiness' 
                ? 'Take a 15-20 minute power nap'
                : 'Contact emergency services if symptoms persist'}
            </Text>
          </View>
          <View style={styles.recommendationItem}>
            <View style={[styles.recommendationDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.recommendationText, { color: colors.text }]}>
              {alertType === 'drowsiness' 
                ? 'Consider consuming caffeine before resuming'
                : 'Try to remain calm and practice deep breathing'}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.sheetButton, { backgroundColor: colors.primary }]}
            onPress={() => setShowSheet(false)}
          >
            <Text style={styles.sheetButtonText}>I Understand</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 12,
  },
  biometricsContainer: {
    marginTop: 24,
  },
  biometricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  simulateContainer: {
    marginTop: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  simulateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '48%',
  },
  simulateButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFF',
    marginLeft: 8,
  },
  alertContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 100,
  },
  sheetContent: {
    padding: 20,
  },
  sheetDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  sheetSubtitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  recommendationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    flex: 1,
  },
  sheetButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  sheetButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFF',
  },
});