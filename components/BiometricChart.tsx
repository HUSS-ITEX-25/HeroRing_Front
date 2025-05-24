import { StyleSheet, View, Text } from 'react-native';
import { Path, Svg, Line, Circle } from 'react-native-svg';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';

interface BiometricChartProps {
  data: {
    x: number;
    y: number;
  }[];
  width: number;
  height: number;
  color: string;
  type: 'heart-rate' | 'hrv' | 'gsr';
}

export default function BiometricChart({ data, width, height, color, type }: BiometricChartProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  
  // Find min and max values
  const minY = Math.min(...data.map(point => point.y));
  const maxY = Math.max(...data.map(point => point.y));
  const range = maxY - minY;
  
  // Calculate path
  const createPath = () => {
    if (data.length === 0) return '';
    
    // Scale points to fit the chart
    const chartHeight = height - 40; // Leave room for labels
    
    // Calculate x-scale (width of one unit)
    const xScale = width / (data.length - 1);
    
    // Function to scale y values to fit in the chart
    const scaleY = (y: number) => {
      return chartHeight - ((y - minY) / range) * chartHeight + 20;
    };
    
    let path = `M ${0} ${scaleY(data[0].y)}`;
    
    for (let i = 1; i < data.length; i++) {
      path += ` L ${i * xScale} ${scaleY(data[i].y)}`;
    }
    
    return path;
  };
  
  const getYAxisLabels = () => {
    const labels = [];
    const step = range / 4;
    
    for (let i = 0; i <= 4; i++) {
      labels.push(Math.round(minY + step * i));
    }
    
    return labels.reverse();
  };
  
  const getXAxisLabels = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days;
  };
  
  const yLabels = getYAxisLabels();
  const xLabels = getXAxisLabels();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          {type === 'heart-rate' 
            ? 'Heart Rate' 
            : type === 'hrv' 
              ? 'Heart Rate Variability' 
              : 'Galvanic Skin Response'}
        </Text>
        <Text style={styles.period}>Last 7 days</Text>
      </View>
      
      <View style={styles.chartContainer}>
        {/* Y-axis labels */}
        <View style={styles.yLabelsContainer}>
          {yLabels.map((label, index) => (
            <Text key={index} style={styles.yLabel}>{label}</Text>
          ))}
        </View>
        
        {/* Chart */}
        <View style={styles.svgContainer}>
          <Svg width={width - 40} height={height - 20}>
            {/* Grid lines */}
            {yLabels.map((_, index) => {
              const y = 20 + (index * (height - 40) / 4);
              return (
                <Line
                  key={`grid-${index}`}
                  x1="0"
                  y1={y}
                  x2={width - 40}
                  y2={y}
                  stroke="#DDDDDD"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
              );
            })}
            
            {/* Data path */}
            <Path
              d={createPath()}
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
            
            {/* Data points */}
            {data.map((point, index) => {
              const xScale = (width - 40) / (data.length - 1);
              const chartHeight = height - 40;
              const y = chartHeight - ((point.y - minY) / range) * chartHeight + 20;
              
              return (
                <Circle
                  key={`point-${index}`}
                  cx={index * xScale}
                  cy={y}
                  r="4"
                  fill="#FFFFFF"
                  stroke={color}
                  strokeWidth="2"
                />
              );
            })}
          </Svg>
        </View>
      </View>
      
      {/* X-axis labels */}
      <View style={styles.xLabelsContainer}>
        {xLabels.map((label, index) => (
          <Text key={index} style={styles.xLabel}>{label}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  period: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#999',
  },
  chartContainer: {
    flexDirection: 'row',
    height: 200,
  },
  yLabelsContainer: {
    width: 40,
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 4,
  },
  yLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: '#999',
    textAlign: 'right',
    paddingRight: 4,
  },
  svgContainer: {
    flex: 1,
  },
  xLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginTop: 4,
  },
  xLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
  },
});