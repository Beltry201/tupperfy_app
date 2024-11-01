import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

const TupperfyPremium = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSelectSubscription = (subscription) => {
    setSelectedSubscription(subscription);
  };

  const handleProceedToPayment = () => {
    if (selectedSubscription) {
      // Lógica para proceder al pago
      console.log(`Proceeding to payment with ${selectedSubscription} subscription`);
      handleCloseModal();
    }
  };

  const monthlyCost = 6.99;
  const annualCost = 72.99;
  const annualCostOfMonthly = monthlyCost * 12;
  const savings = annualCostOfMonthly - annualCost;
  const extraCost = annualCostOfMonthly - annualCost;
  const monthlyCostAnnual = (annualCost / 12).toFixed(2);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Suscripción Premium</Text>
      <View style={styles.separator} />
      <Text style={styles.description}>
        Disfruta de todos los beneficios de ser usuario premium en Tupperfy:
      </Text>
      <View style={styles.benefit}>
        <IoniconsIcon name="restaurant" size={20} color="#333" />
        <Text style={styles.benefitText}>Platillos privados de chefs</Text>
      </View>
      <View style={styles.benefit}>
        <IoniconsIcon name="pricetag" size={20} color="#333" />
        <Text style={styles.benefitText}>Descuentos exclusivos</Text>
      </View>
      <View style={styles.benefit}>
        <IoniconsIcon name="rocket" size={20} color="#333" />
        <Text style={styles.benefitText}>Envíos con prioridad</Text>
      </View>
      <View style={styles.benefit}>
        <IoniconsIcon name="headset" size={20} color="#333" />
        <Text style={styles.benefitText}>Soporte al cliente 24/7</Text>
      </View>
      <View style={styles.benefit}>
        <IoniconsIcon name="book" size={20} color="#333" />
        <Text style={styles.benefitText}>Acceso a cursos de cocina y recetas privadas</Text>
      </View>
      <View style={styles.benefit}>
        <IoniconsIcon name="person" size={20} color="#333" />
        <Text style={styles.benefitText}>Poder elegir a tu cocinero favorito en ‘Mi Menu’</Text>
      </View>
      <View style={styles.benefit}>
        <IoniconsIcon name="fitness" size={20} color="#333" />
        <Text style={styles.benefitText}>Crear un plan de alimentación detallado a tus objetivos</Text>
      </View>
      <View style={styles.benefit}>
        <IoniconsIcon name="chatbubbles" size={20} color="#333" />
        <Text style={styles.benefitText}>Chat con los cocineros</Text>
      </View>
      <View style={styles.benefit}>
        <IoniconsIcon name="gift" size={20} color="#333" />
        <Text style={[styles.benefitText, { fontStyle: 'italic' }]}>*Pedidos gratis en tu cumpleaños*</Text>
      </View>

      <Text style={styles.freeTrial}>Disfruta de 30 días de Tupperfy premium gratis</Text>

      <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
        <Text style={styles.buttonText}>Vuelvete Premium</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Elige tu suscripción</Text>
            <TouchableOpacity
              style={[
                styles.subscriptionOption,
                selectedSubscription === 'mensual' && styles.selectedOption,
              ]}
              onPress={() => handleSelectSubscription('mensual')}
            >
              <Text style={styles.price}>Mensual: $6.99 USD</Text>
              <Text style={styles.note}>Total anual: ${annualCostOfMonthly.toFixed(2)} USD</Text>
              <Text style={styles.note}>
                {`Costará $${extraCost.toFixed(2)} USD más al año en comparación con la suscripción anual.`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.subscriptionOption,
                selectedSubscription === 'anual' && styles.selectedOption,
              ]}
              onPress={() => handleSelectSubscription('anual')}
            >
              <Text style={styles.price}>Anual: $72.99 USD</Text>
              <Text style={styles.note}>Total anual: ${annualCost.toFixed(2)} USD</Text>
              <Text style={styles.note}>{`Costo mensual: $${monthlyCostAnnual} USD`}</Text>
              <Text style={styles.note}>
                {`Ahorrarás $${savings.toFixed(2)} USD al año en comparación con la suscripción mensual.`}
              </Text>
            </TouchableOpacity>
            <Text style={styles.paymentNote}>
              * El cargo se realizará anualmente o mensualmente a tu método de pago registrado.
            </Text>
            <TouchableOpacity
              style={[styles.proceedButton, !selectedSubscription && styles.disabledButton]}
              onPress={handleProceedToPayment}
              disabled={!selectedSubscription}
            >
              <Text style={styles.proceedButtonText}>Proceder al Pago</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={styles.cancelNote}>Cancela tu suscripción cuando lo desees</Text>
    </ScrollView>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666666',
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  benefitText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  freeTrial: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#006BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    shadowOpacity: 1.5,
    shadowColor: 'gray',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  subscriptionOption: {
    marginBottom: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
  },
  selectedOption: {
    borderColor: '#FF6347',
    backgroundColor: '#FF6347',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  note: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
  },
  paymentNote: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 16,
    textAlign: 'center',
  },
  proceedButton: {
    backgroundColor: '#006BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowOpacity: 1.5,
    shadowColor: 'gray',
  },
  proceedButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    shadowOpacity: 1.5,
    shadowColor: 'gray',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  cancelNote: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default TupperfyPremium;
