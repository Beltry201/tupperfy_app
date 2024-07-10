// MessagesScreen.tsx

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // Importa hook de navegación

// Datos de conversaciones
let conversationsData = [
  { id: '1', name: 'Usuario 1', lastMessage: 'Hola, ¿cómo estás?', time: '10:00 AM' },
  { id: '2', name: 'Usuario 2', lastMessage: 'Todo bien, ¿y tú?', time: '10:30 AM' },
  { id: '3', name: 'Usuario 3', lastMessage: '¡Hola! ¿Qué tal?', time: '11:00 AM' },
  { id: '4', name: 'Usuario 4', lastMessage: 'Buenos días.', time: '11:30 AM' },
  { id: '5', name: 'Usuario 5', lastMessage: '¿Cómo va todo?', time: '12:00 PM' },
  { id: '6', name: 'Usuario 6', lastMessage: '¡Hola mundo!', time: '12:30 PM' },
  { id: '7', name: 'Usuario 7', lastMessage: '¿Qué planes tienes?', time: '1:00 PM' },
  { id: '8', name: 'Usuario 8', lastMessage: 'Vamos a comer?', time: '1:30 PM' },
  { id: '9', name: 'Usuario 9', lastMessage: 'Nos vemos luego!', time: '2:00 PM' },
  { id: '10', name: 'Usuario 10', lastMessage: 'Ok, gracias!', time: '2:30 PM' },
];

// Genera 10 nombres aleatorios
const generateRandomName = () => {
  const names = ['María', 'Juan', 'Carlos', 'Ana', 'Pedro', 'Laura', 'Diego', 'Lucía', 'Fernando', 'Sofía'];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
};

// Agrega 10 chats más con nombres aleatorios
for (let i = 11; i <= 20; i++) {
  conversationsData.push({
    id: `${i}`,
    name: `Usuario ${i}`,
    lastMessage: `Mensaje ${i}`,
    time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60)} ${Math.random() < 0.5 ? 'AM' : 'PM'}`,
  });
}

const MessagesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredConversations, setFilteredConversations] = useState(conversationsData);
  const navigation = useNavigation(); // Hook de navegación

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim().length === 0) {
      setFilteredConversations(conversationsData);
    } else {
      const filtered = conversationsData.filter(conversation =>
        conversation.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredConversations(filtered);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigateToChat(item)}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );

  const navigateToChat = (conversation) => {
    // Navega a la pantalla de chat con los datos de la conversación
    navigation.navigate('ChatScreen', { conversation });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Mensajes</Text>
      </View>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar conversación..."
          value={searchQuery}
          onChangeText={handleSearch}
          autoFocus // Enfoca automáticamente el TextInput al abrirse
        />
      </View>
      <FlatList
        data={filteredConversations}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666666',
  },
  time: {
    fontSize: 12,
    color: '#999999',
    marginTop: 4,
  },
});

export default MessagesScreen;
