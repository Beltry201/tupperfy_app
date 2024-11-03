import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Switch } from 'react-native';

const OrderPayment = ({ navigation }: { navigation: any }) => {
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(null);
  const [needUtensils, setNeedUtensils] = useState(false);
  const [selectedTipIndex, setSelectedTipIndex] = useState(3); // 15% como predeterminado

  const selectedProduct = {
    name: 'Producto Seleccionado',
    quantity: 1,
    price: 100, // Precio del producto
  };

  const deliveryCost = selectedDeliveryOption === 'prioritaria' ? 20 : 10;
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
    navigation.navigate('OrderStatus');
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
    paddingBottom: 100,
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
    alignSelf: 'stretch',
  },
  instructionsInput: {
    borderWidth: 1,
    borderColor: '#666',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  selectedProductContainer: {
    marginBottom: 40,
  },
  utensilsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  utensilsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deliveryTimeContainer: {
    backgroundColor: '#D3D3D3',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  deliveryTimeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  deliveryOption: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
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
    borderRadius: 3,
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#007BFF',
  },
  deliveryOptionText: {
    fontSize: 16,
  },
  paymentMethod: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  paymentButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  paymentButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  summaryContainer: {
    marginBottom: 40,
  },
  itemText: {
    fontSize: 16,
    marginVertical: 2,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  tipSelectionText: {
    fontSize: 16,
    marginTop: 10,
  },
  tipButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  tipButton: {
    backgroundColor: '#D3D3D3',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedTipButton: {
    backgroundColor: '#007BFF',
  },
  tipButtonText: {
    fontWeight: 'bold',
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#28A745',
    paddingVertical: 15,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  confirmButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default OrderPayment;
