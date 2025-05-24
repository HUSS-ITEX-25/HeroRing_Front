import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderBar from '@/components/HeaderBar';
import HistoryCard from '@/components/HistoryCard';
import EmptyState from '@/components/EmptyState';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';
import { mockDriveHistory } from '@/data/mockData';

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const colors = Colors[theme];
  
  const renderItem = ({ item }) => <HistoryCard data={item} />;
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <HeaderBar title="Drive History" />
      
      {mockDriveHistory.length > 0 ? (
        <FlatList
          data={mockDriveHistory}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <EmptyState
          iconName="calendar"
          title="No Drive History"
          description="Your drive history will appear here after your first drive."
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  listContent: {
    padding: 16,
  },
  separator: {
    height: 12,
  },
});