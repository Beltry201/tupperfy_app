import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Para iconos
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation desde react-navigation/native
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';

const UserProfile = () => {
  const navigation = useNavigation(); // Obtiene el objeto de navegación
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
    // Aquí iría la lógica para refrescar los datos del usuario desde la fuente de datos
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Ejemplo de tiempo simulado para refresco
  }, []);

  const onPressButton = (buttonName) => {
    setActiveButton(buttonName);
    // Aquí podrías manejar la navegación o cualquier lógica adicional según el botón presionado
  };

  const handleEditProfile = () => {
    // Aquí puedes agregar la lógica para navegar a la pantalla de edición de perfil
    console.log("Editar perfil presionado");
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
          {/* Nueva fila única para los botones */}
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
          {/* Aquí se mostrarán las publicaciones, platillos, etc. */}
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
    flexDirection: 'row', // Alineación de elementos en fila
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: 'center', // Alineación vertical centrada
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginRight: 10, // Espacio entre el avatar y los subtítulos
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
    textAlign: 'center', // Centrado horizontal del texto
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
    marginTop: -70, // Ajuste para alinear con el círculo azul
    paddingHorizontal: 20,
  },
  subtitleItem: {
    flex: 1,
    alignItems: 'center', // Centramos horizontalmente
    justifyContent: 'center', // Centramos verticalmente
  },
  subtitleText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center', // Centramos el texto del subtítulo
    marginBottom: 10, // Añadimos un margen inferior para separar del número
  },
  subtitleCount: {
    fontSize: 20, // Aumentamos el tamaño de la fuente para hacer el número más grande
    color: '#333',
    textAlign: 'center', // Centramos el número
  },
  pedidosRealizados: {
    marginLeft: -75, // Ajuste para pegar más a la izquierda
  },
  moveLeft: {
    marginLeft: -65, // Ajusta este valor para mover los subtítulos más a la izquierda
  },
  sectionContainer: {
    paddingHorizontal: 20, // Reducido para alinear los botones en una sola fila
    marginTop: 20, // Aumentamos el margen superior de las secciones
  },
  sectionRowSingle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionButton: {
    alignItems: 'center',
    paddingVertical: 8,
    flex: 1, // Para que cada botón ocupe el mismo espacio
    borderRadius: 5,
    flexDirection: 'column', // Mantener el texto debajo del icono
    justifyContent: 'center', // Centramos contenido verticalmente
    marginHorizontal: 2, // Espaciado entre los botones
  },
  sectionButtonText: {
    marginTop: 4,
    fontSize: 10, // Reducimos el tamaño del texto
    color: '#007BFF',
    textAlign: 'center', // Centramos texto horizontalmente
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
