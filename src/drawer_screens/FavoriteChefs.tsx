import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

// Datos de cocineros favoritos
let favoriteChefsData = [
  { id: '1', name: 'Chef María', country: 'México', distance: '1.2 km', rating: 4.5 },
  { id: '2', name: 'Chef Juan', country: 'España', distance: '3.5 km', rating: 4.2 },
  { id: '3', name: 'Chef Ana', country: 'Argentina', distance: '2.1 km', rating: 4.8 },
  { id: '4', name: 'Chef Pedro', country: 'Chile', distance: '5.0 km', rating: 4.0 },
  { id: '5', name: 'Chef Laura', country: 'Perú', distance: '3.7 km', rating: 4.3 },
];

const FavoriteChefs = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <IoniconsIcon name="person-circle-outline" size={24} color="#333" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>País: {item.country}</Text>
        <Text style={styles.details}>Distancia: {item.distance}</Text>
        <View style={styles.ratingContainer}>
          <IoniconsIcon name="star" size={16} color="#FFD700" style={styles.starIcon} />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chefs Favoritos</Text>
      <View style={styles.separator} />
      <FlatList
        data={favoriteChefsData}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  separator: {
    height: 1.5,
    backgroundColor: '#CCCCCC',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  icon: {
    marginRight: 16,
    marginBottom: 55,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  details: {
    fontSize: 14,
    color: '#666666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  starIcon: {
    marginRight: 4,
  },
  rating: {
    fontSize: 14,
    color: '#333',
  },
});

export default FavoriteChefs;
