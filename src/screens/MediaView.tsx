import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const data = [
  { id: '1', backgroundColor: '#007BFF' },
  { id: '2', backgroundColor: '#007BFF' },
  { id: '3', backgroundColor: '#007BFF' },
  { id: '4', backgroundColor: '#007BFF' },
  { id: '5', backgroundColor: '#007BFF' },
  { id: '6', backgroundColor: '#007BFF' },
  { id: '7', backgroundColor: '#007BFF' },
  { id: '8', backgroundColor: '#007BFF' },
  { id: '9', backgroundColor: '#007BFF' },
  { id: '10', backgroundColor: '#007BFF' },
  { id: '11', backgroundColor: '#007BFF' },
  { id: '12', backgroundColor: '#007BFF' },
  { id: '13', backgroundColor: '#007BFF' },
  { id: '14', backgroundColor: '#007BFF' },
  { id: '15', backgroundColor: '#007BFF' },
  { id: '16', backgroundColor: '#007BFF' },
  { id: '17', backgroundColor: '#007BFF' },
  { id: '18', backgroundColor: '#007BFF' },
  { id: '19', backgroundColor: '#007BFF' },
  { id: '20', backgroundColor: '#007BFF' },
];

const MediaView = () => {
  const handleCirclePress = () => {
    // Lógica para manejar la acción del círculo blanco
    console.log('Circle pressed');
  };

  const handleLikePress = () => {
    // Lógica para manejar la acción del botón Like
    console.log('Like pressed');
  };

  const handleCommentPress = () => {
    // Lógica para manejar la acción del botón Comment
    console.log('Comment pressed');
  };

  const handleSharePress = () => {
    // Lógica para manejar la acción del botón Share
    console.log('Share pressed');
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item, { backgroundColor: item.backgroundColor }]}>
      <View style={styles.content}>
        <View style={styles.rectangle} />
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.circle} onPress={handleCirclePress}>
            <FontAwesome5Icon name="user" size={30} color="#007BFF" style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleLikePress}>
              <FontAwesome5Icon name="heart" size={30} color="white" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCommentPress}>
              <FontAwesome5Icon name="comment-dots" size={30} color="white" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSharePress}>
              <FontAwesome5Icon name="share" size={30} color="white" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Tupperfy Media</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Color de fondo general
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  item: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 600, // Altura de cada elemento
    width: '100%',
    marginBottom: 20, // Espacio blanco entre elementos
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  rectangle: {
    flex: 1,
    height: '100%',
    backgroundColor: '#007BFF',
  },
  iconsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
});

export default MediaView;
