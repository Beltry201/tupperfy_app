import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const FollowedChefs = () => {
  // Datos de ejemplo de followers
  const followersData = [
    { id: '1', username: 'user1', name: 'Usuario 1' },
    { id: '2', username: 'user2', name: 'Usuario 2' },
    { id: '3', username: 'user3', name: 'Usuario 3' },
    { id: '4', username: 'user4', name: 'Usuario 4' },
    { id: '5', username: 'user5', name: 'Usuario 5' },
    { id: '6', username: 'user6', name: 'Usuario 6' },
    { id: '7', username: 'user7', name: 'Usuario 7' },
    { id: '8', username: 'user8', name: 'Usuario 8' },
    { id: '9', username: 'user9', name: 'Usuario 9' },
    { id: '10', username: 'user10', name: 'Usuario 10' },
    { id: '11', username: 'user11', name: 'Usuario 11' },
    { id: '12', username: 'user12', name: 'Usuario 12' },
    { id: '13', username: 'user13', name: 'Usuario 13' },
    { id: '14', username: 'user14', name: 'Usuario 14' },
    { id: '15', username: 'user15', name: 'Usuario 15' },
    { id: '16', username: 'user16', name: 'Usuario 16' },
    { id: '17', username: 'user17', name: 'Usuario 17' },
    { id: '18', username: 'user18', name: 'Usuario 18' },
    { id: '19', username: 'user19', name: 'Usuario 19' },
    { id: '20', username: 'user20', name: 'Usuario 20' },
    { id: '21', username: 'user21', name: 'Usuario 21' },
    { id: '22', username: 'user22', name: 'Usuario 22' },
    { id: '23', username: 'user23', name: 'Usuario 23' },
    { id: '24', username: 'user24', name: 'Usuario 24' },
    { id: '25', username: 'user25', name: 'Usuario 25' },
  ];

  // Renderizado de cada item de la lista de followers
  const renderFollowerItem = ({ item }) => (
    <TouchableOpacity style={styles.followerItem}>
      <View style={styles.avatarCircle} />
      <View style={styles.textContainer}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Followed Chefs</Text>
      </View>
      <FlatList
        data={followersData}
        renderItem={renderFollowerItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#FAFAFA',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  followerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007BFF', // Color azul
  },
  textContainer: {
    marginLeft: 15,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  name: {
    fontSize: 14,
    color: '#666',
  },
});

export default FollowedChefs;
