import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DishDetails = ({ route }: { route: any }) => {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation(); // Usa el hook de navegación

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}></View>
      <View style={styles.content}>
        <Text style={styles.title}>{item.dish}</Text>
        <Text style={styles.description}>Descripción del platillo:</Text>
        <Text style={styles.descriptionText}>
          Aquí puedes poner la descripción detallada del platillo seleccionado. Por ejemplo, ingredientes, método de preparación, información nutricional, detalles del cocinero, etc.
        </Text>
        <Text style={styles.price}>Precio: {item.price}</Text>
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
        onPress={() => navigation.navigate('CartView')}
      >
        <Text style={styles.addToCartButtonText}>Añadir al carrito</Text>
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
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addToCartButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default DishDetails;
