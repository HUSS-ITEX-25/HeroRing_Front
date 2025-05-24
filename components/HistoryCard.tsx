import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Car, Clock, MapPin, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';

interface HistoryCardProps {
  data: {
    id: string;
    date: string;
    duration: string;
    distance: string;
    location: string;
    alerts: number;
    status: 'normal' | 'warning' | 'critical';
  };
}

export default function HistoryCard({ data }: HistoryCardProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return '#34C759';
      case 'warning': return '#FFC107';
      case 'critical': return '#FF3B30';
      default: return '#999';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal': return 'Normal';
      case 'warning': return 'Some Alerts';
      case 'critical': return 'Critical Alerts';
      default: return 'Unknown';
    }
  };
  
  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        { backgroundColor: theme === 'light' ? '#FFFFFF' : '#1A1A1A' }
      ]}
    >
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          <View style={styles.iconContainer}>
            <Car size={18} color={colors.primary} />
          </View>
          <Text style={[styles.date, { color: colors.text }]}>{data.date}</Text>
        </View>
        
        <View 
          style={[
            styles.statusBadge, 
            { backgroundColor: getStatusColor(data.status) + '20' }
          ]}
        >
          <View 
            style={[
              styles.statusDot, 
              { backgroundColor: getStatusColor(data.status) }
            ]} 
          />
          <Text 
            style={[
              styles.statusText, 
              { color: getStatusColor(data.status) }
            ]}
          >
            {getStatusText(data.status)}
          </Text>
        </View>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Clock size={16} color="#999" />
          <Text style={[styles.detailText, { color: colors.text }]}>{data.duration}</Text>
        </View>
        
        <View style={styles.separator} />
        
        <View style={styles.detailItem}>
          <MapPin size={16} color="#999" />
          <Text style={[styles.detailText, { color: colors.text }]} numberOfLines={1}>
            {data.location}
          </Text>
        </View>
        
        <View style={styles.separator} />
        
        <View style={styles.detailItem}>
          <AlertTriangle size={16} color="#999" />
          <Text style={[styles.detailText, { color: colors.text }]}>
            {data.alerts} {data.alerts === 1 ? 'Alert' : 'Alerts'}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity style={[styles.viewButton, { borderColor: colors.primary }]}>
        <Text style={[styles.viewButtonText, { color: colors.primary }]}>View Details</Text>
      </TouchableOpacity>
    </TouchableOpacity>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 102, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  date: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 6,
  },
  separator: {
    width: 1,
    height: 16,
    backgroundColor: '#DDD',
    marginHorizontal: 8,
  },
  viewButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});