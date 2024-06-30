import React, { useState } from 'react';
import { View, StyleSheet, Text, Switch, ScrollView, TextInput, TouchableOpacity } from 'react-native';
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
  const [tipPercentage, setTipPercentage] = useState(10);
  const [dishes, setDishes] = useState([{ name: '' }]);

  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isNotificationPickerVisible, setNotificationPickerVisible] = useState(false);
  const [isPaymentMethodPickerVisible, setPaymentMethodPickerVisible] = useState(false);
  const [showRepeatEventPicker, setShowRepeatEventPicker] = useState(false);

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
    const monthName = moment(date).format('MMMM');
    const year = moment(date).format('YYYY');
    return (
      <View style={styles.customHeader}>
        <Text style={styles.monthText}>{monthName}</Text>
        <Text style={styles.yearText}>{year}</Text>
      </View>
    );
  };

  const calculateTip = () => {
    const productCost = dishes.length * 10;
    const deliveryCost = 5;
    const tipAmount = (productCost + deliveryCost) * (tipPercentage / 100);
    return tipAmount.toFixed(2);
  };

  const calculateTotalCost = () => {
    const productCost = dishes.length * 10;
    const deliveryCost = 5;
    const tipAmount = parseFloat(calculateTip());
    const total = productCost + deliveryCost + tipAmount;
    return total.toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crea tu menú personalizado</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.calendarContainer}>
          <Calendar
            current={selectedDate}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
              setShowCreateEvent(true); // Mostrar los inputs al seleccionar una fecha
            }}
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
              onChangeText={setEventLocation}
            />
            <View style={styles.timePickerContainer}>
              <Text style={styles.subtitle}>Hora de entrega:</Text>
              <TouchableOpacity style={styles.timePicker} onPress={showTimePicker}>
                <Text>{deliveryTime ? deliveryTime : 'Seleccionar hora'}</Text>
              </TouchableOpacity>
            </View>
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleTimeConfirm}
              onCancel={hideTimePicker}
              headerTextIOS="Selecciona la hora"
              confirmTextIOS="Confirmar"
              cancelTextIOS="Cancelar"
            />
           <View style={styles.pickerContainer}>
              <Text style={styles.subtitle}>Recordatorio:</Text>
              <TouchableOpacity style={styles.picker} onPress={showNotificationPicker}>
                <Text>{notificationAlert}</Text>
              </TouchableOpacity>
              {isNotificationPickerVisible && (
                <Picker
                  selectedValue={notificationAlert}
                  onValueChange={(itemValue) => {
                    setNotificationAlert(itemValue);
                    hideNotificationPicker(); // Oculta el Picker después de seleccionar un valor
                  }}
                  style={styles.picker}
                  onBlur={hideNotificationPicker} // También se oculta cuando el Picker pierde el foco
                >
                  <Picker.Item label="2 horas antes" value="2 horas antes" />
                  <Picker.Item label="1 día antes" value="1 día antes" />
                  <Picker.Item label="15 minutos antes" value="15 minutos antes" />
                </Picker>
              )}
            </View>
            <View style={styles.horizontalLine} />
              <View style={styles.pickerContainer}>
                <Text style={styles.subtitle}>Método de Pago:</Text>
                <TouchableOpacity style={styles.picker} onPress={showPaymentMethodPicker}>
                  <Text>{paymentMethod}</Text>
                </TouchableOpacity>
                {isPaymentMethodPickerVisible && (
                  <Picker
                    selectedValue={paymentMethod}
                    onValueChange={(itemValue) => {
                      setPaymentMethod(itemValue);
                      hidePaymentMethodPicker(); // Oculta el Picker después de seleccionar un valor
                    }}
                    style={styles.picker}
                    onBlur={hidePaymentMethodPicker} // También se oculta cuando el Picker pierde el foco
                  >
                    <Picker.Item label="Tarjeta crédito/débito" value="Tarjeta crédito/débito" />
                    <Picker.Item label="Efectivo" value="Efectivo" />
                    <Picker.Item label="PayPal" value="PayPal" />
                  </Picker>
                )}    
            </View>
            <View style={styles.paymentSummaryContainer}>
              <Text style={styles.subtitle}>Resumen de Pago:</Text>
              <Text style={styles.paymentSummaryText}>Costo de productos: ${dishes.length * 10}</Text>
              <Text style={styles.paymentSummaryText}>Costo de envío: $5</Text>
              <Text style={styles.paymentSummaryText}>Propina: ${calculateTip()}</Text>
              <Text style={styles.totalCostText}>Costo Total: ${calculateTotalCost()}</Text>
            </View>
            <View style={styles.horizontalLine} />
              <View style={styles.repeatEventContainer}>
                <Text style={styles.subtitle}>Repetir Evento:</Text>
                <TouchableOpacity style={styles.picker} onPress={toggleRepeatEventPicker}>
                  <Text>{repeatEvent}</Text>
                </TouchableOpacity>
                {showRepeatEventPicker && (
                  <Picker
                    selectedValue={repeatEvent}
                    onValueChange={(itemValue) => {
                      setRepeatEvent(itemValue);
                      toggleRepeatEventPicker(); // Oculta el Picker después de seleccionar un valor
                    }}
                    style={styles.picker}
                    onBlur={toggleRepeatEventPicker} // También se oculta cuando el Picker pierde el foco
                  >
                    <Picker.Item label="Nunca" value="Nunca" />
                    <Picker.Item label="Siempre" value="Siempre" />
                    <Picker.Item label="Lunes" value="Lunes" />
                    <Picker.Item label="Martes" value="Martes" />
                    <Picker.Item label="Miércoles" value="Miércoles" />
                    <Picker.Item label="Jueves" value="Jueves" />
                    <Picker.Item label="Viernes" value="Viernes" />
                    <Picker.Item label="Sábado" value="Sábado" />
                    <Picker.Item label="Domingo" value="Domingo" />
                  </Picker>
                )}


            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveEvent}>
              <Text style={styles.saveButtonText}>Guardar Evento</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
    textAlign: 'center',
  },
  calendarContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#007AFF',
  },
  monthText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  yearText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  eventSection: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    color: '#333333',
  },
  selectedDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
  },
  timePickerContainer: {
    marginBottom: 20,
  },
  timePicker: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#FFFFFF',
    color: '#333333',
  },
  dishesContainer: {
    marginBottom: 20,
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
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#FFFFFF',
    color: '#333333',
    marginRight: 10,
  },
  removeButton: {
    borderWidth: 1,
    borderColor: '#FF0000',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  removeButtonText: {
    color: '#FF0000',
  },
  addButton: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonIcon: {
    fontSize: 24,
    color: '#007AFF',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  switchText: {
    fontSize: 16,
    color: '#333333',
  },
  pickerContainer: {
    marginBottom: 20,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#FFFFFF',
    color: '#333333',
  },
  tipInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#FFFFFF',
    color: '#333333',
    width: 50,
    marginRight: 10,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginVertical: 20,
  },
  repeatEventContainer: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 10,
  },
  paymentSummaryContainer: {
    marginBottom: 20,
  },
  paymentSummaryText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 5,
  },
  totalCostContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  totalCostText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 50,
  },
});

export default CreateMenu;
