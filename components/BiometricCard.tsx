import { StyleSheet, View, Text } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Heart, Activity, Zap, Thermometer } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';

type BiometricStatus = 'normal' | 'warning' | 'critical' | 'inactive';

interface BiometricCardProps {
  title: string;
  value: number;
  unit: string;
  status: BiometricStatus;
  iconName: 'heart' | 'activity' | 'zap' | 'thermometer';
}

export default function BiometricCard({
  title,
  value,
  unit,
  status,
  iconName,
}: BiometricCardProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const pulseValue = useSharedValue(1);

  // 애니메이션 조건
  if (status === 'critical' || status === 'warning') {
    pulseValue.value = withRepeat(
      withTiming(1.1, { duration: status === 'critical' ? 600 : 1000 }),
      -1,
      true
    );
  }

  // ❗ useAnimatedStyle 안에서 함수 호출 금지 → 바깥에서 계산
  const baseBackgroundColor = getBackgroundColor(status, theme);
  const pulseColor =
    status === 'critical'
      ? '#FF3B3020'
      : status === 'warning'
      ? '#FFC10720'
      : baseBackgroundColor;

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      pulseValue.value,
      [1, 1.1],
      [baseBackgroundColor, pulseColor]
    );

    return {
      backgroundColor,
      transform: [{ scale: pulseValue.value }],
    };
  });

  const getIconColor = (status: BiometricStatus) => {
    switch (status) {
      case 'normal':
        return colors.primary;
      case 'warning':
        return '#FFC107';
      case 'critical':
        return '#FF3B30';
      case 'inactive':
        return '#9E9E9E';
    }
  };

  const renderIcon = () => {
    const iconColor = getIconColor(status);
    const size = 24;

    switch (iconName) {
      case 'heart':
        return <Heart size={size} color={iconColor} />;
      case 'activity':
        return <Activity size={size} color={iconColor} />;
      case 'zap':
        return <Zap size={size} color={iconColor} />;
      case 'thermometer':
        return <Thermometer size={size} color={iconColor} />;
    }
  };

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <View style={styles.titleRow}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {renderIcon()}
      </View>

      <View style={styles.valueRow}>
        <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>

      <View
        style={[
          styles.statusIndicator,
          { backgroundColor: getStatusColor(status) },
        ]}
      >
        <Text style={styles.statusText}>{getStatusText(status)}</Text>
      </View>
    </Animated.View>
  );
}

function getBackgroundColor(status: BiometricStatus, theme: 'light' | 'dark'): string {
  const baseColor = theme === 'light' ? '#FFFFFF' : '#1A1A1A';

  switch (status) {
    case 'normal':
      return baseColor;
    case 'warning':
      return baseColor;
    case 'critical':
      return baseColor;
    case 'inactive':
      return theme === 'light' ? '#F5F5F5' : '#2A2A2A';
  }
}

function getStatusColor(status: BiometricStatus): string {
  switch (status) {
    case 'normal':
      return '#34C759';
    case 'warning':
      return '#FFC107';
    case 'critical':
      return '#FF3B30';
    case 'inactive':
      return '#9E9E9E';
  }
}

function getStatusText(status: BiometricStatus): string {
  switch (status) {
    case 'normal':
      return 'Normal';
    case 'warning':
      return 'Warning';
    case 'critical':
      return 'Critical';
    case 'inactive':
      return 'Inactive';
  }
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  value: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 28,
    marginRight: 4,
  },
  unit: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#999',
    marginBottom: 4,
  },
  statusIndicator: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
});
