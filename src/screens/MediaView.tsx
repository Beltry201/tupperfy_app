import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, TextInput, Animated, ScrollView } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const data = [
  { id: '1', backgroundColor: '#007BFF' },
  { id: '2', backgroundColor: '#007BFF' },
  { id: '3', backgroundColor: '#007BFF' },
  // Añade más datos si es necesario
];

const MediaView = () => {
  const [likedItems, setLikedItems] = useState({});
  const [commentVisible, setCommentVisible] = useState('');
  const [slideAnim] = useState(new Animated.Value(1000)); // Inicia fuera de la pantalla
  const [commentText, setCommentText] = useState(''); // Estado para el texto del comentario
  const [comments, setComments] = useState([
    { id: 'comment1', text: 'Comentario 1', replies: [] },
    { id: 'comment2', text: 'Comentario 2', replies: [] },
    { id: 'comment3', text: 'Comentario 3', replies: [] },
    // Puedes inicializar con datos de prueba
  ]);
  const [replyText, setReplyText] = useState(''); // Estado para el texto de la respuesta
  const [replyingTo, setReplyingTo] = useState(null); // Estado para controlar a qué comentario se está respondiendo

  const handleLikePress = (itemId) => {
    setLikedItems((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const toggleCommentVisibility = (itemId) => {
    if (commentVisible === itemId) {
      // Si ya está abierto, cerrar
      Animated.timing(slideAnim, {
        toValue: 1000, // Fuera de la pantalla
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCommentVisible('');
      });
    } else {
      // Si está cerrado, abrir
      setCommentVisible(itemId);
      Animated.timing(slideAnim, {
        toValue: 0, // Posición inicial en la pantalla
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const closeComments = () => {
    Animated.timing(slideAnim, {
      toValue: 1000, // Fuera de la pantalla
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCommentVisible('');
    });
  };

  const handleCommentInputChange = (text) => {
    setCommentText(text); // Actualiza el estado con el texto del comentario
  };

  const handleSendComment = () => {
    // Crea un nuevo comentario
    const newComment = {
      id: `comment${comments.length + 1}`, // Genera un ID único (puedes ajustar según tu lógica)
      text: commentText,
      replies: [], // Añade un array para las respuestas
    };

    // Actualiza el estado de comentarios con el nuevo comentario
    setComments([...comments, newComment]);

    // Limpia el campo de comentario después de enviar
    setCommentText('');
  };

  const handleReplyInputChange = (text) => {
    setReplyText(text); // Actualiza el estado con el texto de la respuesta
  };

  const handleSendReply = (commentId) => {
    // Añade la respuesta al comentario correspondiente
    setComments((prevComments) => 
      prevComments.map((comment) => 
        comment.id === commentId ? { ...comment, replies: [...comment.replies, replyText] } : comment
      )
    );

    // Limpia el campo de respuesta después de enviar
    setReplyText('');
    setReplyingTo(null); // Resetea el estado de respuesta
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item, { backgroundColor: item.backgroundColor }]}>
      <View style={styles.content}>
        <View style={styles.rectangle} />
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.circle} onPress={() => console.log('Circle pressed')}>
            <FontAwesome5Icon name="user" size={35} color="#007BFF" style={styles.icon} />
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
              <FontAwesomeIcon name="commenting" size={35} color="white" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Share pressed')}>
              <FontAwesome5Icon name="share" size={35} color="white" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {commentVisible === item.id && (
        <Animated.View style={[styles.commentOverlay, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.commentArea}>
            <TouchableOpacity style={styles.closeButton} onPress={closeComments}>
              <FontAwesome5Icon name="times" size={25} color="#000" />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
              {comments.map((comment, index) => (
                <View key={index} style={styles.comment}>
                  <Text style={styles.commentText}>{comment.text}</Text>
                  {comment.replies.map((reply, replyIndex) => (
                    <Text key={replyIndex} style={styles.replyText}>{reply}</Text>
                  ))}
                  <TouchableOpacity onPress={() => setReplyingTo(comment.id)}>
                    <Text style={styles.replyButtonText}>Responder</Text>
                  </TouchableOpacity>
                  {replyingTo === comment.id && (
                    <View style={styles.replyContainer}>
                      <TextInput
                        style={styles.replyInput}
                        placeholder="Escribe tu respuesta..."
                        value={replyText}
                        onChangeText={handleReplyInputChange}
                      />
                      <TouchableOpacity onPress={() => handleSendReply(comment.id)}>
                        <FontAwesome5Icon name="paper-plane" size={20} color="#007BFF" style={styles.sendReplyIcon} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Añadir comentario..."
                value={commentText} // Enlaza el valor del input con el estado del comentario
                onChangeText={handleCommentInputChange} // Manejador para cambiar el texto del comentario
              />
              <TouchableOpacity onPress={handleSendComment}>
                <FontAwesome5Icon name="paper-plane" size={25} color="#007BFF" style={styles.sendIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
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
  commentOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 0, // Ajusta según el tamaño de la barra de comentarios
  },
  commentArea: {
    width: '100%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 20, // Ajusta según el tamaño de la barra de comentarios
    paddingBottom: 50, // Espacio para la barra de entrada
  },
  closeButton: {
    position: 'absolute',
    top: 10, // Ajusta según la separación deseada
    right: 10,
    zIndex: 2, // Asegura que el botón esté en el frente
    padding: 10, // Aumenta la zona clickable alrededor del icono
    backgroundColor: '#fff', // Fondo blanco para destacar
    borderRadius: 20, // Bordes redondeados para el botón
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Ajusta según la separación deseada
  },
  comment: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  commentText: {
    fontSize: 16,
  },
  replyButtonText: {
    fontSize: 14,
    color: '#007BFF',
    marginTop: 5,
    marginLeft: 5,
  },
  replyText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 20, // Indentación para las respuestas
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Espacio entre los elementos
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
    paddingBottom: 10, // Añade espacio inferior
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginRight: 10,
  },
  sendIcon: {
    marginLeft: 10,
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  replyInput: {
    flex: 1,
    height: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    marginRight: 10,
    fontSize: 14,
  },
  sendReplyIcon: {
    marginLeft: 10,
  },
});

export default MediaView;
