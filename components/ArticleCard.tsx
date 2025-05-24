import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    excerpt: string;
    imageUrl: string;
    readTime: string;
    category: string;
  };
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  
  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        { backgroundColor: theme === 'light' ? '#FFFFFF' : '#1A1A1A' }
      ]}
    >
      <Image source={{ uri: article.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {article.title}
        </Text>
        <Text style={styles.excerpt} numberOfLines={2}>
          {article.excerpt}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.readTime}>{article.readTime}</Text>
          <ChevronRight size={16} color="#999" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  excerpt: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    lineHeight: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#999',
  },
});