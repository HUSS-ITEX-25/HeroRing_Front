import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch, Image, Modal, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { User, Bell, Settings, Shield, Heart, CircleHelp as HelpCircle, ChevronRight } from 'lucide-react-native';
import HeaderBar from '@/components/HeaderBar';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';
import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { theme, toggleTheme } = useTheme();
  const colors = Colors[theme];

  const [contacts, setContacts] = useState([
    { id: 1, name: 'Mom', phone: '010-1234-5678' },
    { id: 2, name: 'Dad', phone: '010-8765-4321' }
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const addContact = () => {
    const id = new Date().getTime();
    setContacts([...contacts, { id, name: newName || `Contact ${id}`, phone: newPhone || '000-0000-0000' }]);
    setNewName('');
    setNewPhone('');
    setModalVisible(false);
  };

  const removeContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <HeaderBar title="Profile" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeIn.delay(100).duration(400)} style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john.doe@example.com</Text>

          <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.primary }]}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200).duration(400)}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Health Information</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.cardItem}>
              <View style={styles.cardItemLeft}>
                <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                  <Heart size={20} color={colors.primary} />
                </View>
                <Text style={[styles.cardItemText, { color: colors.text }]}>Medical Conditions</Text>
              </View>
              <ChevronRight size={20} color="#999" />
            </TouchableOpacity>

            <View style={styles.separator} />

            <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={styles.cardItemLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: '#4CAF50' + '20' }]}>
                    <User size={20} color="#4CAF50" />
                  </View>
                  <Text style={[styles.cardItemText, { color: colors.text }]}>Emergency Contacts</Text>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Text style={{ color: colors.primary, fontWeight: '600' }}>+ Add</Text>
                </TouchableOpacity>
              </View>

              {contacts.map((contact) => (
                <View key={contact.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                  <Text style={{ color: colors.text }}>{contact.name} - {contact.phone}</Text>
                  <TouchableOpacity onPress={() => removeContact(contact.id)}>
                    <Text style={{ color: '#F44336', fontWeight: '600' }}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ))}

  <Modal visible={modalVisible} transparent animationType="slide">
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 12, padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>Add Contact</Text>
  
          <TextInput
            placeholder="Name"
            value={newName}
            onChangeText={setNewName}
            style={{ borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 12, paddingVertical: 4 }}
          />
          <TextInput
            placeholder="Phone Number"
            value={newPhone}
            onChangeText={setNewPhone}
            keyboardType="phone-pad"
            style={{ borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 20, paddingVertical: 4 }}
          />
  
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: '#999', fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addContact}>
              <Text style={{ color: colors.primary, fontWeight: '600', fontSize: 16 }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(300).duration(400)}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
          <View style={styles.card}>
            <View style={styles.cardItem}>
              <View style={styles.cardItemLeft}>
                <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                  <Bell size={20} color={colors.primary} />
                </View>
                <Text style={[styles.cardItemText, { color: colors.text }]}>Notifications</Text>
              </View>
              <Switch
                value={true}
                trackColor={{ false: '#D1D1D6', true: colors.primary + '90' }}
                thumbColor={true ? colors.primary : '#F4F3F4'}
                onValueChange={() => { }}
              />
            </View>

            <View style={styles.separator} />

            <View style={styles.cardItem}>
              <View style={styles.cardItemLeft}>
                <View style={[styles.iconContainer, { backgroundColor: '#9C27B0' + '20' }]}>
                  <Settings size={20} color="#9C27B0" />
                </View>
                <Text style={[styles.cardItemText, { color: colors.text }]}>Dark Mode</Text>
              </View>
              <Switch
                value={theme === 'dark'}
                trackColor={{ false: '#D1D1D6', true: colors.primary + '90' }}
                thumbColor={theme === 'dark' ? colors.primary : '#F4F3F4'}
                onValueChange={toggleTheme}
              />
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400).duration(400)}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Support</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.cardItem}>
              <View style={styles.cardItemLeft}>
                <View style={[styles.iconContainer, { backgroundColor: '#FF9800' + '20' }]}>
                  <HelpCircle size={20} color="#FF9800" />
                </View>
                <Text style={[styles.cardItemText, { color: colors.text }]}>Help & FAQ</Text>
              </View>
              <ChevronRight size={20} color="#999" />
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.cardItem}>
              <View style={styles.cardItemLeft}>
                <View style={[styles.iconContainer, { backgroundColor: '#F44336' + '20' }]}>
                  <Shield size={20} color="#F44336" />
                </View>
                <Text style={[styles.cardItemText, { color: colors.text }]}>Privacy Policy</Text>
              </View>
              <ChevronRight size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.0.0</Text>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  editButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cardItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 16,
  },
  logoutButton: {
    marginTop: 8,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#F44336',
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
  },
});
