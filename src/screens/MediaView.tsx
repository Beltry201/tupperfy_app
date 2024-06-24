import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const data = [
  { id: '1', backgroundColor: '#007BFF' },
  { id: '2', backgroundColor: '#007BFF' },
  { id: '3', backgroundColor: '#007BFF' },
  { id: '4', backgroundColor: '#007BFF' },
  { id: '5', backgroundColor: '#007BFF' },
  { id: '6', backgroundColor: '#007BFF' },
  { id: '7', backgroundColor: '#007BFF' },
  { id: '8', backgroundColor: '#007BFF' },
  { id: '9', backgroundColor: '#007BFF' },
  { id: '10', backgroundColor: '#007BFF' },
  { id: '11', backgroundColor: '#007BFF' },
  { id: '12', backgroundColor: '#007BFF' },
  { id: '13', backgroundColor: '#007BFF' },
  { id: '14', backgroundColor: '#007BFF' },
  { id: '15', backgroundColor: '#007BFF' },
  { id: '16', backgroundColor: '#007BFF' },
  { id: '17', backgroundColor: '#007BFF' },
  { id: '18', backgroundColor: '#007BFF' },
  { id: '19', backgroundColor: '#007BFF' },
  { id: '20', backgroundColor: '#007BFF' },
];

const MediaView = () => {
  const [likedItems, setLikedItems] = useState({});
  const [commentVisible, setCommentVisible] = useState({});

  const handleLikePress = (itemId) => {
    setLikedItems((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const toggleCommentVisibility = (itemId) => {
    setCommentVisible((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item, { backgroundColor: item.backgroundColor }]}>
      <View style={styles.content}>
        <View style={styles.rectangle} />
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.circle} onPress={() => console.log('Circle pressed')}>
            <FontAwesome5Icon name="user" size={30} color="#007BFF" style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => handleLikePress(item.id)}>
              <AntDesignIcon
                name="heart"
                size={30}
                color={likedItems[item.id] ? 'red' : 'white'}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleCommentVisibility(item.id)}>
              <FontAwesome5Icon name="comment-dots" size={30} color="white" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Share pressed')}>
              <FontAwesome5Icon name="share" size={30} color="white" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {commentVisible[item.id] && (
        <View style={[styles.commentArea, styles.commentAreaOpen]}>
          <FlatList
            data={[
              { id: 'comment1', text: 'Comentario 1' },
              { id: 'comment2', text: 'Comentario 2' },
              { id: 'comment3', text: 'Comentario 3' },
              // Aquí podrías usar datos reales o dinámicos
            ]}
            renderItem={({ item }) => (
              <View style={styles.comment}>
                <Text style={styles.commentText}>{item.text}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.commentList}
            inverted  // Para invertir el orden y mostrar los comentarios desde abajo hacia arriba
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Añadir comentario..."
              // Puedes manejar la lógica de enviar comentario aquí
            />
            <TouchableOpacity onPress={() => console.log('Send comment')}>
              <FontAwesome5Icon name="paper-plane" size={25} color="#007BFF" style={styles.sendIcon} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Tupperfy Media</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  item: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 600,
    width: '100%',
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  rectangle: {
    flex: 1,
    height: '100%',
    backgroundColor: '#007BFF',
  },
  iconsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
  commentArea: {
    backgroundColor: '#fff',  // Color de fondo de la zona de comentarios
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingBottom: 10,
  },
  commentAreaOpen: {
    maxHeight: 150,  // Altura máxima para la zona de comentarios abierta
    overflow: 'hidden',  // Para manejar el desbordamiento de contenido
  },
  commentList: {
    flexGrow: 1,
    justifyContent: 'flex-end',  // Alinea los comentarios desde abajo hacia arriba
  },
  comment: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  commentText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendIcon: {
    marginLeft: 10,
  },
});

export default MediaView;
