import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import HeaderBar from '@/components/HeaderBar';
import StatisticsCard from '@/components/StatisticsCard';
import BiometricChart from '@/components/BiometricChart';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';
import { mockChartData, mockStats } from '@/data/mockData';

const { width } = Dimensions.get('window');

export default function StatsScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const colors = Colors[theme];
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <HeaderBar title="Statistics" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeIn.delay(100).duration(400)}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Weekly Overview</Text>
          <View style={styles.statsGrid}>
            {mockStats.map((stat, index) => (
              <Animated.View 
                key={stat.title} 
                entering={FadeInDown.delay(150 + index * 50).duration(400)}
                style={styles.statCardContainer}
              >
                <StatisticsCard 
                  title={stat.title}
                  value={stat.value}
                  unit={stat.unit}
                  change={stat.change}
                  iconName={stat.icon}
                />
              </Animated.View>
            ))}
          </View>
        </Animated.View>
        
        <Animated.View entering={FadeIn.delay(300).duration(400)}>
          <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 24 }]}>Heart Rate Trends</Text>
          <View style={styles.chartCard}>
            <BiometricChart 
              data={mockChartData.heartRate}
              width={width - 48}
              height={200}
              color={colors.primary}
              type="heart-rate"
            />
          </View>
        </Animated.View>
        
        <Animated.View entering={FadeIn.delay(400).duration(400)}>
          <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 24 }]}>HRV Trends</Text>
          <View style={styles.chartCard}>
            <BiometricChart 
              data={mockChartData.hrv}
              width={width - 48}
              height={200}
              color="#4CAF50"
              type="hrv"
            />
          </View>
        </Animated.View>
        
        <Animated.View entering={FadeIn.delay(500).duration(400)}>
          <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 24 }]}>GSR Trends</Text>
          <View style={styles.chartCard}>
            <BiometricChart 
              data={mockChartData.gsr}
              width={width - 48}
              height={200}
              color="#FF9800"
              type="gsr"
            />
          </View>
        </Animated.View>
      </ScrollView>
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
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  statCardContainer: {
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
});