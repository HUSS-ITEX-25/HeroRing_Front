import { StyleSheet, View, Text } from 'react-native';
import { CalendarClock, TriangleAlert as AlertTriangle, Activity, Camera } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';

interface EmptyStateProps {
  iconName: 'calendar' | 'alert' | 'activity' | 'camera';
  title: string;
  description: string;
}

export default function EmptyState({ iconName, title, description }: EmptyStateProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  
  const getIcon = () => {
    const size = 48;
    const color = colors.primary;
    
    switch (iconName) {
      case 'calendar': return <CalendarClock size={size} color={color} />;
      case 'alert': return <AlertTriangle size={size} color={color} />;
      case 'activity': return <Activity size={size} color={color} />;
      case 'camera': return <Camera size={size} color={color} />;
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: colors.primary + '10' }]}>
        {getIcon()}
      </View>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});