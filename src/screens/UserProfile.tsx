import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Para iconos
import { StatusBar } from 'expo-status-bar';

const UserProfile = () => {
  // Estado para controlar qué botón está activo
  const [activeButton, setActiveButton] = useState('publicaciones');

  // Datos del usuario (pueden venir de una fuente de datos externa o propiedades)
  const [refreshing, setRefreshing] = useState(false);

  const user = {
    firstName: 'Diego',
    lastName: 'Arria',
    followedCount: 50, // Número de seguidos del usuario
    followersCount: 150, // Número de seguidores del usuario
    likesCount: 200, // Número de "Me gusta" totales del usuario
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {/* Avatar */}
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{user.firstName[0]}</Text>
            </View>
            {/* Nombre del usuario */}
            <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
          </View>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitleTextLeft}>Chefs seguidos</Text>
            <Text style={[styles.subtitleTextLeft, styles.pedidosRealizados]}>Pedidos realizados</Text>
          </View>
        </View>

        {/* Secciones del usuario */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionRow}>
            <TouchableOpacity
              style={[styles.sectionButton, activeButton === 'publicaciones' && styles.activeButton]}
              onPress={() => onPressButton('publicaciones')}
            >
              <Icon name="grid-outline" size={24} color={activeButton === 'publicaciones' ? '#FFFFFF' : '#007BFF'} />
              <Text style={[styles.sectionButtonText, activeButton === 'publicaciones' && styles.activeButtonText]}>Publicaciones</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sectionButton, activeButton === 'platillos' && styles.activeButton, styles.leftAlignedButton]}
              onPress={() => onPressButton('platillos')}
            >
              <Icon name="fast-food-outline" size={24} color={activeButton === 'platillos' ? '#FFFFFF' : '#007BFF'} />
              <Text style={[styles.sectionButtonText, activeButton === 'platillos' && styles.activeButtonText]}>Platillos Favoritos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sectionButton, activeButton === 'cocineros' && styles.activeButton]}
              onPress={() => onPressButton('cocineros')}
            >
              <Icon name="heart-outline" size={24} color={activeButton === 'cocineros' ? '#FFFFFF' : '#007BFF'} />
              <Text style={[styles.sectionButtonText, activeButton === 'cocineros' && styles.activeButtonText]}>Likes</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionRow}>
            <TouchableOpacity
              style={[styles.sectionButton, activeButton === 'guardadas' && styles.activeButton]}
              onPress={() => onPressButton('guardadas')}
            >
              <Icon name="bookmark-outline" size={24} color={activeButton === 'guardadas' ? '#FFFFFF' : '#007BFF'} />
              <Text style={[styles.sectionButtonText, activeButton === 'guardadas' && styles.activeButtonText]}>Guardados</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sectionButton, activeButton === 'notificaciones' && styles.activeButton]}
              onPress={() => onPressButton('notificaciones')}
            >
              <Icon name="notifications-outline" size={24} color={activeButton === 'notificaciones' ? '#FFFFFF' : '#007BFF'} />
              <Text style={[styles.sectionButtonText, activeButton === 'notificaciones' && styles.activeButtonText]}>Notificaciones</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Línea horizontal */}
        <View style={styles.line}></View>

        {/* Contenido del usuario */}
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
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -65, // Ajuste para alinear con el círculo azul
    paddingHorizontal: 20,
  },
  subtitleTextLeft: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    textAlign: 'left',
  },
  subtitleTextRight: {
    fontSize: 12,
    color: '#666',
    textAlign: 'left', // Alineación a la izquierda
    marginLeft: 10, // Ajuste para separar del otro subtítulo
  },
  pedidosRealizados: {
    marginLeft: -75, // Ajuste para pegar más a la izquierda
  },
  sectionContainer: {
    paddingHorizontal: 40,
    marginTop: 20, // Aumentamos el margen superior de las secciones
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15, // Aumentamos el margen inferior de las secciones
  },
  sectionButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12, // Ajustado para los otros botones
    borderRadius: 5,
    flexDirection: 'column', // Cambiamos a columna para colocar el texto debajo del icono
    justifyContent: 'center', // Centramos contenido verticalmente
  },
  leftAlignedButton: {
    paddingHorizontal: 8, // Reducido solo para mover los iconos a la izquierda
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
