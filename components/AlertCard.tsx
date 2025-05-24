import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { TriangleAlert as AlertTriangle, BellRing, X, Info as InfoIcon } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';
import { Audio } from 'expo-av';
import React, { useEffect } from 'react';

interface AlertCardProps {
  type: 'drowsiness' | 'health' | null;
  onDismiss: () => void;
  onMoreInfo: () => void;
}

export default function AlertCard({ type, onDismiss, onMoreInfo }: AlertCardProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const pulseValue = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseValue.value }],
  }));

  useEffect(() => {
    pulseValue.value = withRepeat(withTiming(1.05, { duration: 700 }), -1, true);
  }, []);

  useEffect(() => {
    let sound: Audio.Sound;

    const playSiren = async () => {
      if (type === 'health') {
        try {
          const { sound: loadedSound } = await Audio.Sound.createAsync(
            require('@/assets/sounds/siren.mp3')
          );
          sound = loadedSound;
          await sound.playAsync();
        } catch (error) {
          console.warn('Siren sound failed to play:', error);
        }
      }
    };

    playSiren();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [type]);

  const getAlertBgColor = () => {
    if (type === 'drowsiness') return colors.warning;
    if (type === 'health') return colors.error;
    return colors.primary;
  };

  const getAlertIcon = () => {
    if (type === 'drowsiness') {
      return <BellRing size={24} color="#FFFFFF" />;
    } else if (type === 'health') {
      return <AlertTriangle size={24} color="#FFFFFF" />;
    }
    return null;
  };

  const getAlertTitle = () => {
    if (type === 'drowsiness') return 'Drowsiness Detected';
    if (type === 'health') return 'Health Alert';
    return 'Alert';
  };

  const getAlertDescription = () => {
    if (type === 'drowsiness') {
      return 'You appear to be showing signs of drowsiness. Please take a break.';
    } else if (type === 'health') {
      return 'Potential health issue detected. Consider pulling over safely.\nAn emergency has been sent to the emergency contact.';
    }
    return '';
  };

  return (
    <Animated.View
      style={[
        styles.card,
        animatedStyle,
        { backgroundColor: getAlertBgColor() }
      ]}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {getAlertIcon()}
        </View>
        <Text style={styles.title}>{getAlertTitle()}</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onDismiss}>
          <X size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>{getAlertDescription()}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.dismissButton} onPress={onDismiss}>
          <Text style={styles.dismissText}>Dismiss</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoButton} onPress={onMoreInfo}>
          <InfoIcon size={16} color="#FFFFFF" />
          <Text style={styles.infoText}>More Info</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    marginRight: 12,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 22,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dismissButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  dismissText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  infoText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});
