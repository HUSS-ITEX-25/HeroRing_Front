import { StyleSheet, View, Text } from 'react-native';
import { Heart, TrendingUp, TrendingDown, Activity, ZapOff, Clock, Car } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';

interface StatisticsCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
  iconName: string;
}

export default function StatisticsCard({ title, value, unit, change, iconName }: StatisticsCardProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  
  const getIcon = () => {
    switch (iconName) {
      case 'heart': return <Heart size={20} color={colors.primary} />;
      case 'activity': return <Activity size={20} color="#4CAF50" />;
      case 'zap': return <ZapOff size={20} color="#FF9800" />;
      case 'clock': return <Clock size={20} color="#9C27B0" />;
      case 'car': return <Car size={20} color="#2196F3" />;
      default: return <Activity size={20} color={colors.primary} />;
    }
  };
  
  return (
    <View 
      style={[
        styles.card, 
        { backgroundColor: theme === 'light' ? '#FFFFFF' : '#1A1A1A' }
      ]}
    >
      <View style={styles.header}>
        <View style={[
          styles.iconContainer, 
          { backgroundColor: colors.primary + '10' }
        ]}>
          {getIcon()}
        </View>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      </View>
      
      <View style={styles.valueContainer}>
        <Text style={[styles.value, { color: colors.text }]}>
          {value}
          {unit && <Text style={styles.unit}> {unit}</Text>}
        </Text>
        
        {change && (
          <View style={[
            styles.changeContainer, 
            { 
              backgroundColor: change.isPositive 
                ? '#34C75920' 
                : '#FF3B3020' 
            }
          ]}>
            {change.isPositive ? (
              <TrendingUp size={14} color="#34C759" />
            ) : (
              <TrendingDown size={14} color="#FF3B30" />
            )}
            <Text style={[
              styles.changeText, 
              { 
                color: change.isPositive 
                  ? '#34C759' 
                  : '#FF3B30' 
              }
            ]}>
              {change.value}%
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  value: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
  },
  unit: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#999',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
  },
  changeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 2,
  },
});