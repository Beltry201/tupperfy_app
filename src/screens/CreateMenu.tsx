import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Switch, ScrollView, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const CreateMenu = () => {
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [needUtensils, setNeedUtensils] = useState(false);
  const [repeatEvent, setRepeatEvent] = useState('Nunca');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [notificationAlert, setNotificationAlert] = useState('2 horas antes');
  const [paymentMethod, setPaymentMethod] = useState('Tarjeta crédito/débito');
  const [tipPercentage, setTipPercentage] = useState(10); // Estado para manejar el porcentaje de propina
  const [dishes, setDishes] = useState([{ name: '' }]); // Estado para los nombres de los platillos

  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isNotificationPickerVisible, setNotificationPickerVisible] = useState(false);
  const [isPaymentMethodPickerVisible, setPaymentMethodPickerVisible] = useState(false);
  const [showRepeatEventPicker, setShowRepeatEventPicker] = useState(false);

  const handleAddEvent = () => {
    setShowCreateEvent(true);
  };

  const handleSaveEvent = () => {
    console.log('Evento guardado:', {
      selectedDate,
      eventName,
      eventLocation,
      needUtensils,
      repeatEvent,
      deliveryTime,
      notificationAlert,
      paymentMethod,
      tipPercentage,
      dishes,
    });
    setSelectedDate('');
    setEventName('');
    setEventLocation('');
    setNeedUtensils(false);
    setRepeatEvent('Nunca');
    setDeliveryTime('');
    setNotificationAlert('2 horas antes');
    setPaymentMethod('Tarjeta crédito/débito');
    setTipPercentage(10);
    setDishes([{ name: '' }]);
    setShowCreateEvent(false);
    setShowRepeatEventPicker(false);
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const showNotificationPicker = () => {
    setNotificationPickerVisible(true);
  };

  const hideNotificationPicker = () => {
    setNotificationPickerVisible(false);
  };

  const showPaymentMethodPicker = () => {
    setPaymentMethodPickerVisible(true);
  };

  const hidePaymentMethodPicker = () => {
    setPaymentMethodPickerVisible(false);
  };

  const handleTimeConfirm = (time) => {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    const formattedTime = `${hours}:${minutes} ${ampm}`;

    setDeliveryTime(formattedTime);
    hideTimePicker();
  };

  const toggleRepeatEventPicker = () => {
    setShowRepeatEventPicker(!showRepeatEventPicker);
  };

  const handleAddDish = () => {
    setDishes([...dishes, { name: '' }]);
  };

  const handleRemoveDish = (index) => {
    const updatedDishes = [...dishes];
    updatedDishes.splice(index, 1);
    setDishes(updatedDishes);
  };

  const handleDishNameChange = (text, index) => {
    const updatedDishes = [...dishes];
    updatedDishes[index].name = text;
    setDishes(updatedDishes);
  };

  const renderCustomHeader = (date) => {
    const monthName = moment(date).format('MMMM'); // Obtener nombre del mes
    const year = moment(date).format('YYYY'); // Obtener año
    return (
      <View style={styles.customHeader}>
        <Text style={styles.monthText}>{monthName}</Text>
        <Text style={styles.yearText}>{year}</Text>
      </View>
    );
  };

  // Calcular el costo total
  const calculateTotalCost = () => {
    // Supongamos que tienes estos valores definidos en alguna parte del código
    const selectedProductPrice = 10; // Ejemplo de precio de producto
    const deliveryCost = 5; // Ejemplo de costo de envío
    const tipAmount = (selectedProductPrice + deliveryCost) * (tipPercentage / 100);
    const total = selectedProductPrice + deliveryCost + tipAmount;
    return total.toFixed(2); // Redondear el total a 2 decimales
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crea tu menú personalizado</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.calendarContainer}>
          <Calendar
            current={selectedDate}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#007AFF' },
            }}
            theme={{
              calendarBackground: '#FFFFFF',
              textSectionTitleColor: '#333333',
              selectedDayBackgroundColor: '#EAEAEA',
              selectedDayTextColor: '#333333',
              todayTextColor: '#007AFF',
              dayTextColor: '#333333',
              textDisabledColor: '#CCCCCC',
              arrowColor: '#007AFF',
              monthTextColor: '#333333',
            }}
            renderHeader={renderCustomHeader}
          />
        </View>
        {showCreateEvent && (
          <View style={styles.eventSection}>
            <Text style={styles.sectionTitle}>Detalles del Evento</Text>
            <Text style={styles.selectedDate}>
              {selectedDate ? moment(selectedDate).format('MMMM DD, YYYY') : 'Selecciona una fecha'}
            </Text>
            <View style={styles.dishesContainer}>
              <Text style={styles.sectionTitle}>Productos seleccionados</Text>
              {dishes.map((dish, index) => (
                <View key={index} style={styles.dishItem}>
                  <TextInput
                    style={styles.dishInput}
                    placeholder={`Producto ${index + 1}`}
                    value={dish.name}
                    onChangeText={(text) => handleDishNameChange(text, index)}
                  />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveDish(index)}
                  >
                    <Text style={styles.removeButtonText}>-</Text>
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity style={styles.addButton} onPress={handleAddDish}>
                <Text style={styles.addButtonIcon}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.sectionTitle}>Dirección de entrega</Text>
            <TextInput
              style={styles.input}
              placeholder="Dirección de entrega"
              value={eventLocation}
              onChangeText={(text) => setEventLocation(text)}
            />
             <View style={styles.horizontalLine} />
            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>Necesitas Cubiertos?</Text>
              <Switch
                value={needUtensils}
                onValueChange={(value) => setNeedUtensils(value)}
                trackColor={{ false: '#CCCCCC', true: '#007AFF' }}
                thumbColor={needUtensils ? '#FFFFFF' : '#CCCCCC'}
              />
            </View>
            <View style={styles.timePickerContainer}>
              <Text style={styles.subtitle}>Hora de Entrega:</Text>
              <TouchableOpacity style={styles.timePicker} onPress={showTimePicker}>
                <Text style={styles.deliveryTime}>{deliveryTime ? deliveryTime : 'Selecciona la hora'}</Text>
              </TouchableOpacity>
            </View>
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleTimeConfirm}
              onCancel={hideTimePicker}
              headerTextIOS="Selecciona una Hora"
              cancelTextIOS="Cancelar"
              confirmTextIOS="Confirmar"
              locale="es_ES"
              is24Hour={false}
            />
                        <View style={styles.horizontalLine} />
            <View style={styles.repeatEventContainer}>
              <Text style={styles.subtitle}>Repetir:</Text>
              <TouchableOpacity style={styles.repeatEventPicker} onPress={toggleRepeatEventPicker}>
                <Text style={styles.deliveryTime}>{repeatEvent}</Text>
              </TouchableOpacity>
            </View>
            {showRepeatEventPicker && (
              <Picker
                selectedValue={repeatEvent}
                style={styles.picker}
                onValueChange={(itemValue) => setRepeatEvent(itemValue)}
              >
                <Picker.Item label="Nunca" value="Nunca" />
                <Picker.Item label="Cada Lunes" value="Cada Lunes" />
                <Picker.Item label="Siempre" value="Siempre" />
              </Picker>
            )}
                <View style={styles.horizontalLine} />
            <Text style={styles.subtitle}>Alerta de Notificación</Text>
            <TouchableOpacity style={styles.picker} onPress={showNotificationPicker}>
              <Text style={styles.pickerText}>{notificationAlert}</Text>
            </TouchableOpacity>
            {isNotificationPickerVisible && (
              <Picker
                selectedValue={notificationAlert}
                style={styles.picker}
                onValueChange={(itemValue) => {
                  setNotificationAlert(itemValue);
                  hideNotificationPicker();
                }}
              >
                <Picker.Item label="2 horas antes" value="2 horas antes" />
                <Picker.Item label="1 hora antes" value="1 hora antes" />
              </Picker>
            )}
            <Text style={styles.subtitle}>Método de Pago</Text>
            <TouchableOpacity style={styles.picker} onPress={showPaymentMethodPicker}>
              <Text style={styles.pickerText}>{paymentMethod}</Text>
            </TouchableOpacity>
            {isPaymentMethodPickerVisible && (
              <Picker
                selectedValue={paymentMethod}
                style={styles.picker}
                onValueChange={(itemValue) => {
                  setPaymentMethod(itemValue);
                  hidePaymentMethodPicker();
                }}
              >
                <Picker.Item label="Tarjeta crédito/débito" value="Tarjeta crédito/débito" />
                <Picker.Item label="Efectivo" value="Efectivo" />
              </Picker>
            )}

            {/* Lista de platillos */}

            {/* Resumen de Pago */}
            <View style={styles.summaryContainer}>
              <Text style={styles.sectionTitle}>Resumen de Pago</Text>
              <View style={styles.horizontalLine} />
              {/* Detalles del costo */}
              {dishes.map((dish, index) => (
                <Text key={index} style={styles.itemText}>{dish.name}Costo de productos: $10.00</Text>
              ))}
              <Text style={styles.itemText}>Envío: $5.00</Text>
              <Text style={styles.itemText}>Propina: ${(15 * (tipPercentage / 100)).toFixed(2)}</Text>
              {/* Total */}
              <Text style={styles.totalText}>Total: ${calculateTotalCost()}</Text>

              {/* Opciones de selección de propina */}
              <Text style={styles.subtitle}>Selecciona la propina para tu repartidor:</Text>
              <View style={styles.tipButtonsContainer}>
                <TouchableOpacity
                  style={[styles.tipButton, tipPercentage === 0 && styles.selectedTipButton]}
                  onPress={() => setTipPercentage(0)}
                >
                  <Text style={styles.tipButtonText}>0%</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tipButton, tipPercentage === 5 && styles.selectedTipButton]}
                  onPress={() => setTipPercentage(5)}
                >
                  <Text style={styles.tipButtonText}>5%</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tipButton, tipPercentage === 10 && styles.selectedTipButton]}
                  onPress={() => setTipPercentage(10)}
                >
                  <Text style={styles.tipButtonText}>10%</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tipButton, tipPercentage === 15 && styles.selectedTipButton]}
                  onPress={() => setTipPercentage(15)}
                >
                  <Text style={styles.tipButtonText}>15%</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tipButton, tipPercentage === 20 && styles.selectedTipButton]}
                  onPress={() => setTipPercentage(20)}
                >
                  <Text style={styles.tipButtonText}>20%</Text>
                </TouchableOpacity>
              </View>
              {/* Mostrar el valor de la propina */}
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveEvent}>
                <Text style={styles.saveButtonText}>Guardar evento</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
        <Text style={styles.addButtonIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    marginTop: 20,
    width: '90%',
    aspectRatio: 1,
    overflow: 'hidden',
  },
  eventSection: {
    marginTop: 20,
    width: '90%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedDate: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    width: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  switchText: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
    color: '#333333',
    fontWeight: 'bold',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  pickerText: {
    fontSize: 16,
    color: '#333333',
  },
  timePickerContainer: {
    marginBottom: 10,
    width: '100%',
  },
  timePicker: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    width: '100%',
  },
  deliveryTime: {
    fontSize: 16,
    color: '#333333',
  },
  repeatEventContainer: {
    marginBottom: 10,
    width: '100%',
  },
  repeatEventPicker: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 45,
    right: 20,
    backgroundColor: '#007AFF',
    width: 37,
    height: 37,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonIcon: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  yearText: {
    fontSize: 16,
    color: '#333333',
  },
  summaryContainer: {
    marginTop: 20,
    width: '100%',
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333333',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333333',
  },
  tipButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 25,
  },
  tipButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  selectedTipButton: {
    backgroundColor: '#4CAF50', // Color de fondo cuando está seleccionado
  },
  tipButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  dishesContainer: {
    marginTop: 20,
    width: '100%',
  },
  dishItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dishInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  removeButton: {
    marginLeft: 5,
    backgroundColor: '#FF4500',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default CreateMenu;
