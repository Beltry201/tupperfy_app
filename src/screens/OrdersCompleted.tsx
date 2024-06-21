// OrderHistory.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const ordersData = [
  { id: '1', restaurant: 'Restaurant 1', date: '2024-06-21', status: 'Delivered' },
  { id: '2', restaurant: 'Restaurant 2', date: '2024-06-20', status: 'Delivered' },
  { id: '3', restaurant: 'Restaurant 3', date: '2024-06-19', status: 'Delivered' },
  // Add more dummy data as needed
];

const OrdersCompleted = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Icon name="restaurant" size={24} color="#333" style={styles.icon} />
      <View style={styles.details}>
        <Text style={styles.restaurant}>{item.restaurant}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={ordersData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  list: {
    paddingTop: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
  },
  icon: {
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  restaurant: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    color: '#666',
  },
  status: {
    color: '#333',
  },
});

export default OrdersCompleted;
