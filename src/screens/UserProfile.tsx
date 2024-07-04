import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation desde react-navigation/native
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';

const UserProfile = ({ navigation }: { navigation: any }) => {
  const [activeButton, setActiveButton] = useState('platillos');
  const [refreshing, setRefreshing] = useState(false);

  const user = {
    firstName: 'Diego',
    lastName: 'Arria',
    followedCount: 25,
    followersCount: 75,
    likesCount: 200,
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const onPressButton = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleEditProfile = () => {
    navigation.navigate('ProfileEdit'); // Navegar a la pantalla de edición de perfil
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{user.firstName[0]}</Text>
            </View>
            <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>

            {/* Botón de Editar Perfil */}
            <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
              <Text style={styles.editProfileButtonText}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.subtitleContainer}>
            <View style={[styles.subtitleItem, styles.moveLeft]}>
              <Text style={styles.subtitleText}>Chefs seguidos</Text>
              <TouchableOpacity onPress={() => navigation.navigate('FollowedChefs')}>
                <Text style={styles.subtitleCount}>{user.followedCount}</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.subtitleItem, styles.moveLeft]}>
              <Text style={[styles.subtitleText, styles.pedidosRealizados]}>Pedidos realizados</Text>
              <TouchableOpacity onPress={() => navigation.navigate('OrdersCompleted')}>
                <Text style={[styles.subtitleCount, styles.pedidosRealizados]}>{user.followersCount}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionRowSingle}>
            <TouchableOpacity
              style={[styles.sectionButton, activeButton === 'platillos' && styles.activeButton]}
              onPress={() => onPressButton('platillos')}
            >
              <MaterialIconsIcon name="food-bank" size={24} color={activeButton === 'platillos' ? '#FFFFFF' : '#007BFF'} />
              <Text style={[styles.sectionButtonText, activeButton === 'platillos' && styles.activeButtonText]}>Platillos Favoritos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sectionButton, activeButton === 'cocineros' && styles.activeButton]}
              onPress={() => onPressButton('cocineros')}
            >
              <Icon name="heart" size={24} color={activeButton === 'cocineros' ? '#FFFFFF' : '#007BFF'} />
              <Text style={[styles.sectionButtonText, activeButton === 'cocineros' && styles.activeButtonText]}>Likes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sectionButton, activeButton === 'guardadas' && styles.activeButton]}
              onPress={() => onPressButton('guardadas')}
            >
              <Icon name="bookmark" size={24} color={activeButton === 'guardadas' ? '#FFFFFF' : '#007BFF'} />
              <Text style={[styles.sectionButtonText, activeButton === 'guardadas' && styles.activeButtonText]}>Guardados</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sectionButton, activeButton === 'notificaciones' && styles.activeButton]}
              onPress={() => onPressButton('notificaciones')}
            >
              <Icon name="notifications" size={24} color={activeButton === 'notificaciones' ? '#FFFFFF' : '#007BFF'} />
              <Text style={[styles.sectionButtonText, activeButton === 'notificaciones' && styles.activeButtonText]}>Notificaciones</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.line}></View>

        <ScrollView style={styles.contentContainer}>
          <Text style={styles.contentText}>Contenido del usuario...</Text>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  editProfileButton: {
    marginTop: 10,
    backgroundColor: '#CCCCCC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  editProfileButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: -70,
    paddingHorizontal: 20,
  },
  subtitleItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitleText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitleCount: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
  },
  pedidosRealizados: {
    marginLeft: -75,
  },
  moveLeft: {
    marginLeft: -65,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionRowSingle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionButton: {
    alignItems: 'center',
    paddingVertical: 8,
    flex: 1,
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  sectionButtonText: {
    marginTop: 4,
    fontSize: 10,
    color: '#007BFF',
    textAlign: 'center',
  },
  activeButton: {
    backgroundColor: '#007BFF',
  },
  activeButtonText: {
    color: '#FFFFFF',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginHorizontal: 20,
    marginTop: 10,
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  contentText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default UserProfile;
