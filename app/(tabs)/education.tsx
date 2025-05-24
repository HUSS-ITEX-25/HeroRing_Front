import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';
import { ChevronRight } from 'lucide-react-native';
import HeaderBar from '@/components/HeaderBar';
import ArticleCard from '@/components/ArticleCard';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';
import { mockArticles, mockCategories } from '@/data/mockData';

export default function EducationScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const colors = Colors[theme];
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredArticles = selectedCategory === 'all' 
    ? mockArticles 
    : mockArticles.filter(article => article.category === selectedCategory);
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <HeaderBar title="Learn" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeIn.delay(100).duration(400)}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryContainer}
          >
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === 'all' && { backgroundColor: colors.primary }
              ]}
              onPress={() => setSelectedCategory('all')}
            >
              <Text 
                style={[
                  styles.categoryText, 
                  selectedCategory === 'all' && { color: '#FFFFFF' }
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            
            {mockCategories.map((category, index) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && { backgroundColor: colors.primary }
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text 
                  style={[
                    styles.categoryText, 
                    selectedCategory === category.id && { color: '#FFFFFF' }
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
        
        <Animated.View entering={FadeIn.delay(200).duration(400)}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Featured Article</Text>
          
          <TouchableOpacity style={styles.featuredCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/3807319/pexels-photo-3807319.jpeg' }}
              style={styles.featuredImage}
            />
            <View style={styles.featuredContent}>
              <View style={[styles.featuredBadge, { backgroundColor: colors.primary }]}>
                <Text style={styles.featuredBadgeText}>New</Text>
              </View>
              <Text style={styles.featuredTitle}>Understanding Smart Ring Biometrics</Text>
              <Text style={styles.featuredExcerpt}>
                Learn how smart rings can monitor your vital signs and help prevent accidents.
              </Text>
              <View style={styles.featuredFooter}>
                <Text style={styles.featuredReadTime}>5 min read</Text>
                <ChevronRight size={16} color={colors.text} />
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
        
        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 24 }]}>
          {selectedCategory === 'all' ? 'All Articles' : mockCategories.find(c => c.id === selectedCategory)?.name}
        </Text>
        
        <View style={styles.articlesContainer}>
          {filteredArticles.map((article, index) => (
            <Animated.View 
              key={article.id} 
              entering={SlideInRight.delay(300 + index * 100).duration(400)}
              style={styles.articleContainer}
            >
              <ArticleCard article={article} />
            </Animated.View>
          ))}
        </View>
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
  categoryContainer: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#333',
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 12,
  },
  featuredCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featuredImage: {
    width: '100%',
    height: 180,
  },
  featuredContent: {
    padding: 16,
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  featuredBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
  featuredTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  featuredExcerpt: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  featuredFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  featuredReadTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#999',
  },
  articlesContainer: {
    marginTop: 8,
  },
  articleContainer: {
    marginBottom: 16,
  },
});