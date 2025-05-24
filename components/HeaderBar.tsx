import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Menu, Bell } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';

interface HeaderBarProps {
  title: string;
}

export default function HeaderBar({ title }: HeaderBarProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  
  return (
    <View style={styles.header}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconButton}>
          <Bell size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Menu size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  actions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});