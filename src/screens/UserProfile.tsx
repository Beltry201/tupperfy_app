import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const UserProfile = () => {
  // Datos del usuario (pueden venir de una fuente de datos externa o propiedades)
  const user = {
    firstName: 'Diego',
    lastName: 'Arria',
    followedCount: 50, // Número de seguidos del usuario
  };

  const handleEditProfile = () => {
    console.log('Editar perfil');
    // Aquí podrías navegar a la pantalla de edición de perfil
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle} />
        </View>
        <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
        <Text style={styles.followedText}>{user.followedCount} Seguidos</Text>
        <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
          <Text style={styles.editProfileButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>

      {/* Botones Verticales */}
      <ScrollView style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Mis Publicaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cocineros Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Platillos Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Notificaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Nuevo Botón</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 10,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007BFF', // Color de fondo del círculo azul
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  followedText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  editProfileButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editProfileButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfile;
