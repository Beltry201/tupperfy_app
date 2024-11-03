import React, { useState } from 'react';
import { Alert, View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, Switch } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const MenuView = () => {
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventInstructions, setEventInstructions] = useState('');
  const [needUtensils, setNeedUtensils] = useState(false);
  const [repeatEvent, setRepeatEvent] = useState('Nunca');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [notificationAlert, setNotificationAlert] = useState('2 horas antes');
  const [paymentMethod, setPaymentMethod] = useState('Tarjeta crédito/débito');
  const [tipPercentage, setTipPercentage] = useState(10);
  const [dishes, setDishes] = useState([{ name: '' }]);
  const [events, setEvents] = useState([]);

  // Estados y funciones para manejar la visibilidad de los pickers
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isNotificationPickerVisible, setNotificationPickerVisible] = useState(false);
  const [isPaymentMethodPickerVisible, setPaymentMethodPickerVisible] = useState(false);
  const [showRepeatEventPicker, setShowRepeatEventPicker] = useState(false);
  const [isTipPickerVisible, setTipPickerVisible] = useState(false);


  const handleSaveEvent = () => {
    const eventDetails = {
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
    };

    setEvents([...events, eventDetails]);
    clearForm();
  };

  const clearForm = () => {
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

  const markedDates = events.reduce((acc, event) => {
    acc[event.selectedDate] = { marked: true, dotColor: '#007AFF' };
    return acc;
  }, {});

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

  const handleEditEvent = (index) => {
    const selectedEvent = events[index];
    setSelectedDate(selectedEvent.selectedDate);
    setEventName(selectedEvent.eventName);
    setEventLocation(selectedEvent.eventLocation);
    setNeedUtensils(selectedEvent.needUtensils);
    setRepeatEvent(selectedEvent.repeatEvent);
    setDeliveryTime(selectedEvent.deliveryTime);
    setNotificationAlert(selectedEvent.notificationAlert);
    setPaymentMethod(selectedEvent.paymentMethod);
    setTipPercentage(selectedEvent.tipPercentage);
    setDishes(selectedEvent.dishes);
    setShowCreateEvent(true);
  };

  const handleDeleteEvent = (index) => {
    Alert.alert(
      'Eliminar Evento',
      '¿Estás seguro que deseas eliminar este evento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            const updatedEvents = [...events];
            updatedEvents.splice(index, 1);
            setEvents(updatedEvents);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Menú Personalizado</Text>
      <Text style={styles.subtitle}>Crea tu menú personalizado</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.calendarContainer}>
          <Calendar
            current={selectedDate}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
              setShowCreateEvent(true); // Mostrar los inputs al seleccionar una fecha
            }}
            markedDates={{
              ...markedDates,
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
          />
        </View>
        <View style={styles.horizontalLine} />

        {events.map((event, index) => (
          <View key={index} style={styles.savedEventContainer}>
            <Text style={styles.sectionTitle}>{`Nombre de menú`}</Text>
            <Text>{`Fecha: ${moment(event.selectedDate).format('MMMM DD, YYYY')}`}</Text>
            <Text>{`Productos: ${event.dishes.map((dish) => dish.name).join(', ')}`}</Text>
            <Text>{`Dirección: ${eventLocation}`}</Text>
            <Text>{`Instrucciones: ${eventInstructions}`}</Text>            
            <Text>{`Hora de entrega: ${event.deliveryTime}`}</Text>
            <Text>{`¿Necesitas cubiertos? : ${event.needUtensils}`}</Text>
            <Text>{`Método de Pago: ${event.paymentMethod}`}</Text>
            <Text>{`Costo Final: $${calculateTotalCost()}`}</Text>
            <View style={styles.eventOptions}>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditEvent(index)}>
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteEvent(index)}>
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {showCreateEvent && (
          <View style={styles.eventSection}>
            <TouchableOpacity style={styles.hideButton} onPress={() => setShowCreateEvent(false)}>
              <Text style={styles.hideButtonText}>Ocultar</Text>
            </TouchableOpacity>
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
             <TextInput
              style={styles.instructionsInput}
              placeholder="Instrucciones"
              placeholderTextColor="#666"
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
              headerTextIOS="Seleccionar hora"
              cancelTextIOS="Cancelar"
            />
            <View style={styles.switchContainer}>
              <Text style={styles.label}>¿Necesitas cubiertos?</Text>
              <Switch value={needUtensils} onValueChange={setNeedUtensils} />
            </View>
            <View style={styles.horizontalLine} />
            <TouchableOpacity style={styles.pickerContainer} onPress={showNotificationPicker}>
              <Text style={styles.subtitle}>Recordatorio:</Text>
              <Text>{notificationAlert}</Text>
            </TouchableOpacity>
            {isNotificationPickerVisible && (
              <Picker
                selectedValue={notificationAlert}
                onValueChange={(itemValue) => {
                  setNotificationAlert(itemValue);
                  hideNotificationPicker();
                }}
              >
                <Picker.Item label="1 día antes" value="1 día antes" />
                <Picker.Item label="12 horas antes" value="12 horas antes" />
                <Picker.Item label="5 horas antes" value="5 horas antes" />
                <Picker.Item label="3 horas antes" value="3 horas antes" />
                <Picker.Item label="2 horas" value="2 horas antes" />
                <Picker.Item label="1 hora antes" value="1 hora antes" />
              </Picker>
            )}

            <TouchableOpacity style={styles.pickerContainer} onPress={showPaymentMethodPicker}>
              <Text style={styles.subtitle}>Método de Pago:</Text>
              <Text>{paymentMethod}</Text>
            </TouchableOpacity>
            {isPaymentMethodPickerVisible && (
              <Picker
                selectedValue={paymentMethod}
                onValueChange={(itemValue) => {
                  setPaymentMethod(itemValue);
                  hidePaymentMethodPicker();
                }}
              >
                <Picker.Item label="Tarjeta crédito/débito" value="Tarjeta crédito/débito" />
                <Picker.Item label="PayPal" value="PayPal" />
                <Picker.Item label="Efectivo" value="Efectivo" />
              </Picker>
            )}

            <TouchableOpacity style={styles.pickerContainer} onPress={() => setShowRepeatEventPicker(true)}>
              <Text style={styles.subtitle}>Repetir Evento:</Text>
              <Text>{repeatEvent}</Text>
            </TouchableOpacity>
            {showRepeatEventPicker && (
              <Picker
                selectedValue={repeatEvent}
                onValueChange={(itemValue) => {
                  setRepeatEvent(itemValue);
                  setShowRepeatEventPicker(false); // Ocultar el picker después de seleccionar
                }}
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

            <TouchableOpacity style={styles.pickerContainer} onPress={() => setTipPickerVisible(true)}>
              <Text style={styles.subtitle}>Propina:</Text>
              <Text>{`${tipPercentage}%`}</Text>
            </TouchableOpacity>
            {isTipPickerVisible && (
              <Picker
                selectedValue={tipPercentage}
                onValueChange={(itemValue) => {
                  setTipPercentage(itemValue);
                  setTipPickerVisible(false); // Ocultar el picker después de seleccionar
                }}
              >
               <Picker.Item label="0%" value={0} />
               <Picker.Item label="5%" value={5} />
                <Picker.Item label="10%" value={10} />
                <Picker.Item label="15%" value={15} />
                <Picker.Item label="20%" value={20} />
              </Picker>
            )}

            {/* Resumen de pago */}
            <View style={styles.paymentSummaryContainer}>
              <Text style={styles.sectionTitle}>Resumen de Pago</Text>
              <Text>{`Costo de productos: $${(dishes.length * 10).toFixed(2)}`}</Text>
              <Text>{`Costo de envío: $5.00`}</Text>
              <Text>{`Propina (${tipPercentage}%): $${calculateTip()}`}</Text>
              <Text style={styles.totalCostText}>{`Costo Total: $${calculateTotalCost()}`}</Text>
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
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: 'bold', // Quitamos el bold
    textAlign: 'left',   // Alineamos a la derecha
    paddingRight: 20,     // Añadimos un padding derecho para moverlo a la derecha
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
  scrollViewContent: {
    paddingHorizontal: 20,
  },
  calendarContainer: {
    marginVertical: 20,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginVertical: 20,
  },
  savedEventContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#FAFAFA',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.5,
    shadowRadius: 3,
  },
  eventOptions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  editButtonText: {
    color: '#FFFFFF',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  dishesContainer: {
    marginBottom: 20,
  },
  dishItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  utensilsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  utensilsText: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  dishInput: {
    flex: 1,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  removeButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#FF6347',
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonIcon: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  timePickerContainer: {
    marginBottom: 20,
  },
  timePicker: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F0F0F0',
  },
  monthText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  yearText: {
    fontSize: 14,
    color: '#666666',
  },
  pickerContainer: {
    marginBottom: 20,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  switchText: {
    marginRight: 10,
  },
  hideButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  hideButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  paymentSummaryContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#F7F7F7',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  totalCostText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default MenuView;
