import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa el hook de navegación

const CartView = ({ route }: { route: any }) => {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1); // Estado para la cantidad
  const navigation = useNavigation(); // Obtiene la instancia de navegación

  // Calcular el precio total multiplicando el precio unitario por la cantidad
  const totalPrice = item.price * quantity;

  // Datos de ejemplo para las cajas azules
  const acompanaTuOrden = [
    { id: 1, title: 'Opción 1' },
    { id: 2, title: 'Opción 2' },
    { id: 3, title: 'Opción 3' },
    { id: 4, title: 'Opción 4' },
    { id: 5, title: 'Opción 5' },
    { id: 6, title: 'Opción 6' },
    { id: 7, title: 'Opción 7' },
    { id: 8, title: 'Opción 8' },
  ];

  // Función para incrementar la cantidad
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Función para decrementar la cantidad, asegurándose que no sea menos de 1
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Función para navegar a la pantalla de pago
  const navigateToPayment = () => {
    navigation.navigate('OrderPayment');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Carrito</Text>
      <View style={styles.cartItem}>
        <Text style={styles.itemName}>{item.dish}</Text>
        <View style={styles.quantityContainer}>
          <Text style={styles.itemQuantity}>Cantidad: </Text>
          <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.itemPrice}>Precio Unitario: {item.price}</Text>
        {/* Aquí puedes agregar más detalles del carrito según sea necesario */}
      </View>

      {/* Línea horizontal */}
      <View style={styles.horizontalLine} />

      {/* Subtítulo "Acompaña tu orden" */}
      <Text style={styles.subtitle}>Acompaña tu orden</Text>
      {/* Cajas azules con scroll horizontal */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {acompanaTuOrden.map((option) => (
          <TouchableOpacity key={option.id} style={styles.optionBox}>
            <Text style={styles.optionText}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.subtotalContainer}>
        <Text style={styles.subtotalText}>Subtotal: {totalPrice.toFixed(2)}</Text>
        <TouchableOpacity style={styles.proceedButton} onPress={navigateToPayment}>
          <Text style={styles.proceedButtonText}>Proceder al pago</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  itemPrice: {
    fontSize: 16,
  },
  horizontalLine: {
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    marginBottom: 20,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  optionBox: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    width: 80, // Ancho cuadrado de la caja azul
    height: 80, // Alto cuadrado de la caja azul
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  optionText: {
    fontSize: 14, // Ajuste aquí el tamaño del texto
    color: '#FFF',
    fontWeight: 'bold',
  },
  subtotalContainer: {
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    paddingTop: 10,
    alignItems: 'center',
    marginTop: 'auto', // Mueve el contenido hacia abajo
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  proceedButton: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  proceedButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CartView;
