import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

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

  const handleSaveChanges = () => {
    // Aquí se debe implementar la lógica para guardar los cambios de manera permanente
    // Por ejemplo, puedes guardar los datos en AsyncStorage o enviarlos a tu backend

    // En este ejemplo, solo actualizamos el estado localmente
    setEditing(false); // Desactiva el modo de edición
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
              onChangeText={setEmail}
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

      {/* Botón para guardar cambios */}
      {isEditing && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      )}

      {/* Modal para cambiar la contraseña */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cambiar Contraseña</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Nueva Contraseña"
              secureTextEntry={true}
            />
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
    color: '#333333',
  },
  detailText: {
    fontSize: 16,
    color: '#666666',
  },
  changePasswordLink: {
    marginBottom: 12,
  },
  changePasswordText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  asterisks: {
    alignItems: 'flex-start',
  },
  asteriskText: {
    color: '#333333',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#333333',
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default ProfileData;
