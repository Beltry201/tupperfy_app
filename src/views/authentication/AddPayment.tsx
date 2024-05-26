import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';

const AddPayment = ({ navigation }: { navigation: any }) => {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvv, setCVV] = useState<string>('');

  const formatCardNumber = (input: string): string => {
    const cleaned = input.replace(/\D/g, '');
    const cardGroups = cleaned.match(/.{1,4}/g);
    if (cardGroups) {
      return cardGroups.join(' ');
    }
    return cleaned;
  };

  const handleCardNumberChange = (input: string) => {
    setCardNumber(formatCardNumber(input));
  };

  const handleCardNameChange = (input: string) => {
    setCardName(input.toUpperCase());
  };

  const formatExpiryDate = (input: string): string => {
    const cleaned = input.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    if (formatted.length > 5) {
      Alert.alert('Fecha de vencimiento no válida.');
    }
    if (formatted.length === 5) {
      const [month, year] = formatted.split('/').map(Number);
      if (month < 1 || month > 12) {
        Alert.alert('Mes de vencimiento no válido.');
      }
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        Alert.alert('La tarjeta está vencida.');
      }
      if (year > currentYear + 20) {
        Alert.alert('Año de vencimiento no válido.');
      }
    }
    return formatted;
  };

  const formatCVV = (input: string): string => {
    return input.replace(/\D/g, '');
  };

  const handleCVVChange = (input: string) => {
    setCVV(formatCVV(input));
  };

  const handleExpiryDateChange = (input: string) => {
    setExpiryDate(formatExpiryDate(input));
  };

  const validateCardName = () => {
    const parts = cardName.split(' ').filter(Boolean);
    let firstName = parts[0] || '';
    let lastName = parts.slice(1).join(' ') || '';

    if (firstName.length > 8 || lastName.length > 11) {
      Alert.alert(
        'Error de validación',
        'El nombre debe tener un máximo de 8 caracteres para el primer nombre y 11 caracteres para el apellido.'
      );
      return false;
    }
    return true;
  };

  const validateCardExpiryDate = () => {
    const [month, year] = expiryDate.split('/').map(Number);
    if (month < 1 || month > 12) {
      Alert.alert('Mes de vencimiento no válido.');
      return false;
    }

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      Alert.alert('La tarjeta está vencida.');
      return false;
    }
    if (year > currentYear + 20) {
      Alert.alert('Año de vencimiento no válido.');
      return false;
    }
    
    return true;
  };

  const handleSave = () => {
    if (validateCardName() && validateCardExpiryDate()) {
      // Guardar los datos o realizar la acción correspondiente
      Alert.alert('Datos guardados', 'La tarjeta ha sido guardada correctamente.');
      navigation.navigate('ForgotPassword');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : -200} // Ajusta según sea necesario
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Agregar tarjeta</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>{cardNumber || 'XXXX XXXX XXXX XXXX'}</Text>
          <Text style={styles.cardText}>{cardName || 'Nombre en la tarjeta'}</Text>
          <Text style={styles.cardText}>{expiryDate || 'MM/YY'}</Text>
          <Text style={styles.cardText}>{cvv || 'CVV'}</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Número de tarjeta *</Text>
          <TextInput
            style={styles.input}
            placeholder="Número de tarjeta"
            value={cardNumber}
            onChangeText={handleCardNumberChange}
            maxLength={19}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Nombre en la tarjeta *</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre en la tarjeta"
            value={cardName}
            onChangeText={handleCardNameChange}
          />
          <Text style={styles.label}>Fecha de expiración *</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/YY"
            value={expiryDate}
            onChangeText={handleExpiryDateChange}
            maxLength={5}
          />
          <Text style={styles.label}>CVV *</Text>
          <TextInput
            style={styles.input}
            placeholder="CVV"
            value={cvv}
            onChangeText={handleCVVChange}
            maxLength={3}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
          <View style={{ marginBottom: 20 }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  card: {
    backgroundColor: '#ADD8E6',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
  },
  formContainer: {},
  input: {
    height: 40,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddPayment;
