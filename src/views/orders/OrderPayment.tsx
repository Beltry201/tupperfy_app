import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderPayment = ({ navigation }: { navigation: any }) => {
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(null);
  const [needUtensils, setNeedUtensils] = useState(false); // Estado para el interruptor de cubiertos
  const [selectedTipIndex, setSelectedTipIndex] = useState(3); // 15% como predeterminado

  // Simulación de datos del producto seleccionado y precios
  const selectedProduct = {
    name: 'Producto Seleccionado',
    quantity: 1,
    price: 100, // Precio del producto
  };

  const deliveryCost = selectedDeliveryOption === 'prioritaria' ? 20 : 10; // Coste de entrega basado en la opción seleccionada
  const tipPercentages = [0, 5, 10, 15, 20];

  const handleDeliveryOptionPress = (option) => {
    setSelectedDeliveryOption(option);
  };

  const handleTipPress = (index) => {
    setSelectedTipIndex(index);
  };

  const handlePayment = () => {
    // Aquí se realizarían las acciones de pago
    // Luego navegar a la pantalla de estado del pedido
    navigation.navigate('OrderStatus')
  };

  const tipAmount = selectedProduct.price * (tipPercentages[selectedTipIndex] / 100);
  const totalCost = selectedProduct.price + deliveryCost + tipAmount;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.leftSection} />
        <View style={styles.rightSection}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Resumen del Pedido</Text>
          </View>
          <View style={styles.addressContainer}>
            <Text style={styles.subtitle}>Dirección de entrega</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleDeliveryOptionPress('Casa')}>
                <Text style={styles.optionButtonText}>Casa</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleDeliveryOptionPress('Depto')}>
                <Text style={styles.optionButtonText}>Depto</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleDeliveryOptionPress('Oficina')}>
                <Text style={styles.optionButtonText}>Oficina</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleDeliveryOptionPress('Otro')}>
                <Text style={styles.optionButtonText}>Otro</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.horizontalLine} />
            <TextInput
              style={styles.addressInput}
              placeholder="Dirección"
              placeholderTextColor="#666"
            />
            <TextInput
              style={styles.instructionsInput}
              placeholder="Instrucciones"
              placeholderTextColor="#666"
            />
          </View>
          <View style={styles.selectedProductContainer}>
            <Text style={styles.subtitle}>Producto Seleccionado</Text>
            <Text style={styles.itemText}>Nombre: {selectedProduct.name}</Text>
            <Text style={styles.itemText}>Cantidad: {selectedProduct.quantity}</Text>
            <Text style={styles.itemText}>Precio: ${selectedProduct.price}</Text>
            <View style={styles.horizontalLine} />
            {/* Sección de "¿Necesitas cubiertos?" */}
            <View style={styles.utensilsContainer}>
              <Text style={styles.utensilsText}>¿Necesitas cubiertos?</Text>
              <Switch
                value={needUtensils}
                onValueChange={(value) => setNeedUtensils(value)}
              />
            </View>

            <View style={styles.deliveryTimeContainer}>
              <Text style={styles.deliveryTimeText}>Tiempo de entrega estimado</Text>
              <TouchableOpacity
                style={[
                  styles.deliveryOption,
                  selectedDeliveryOption === 'prioritaria' && styles.selectedOption,
                ]}
                onPress={() => handleDeliveryOptionPress('prioritaria')}
              >
                <View style={styles.checkboxContainer}>
                  <View style={[
                    styles.checkbox,
                    selectedDeliveryOption === 'prioritaria' && styles.checked
                  ]} />
                  <Text style={styles.deliveryOptionText}>Entrega prioritaria ($$$)</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.deliveryOption,
                  selectedDeliveryOption === 'normal' && styles.selectedOption,
                ]}
                onPress={() => handleDeliveryOptionPress('normal')}
              >
                <View style={styles.checkboxContainer}>
                  <View style={[
                    styles.checkbox,
                    selectedDeliveryOption === 'normal' && styles.checked
                  ]} />
                  <Text style={styles.deliveryOptionText}>Entrega normal</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.paymentMethod}>
            <Text style={[styles.sectionTitle, styles.leftAlign]}>Selecciona tu Método de Pago</Text>
            <View style={styles.horizontalLine} />
            <TouchableOpacity style={styles.paymentButton}>
              <Text style={styles.paymentButtonText}>Tarjeta de crédito/débito</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentButton}>
              <Text style={styles.paymentButtonText}>Mercado Pago</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentButton}>
              <Text style={styles.paymentButtonText}>Efectivo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.summaryContainer}>
            <Text style={styles.sectionTitle}>Resumen de Pago</Text>
            <View style={styles.horizontalLine} />
            <Text style={styles.itemText}>Productos: ${selectedProduct.price}</Text>
            <Text style={styles.itemText}>Envío: ${deliveryCost}</Text>
            <Text style={styles.itemText}>Propina ({tipPercentages[selectedTipIndex]}%): ${tipAmount.toFixed(2)}</Text>
            <Text style={styles.totalText}>Total: ${totalCost}</Text>
            <Text style={styles.tipSelectionText}>Selecciona la propina para tu repartidor</Text>
            <View style={styles.tipButtonsContainer}>
              {tipPercentages.map((percentage, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.tipButton,
                    index === selectedTipIndex && styles.selectedTipButton
                  ]}
                  onPress={() => handleTipPress(index)}
                >
                  <Text style={styles.tipButtonText}>{percentage}%</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.confirmButton} onPress={handlePayment}>
        <Text style={styles.confirmButtonText}>Realizar pago (${totalCost})</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    paddingBottom: 100, // Agrega más espacio en la parte inferior para el botón fijo
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 20,
  },
  leftSection: {},
  rightSection: {
    flex: 1,
  },
  header: {
    marginTop: 20,
    marginBottom: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  orderSummary: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  addressContainer: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addressInput: {
    borderWidth: 1,
    borderColor: '#666',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'stretch', // Estira el input para ocupar todo el ancho
  },
  instructionsInput: {
    borderWidth: 1,
    borderColor: '#666',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'stretch', // Estira el input para ocupar todo el ancho
  },
  selectedProductContainer: {
    marginBottom: 40,
  },
  deliveryTimeContainer: {
    backgroundColor: '#D3D3D3',
    padding: 10,
    marginTop: 10, borderRadius: 5,
  },
  deliveryTimeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  deliveryOption: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: '#D0D0D0',
  },
  deliveryOptionText: {
    fontSize: 16,
    color: '#333',
  },
  paymentMethod: {
    marginBottom: 40,
  },
  paymentButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  paymentButtonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  summaryContainer: {
    backgroundColor: '#D3D3D3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 40,
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  confirmButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  horizontalLine: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  leftAlign: {
    alignSelf: 'flex-start',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#666',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#007BFF',
  },
  tipSelectionText: {
    fontSize: 13,
    marginTop: 10,
  },
  tipButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  tipButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    width: '18%',
  },
  selectedTipButton: {
    backgroundColor: '#0056b3',
  },
  tipButtonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  utensilsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  utensilsText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default OrderPayment;
