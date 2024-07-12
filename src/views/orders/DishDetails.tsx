import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DishDetails = ({ navigation, route }: { navigation: any, route: any }) => {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    navigation.navigate('CartView', { item, quantity });
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Verificar si item está definido antes de acceder a sus propiedades
  const dishName = item?.dish || 'Nombre del Platillo';
  const dishDescription = item?.description || 'Descripción del platillo no disponible';
  const chefDescription = item?.description || 'Descripción del cocinero no disponible';
  const dishPrice = item?.price || 'Precio no disponible';

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}></View>
      <View style={styles.content}>
        <Text style={styles.title}>{dishName}</Text>
        <Text style={styles.description}>Descripción del platillo:</Text>
        <Text style={styles.descriptionText}>{dishDescription}</Text>
        <Text style={styles.description}>Descripción del cocinero:</Text>
        <Text style={styles.descriptionText}>{chefDescription}</Text>
        <Text style={styles.price}>Precio: {dishPrice}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <View style={styles.shadowContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={decrementQuantity}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={addToCart}
      >
        <Text style={styles.addToCartButtonText}>
          <Text style={styles.addToCartButtonText}>Añadir al carrito</Text>
          <Icon name="shopping-cart" size={20} color="#FFF" style={styles.cartIcon} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  imageContainer: {
    height: '33%',
    backgroundColor: '#007BFF',
  },
  content: {
    flex: 2,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  shadowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFF',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 5,
  },
  quantityButton: {
    borderRadius: 20,
    padding: 10,
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#000',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addToCartButtonText: {
    fontSize: 15,
    color: '#FFF',
    fontWeight: 'bold',
    marginRight: 20,
  },
  cartIcon: {
    marginLeft: 20,
  },
});

export default DishDetails;
