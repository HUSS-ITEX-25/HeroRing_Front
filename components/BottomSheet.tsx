import { StyleSheet, View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { X } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';

const { height } = Dimensions.get('window');

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function BottomSheet({ isVisible, onClose, title, children }: BottomSheetProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const translateY = useSharedValue(height);
  const backdropOpacity = useSharedValue(0);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });
  
  const backdropStyle = useAnimatedStyle(() => {
    return {
      opacity: backdropOpacity.value,
    };
  });
  
  if (isVisible) {
    translateY.value = withSpring(0, { damping: 20 });
    backdropOpacity.value = withTiming(1, { duration: 300 });
  } else {
    translateY.value = withTiming(height, { duration: 300 });
    backdropOpacity.value = withTiming(0, { duration: 300 });
  }
  
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Animated.View 
          style={[styles.backdrop, backdropStyle]} 
          onTouchEnd={onClose}
        />
        
        <Animated.View 
          style={[
            styles.sheetContainer, 
            animatedStyle, 
            { backgroundColor: theme === 'light' ? '#FFFFFF' : '#1A1A1A' }
          ]}
        >
          <View style={styles.handle} />
          
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.content}>
            {children}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    maxHeight: height * 0.8,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#DDD',
    alignSelf: 'center',
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
});