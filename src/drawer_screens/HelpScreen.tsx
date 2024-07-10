// HelpScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HelpScreen = () => {
  const [loading, setLoading] = useState(true);
  const [faqVisible, setFaqVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2000 ms de retraso

    return () => clearTimeout(timer);
  }, []);

  const toggleFaqVisibility = () => {
    setFaqVisible(!faqVisible);
  };

  const toggleModalVisibility = () => {
    setModalVisible(!modalVisible);
  };

  const handleSendFeedback = () => {
    // Aquí puedes implementar la lógica para enviar el feedback
    // Por ahora, solo muestra el texto del feedback en un alert
    alert(`Feedback enviado: ${feedbackText}`);
    setFeedbackText(''); // Limpia el campo de texto después de enviar
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Ayuda</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Preguntas Frecuentes (FAQ)</Text>
        <TouchableOpacity style={styles.button} onPress={toggleFaqVisibility}>
          <Text style={styles.buttonText}>{faqVisible ? 'Ocultar Preguntas' : 'Mostrar Preguntas'}</Text>
        </TouchableOpacity>
        {faqVisible && (
          <View>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>¿Cómo puedo crear una cuenta?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>¿Cómo puedo recuperar mi contraseña?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>¿Cómo realizo un pedido?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>¿Qué métodos de pago aceptan?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>¿Cómo puedo modificar o cancelar un pedido?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>¿Cuál es el tiempo estimado de entrega?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>¿Puedo programar una entrega para una fecha y hora específica?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>¿Cómo funciona la opción de menú personalizado?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>¿Cómo puedo contactar al chef?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>¿Qué medidas de seguridad alimentaria siguen los cocineros?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>¿Qué hago si tengo una alergia alimentaria?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>¿Puedo dejar una reseña o calificación para los chefs?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>¿Cómo funciona el sistema de propinas?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>¿Cómo puedo aplicar un código de promoción o descuento?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>¿Qué hago si tengo un problema con mi pedido?</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Contacto con Soporte</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SupportChat')}
        >
          <Text style={styles.buttonText}>Chatear con Soporte</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Reportar un Problema</Text>
        <TouchableOpacity style={styles.button} onPress={toggleModalVisibility}>
          <Text style={styles.buttonText}>Reportar</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModalVisibility}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Reportar un Problema</Text>

              <ScrollView>
                <Text style={styles.modalSectionHeader}>Problemas con el Pedido</Text>
                <TouchableOpacity style={styles.item}>
                  <Text style={styles.itemText}>Pedido no entregado</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                  <Text style={styles.itemText}>Pedido incorrecto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                  <Text style={styles.itemText}>Pedido incompleto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                  <Text style={styles.itemText}>Comida en mal estado</Text>
                </TouchableOpacity>

                <Text style={styles.modalSectionHeader}>Problemas con la Aplicación</Text>
                <TouchableOpacity style={styles.item}>
                  <Text style={styles.itemText}>Errores en la aplicación</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                  <Text style={styles.itemText}>Problemas de inicio de sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                  <Text style={styles.itemText}>Problemas con las notificaciones</Text>
                </TouchableOpacity>

                <Text style={styles.modalSectionHeader}>Problemas con el Chef</Text>
                <TouchableOpacity style={styles.item}>
                  <Text style={styles.itemText}>Chef no responde</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                  <Text style={styles.itemText}>Problemas de comportamiento</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                  <Text style={styles.itemText}>Medidas de higiene</Text>
                </TouchableOpacity>

                <Text style={styles.modalSectionHeader}>Problemas con la Entrega</Text>
                <TouchableOpacity style={styles.item}>
                  <Text style={styles.itemText}>Entrega tarde</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                  <Text style={styles.itemText}>Entrega en dirección incorrecta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                  <Text style={styles.itemText}>Problemas con el repartidor</Text>
                </TouchableOpacity>

                <Text style={styles.modalSectionHeader}>Problemas con el Pago</Text>
                <TouchableOpacity style={styles.item}>
                  <Text style={styles.itemText}>Problemas con la tarjeta de crédito</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                  <Text style={styles.itemText}>Error al procesar el pago</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                  <Text style={styles.itemText}>Doble cobro</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                  <Text style={styles.itemText}>Cancelé y me cobraron</Text>
                </TouchableOpacity><TouchableOpacity style={styles.item}>
                  <Text style={styles.itemText}>No se aplicó mi descuento</Text>
                </TouchableOpacity>
              </ScrollView>

              <TouchableOpacity style={styles.button} onPress={toggleModalVisibility}>
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Enviar Feedback</Text>
        <TextInput
          style={styles.feedbackInput}
          multiline
          placeholder="Escribe tu feedback aquí..."
          value={feedbackText}
          onChangeText={setFeedbackText}
        />
        <TouchableOpacity style={styles.button} onPress={handleSendFeedback}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  item: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
  },
  button: {
    padding: 12,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    maxHeight: '80%', // Ajusta la altura máxima del modal
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalSectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    minHeight: 100, // Altura mínima del campo de entrada de texto
  },
});

export default HelpScreen;
