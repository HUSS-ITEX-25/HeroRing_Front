import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { Car, Pause, Play } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';

interface DriveStatusCardProps {
  isDriving: boolean;
  duration: string;
  onToggle: () => void;
}

export default function DriveStatusCard({ isDriving, duration, onToggle }: DriveStatusCardProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const pulseValue = useSharedValue(1);
  
  if (isDriving) {
    pulseValue.value = withRepeat(
      withSequence(
        withTiming(1.03, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseValue.value }],
    };
  });
  
  return (
    <Animated.View 
      entering={FadeIn.duration(500)} 
      style={[
        styles.card, 
        animatedStyle, 
        { backgroundColor: isDriving ? colors.primary : '#FFFFFF' }
      ]}
    >
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <Car size={24} color={isDriving ? '#FFFFFF' : colors.primary} />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={[
            styles.statusText, 
            { color: isDriving ? '#FFFFFF' : colors.text }
          ]}>
            {isDriving ? 'Currently Driving' : 'Not Driving'}
          </Text>
          
          {isDriving && (
            <Text style={styles.durationText}>
              Duration: {duration}
            </Text>
          )}
        </View>
        
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            { 
              backgroundColor: isDriving 
                ? 'rgba(255, 255, 255, 0.2)' 
                : colors.primary + '10'
            }
          ]} 
          onPress={onToggle}
        >
          {isDriving ? (
            <Pause size={20} color="#FFFFFF" />
          ) : (
            <Play size={20} color={colors.primary} />
          )}
        </TouchableOpacity>
      </View>
      
      {isDriving && (
        <View style={styles.alertContainer}>
          <View style={styles.alertDot} />
          <Text style={styles.alertText}>
            Biometric monitoring active
          </Text>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  durationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  alertDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  alertText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
});