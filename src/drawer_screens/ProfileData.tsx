import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileData = () => {
  const navigation = useNavigation();

  const [isEditing, setEditing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [defaultPassword, setDefaultPassword] = useState('password123');
  const [birthdate, setBirthdate] = useState(new Date('1990-01-01'));
  const [email, setEmail] = useState('juan@example.com');
  const [phone, setPhone] = useState('+52 123 456 7890');
  const [address, setAddress] = useState('Calle 123, Colonia Centro, Ciudad');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        const storedPhone = await AsyncStorage.getItem('phone');
        const storedAddress = await AsyncStorage.getItem('address');
        const storedBirthdate = await AsyncStorage.getItem('birthdate');

        if (storedEmail) setEmail(storedEmail);
        if (storedPhone) setPhone(storedPhone);
        if (storedAddress) setAddress(storedAddress);
        if (storedBirthdate) setBirthdate(new Date(storedBirthdate));
      } catch (error) {
        console.error('Error loading profile data:', error);
      }
    };

    loadProfileData();
  }, []);

  const toggleEditing = () => {
    setEditing(!isEditing);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleChangePassword = () => {
    setDefaultPassword(newPassword);
    setModalVisible(false);
  };

  const handleSaveChanges = async () => {
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('phone', phone);
      await AsyncStorage.setItem('address', address);
      await AsyncStorage.setItem('birthdate', birthdate.toISOString());

      console.log('Cambios guardados:', { birthdate, email, phone, address, password: defaultPassword });
      setEditing(false); // Desactiva el modo de edición
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthdate;
    setBirthdate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const hideDatepicker = () => {
    setShowDatePicker(false);
  };

  const confirmDate = () => {
    hideDatepicker();
  };

  const handleEmailChange = (text) => {
    const newEmail = text.charAt(0).toLowerCase() + text.slice(1);
    setEmail(newEmail);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>Datos del Perfil</Text>
        <TouchableOpacity style={styles.editButton} onPress={toggleEditing}>
          <Icon name="pencil" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Fecha de Nacimiento</Text>
          {isEditing ? (
            <TouchableOpacity onPress={showDatepicker}>
              <Text style={styles.detailText}>{birthdate.toDateString()}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.detailText}>{birthdate.toDateString()}</Text>
          )}
          {showDatePicker && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={showDatePicker}
              onRequestClose={hideDatepicker}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={birthdate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                  <TouchableOpacity style={styles.confirmButton} onPress={confirmDate}>
                    <Text style={styles.confirmButtonText}>Listo</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </View>
        <TouchableOpacity style={styles.changePasswordLink} onPress={toggleModal}>
          <Text style={styles.changePasswordText}>Cambiar Contraseña</Text>
          <View style={styles.asterisks}>
            <Text style={styles.asteriskText}>*******</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Correo Electrónico</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={handleEmailChange}
              placeholder="Correo Electrónico"
            />
          ) : (
            <Text style={styles.detailText}>{email}</Text>
          )}
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Teléfono</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Teléfono"
            />
          ) : (
            <Text style={styles.detailText}>{phone}</Text>
          )}
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Dirección</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Dirección"
            />
          ) : (
            <Text style={styles.detailText}>{address}</Text>
          )}
        </View>
      </View>

      {isEditing && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cambiar Contraseña</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputWithIcon}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Nueva Contraseña"
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)} style={styles.iconContainer}>
                <Icon 
                  name={isPasswordVisible ? 'eye-off' : 'eye'} 
                  size={24} 
                  color="black" 
                />
              </TouchableOpacity>
            </View>
            <Button title="Guardar Cambios" onPress={handleChangePassword} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  editButton: {
    padding: 10,
  },
  profileDetails: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  detailItem: {
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 16,
    color: '#555',
  },
  changePasswordLink: {
    marginBottom: 12,
  },
  changePasswordText: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  asterisks: {
    paddingVertical: 5,
  },
  asteriskText: {
    fontSize: 16,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputWithIcon: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  iconContainer: {
    padding: 10,
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  confirmButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ProfileData;
