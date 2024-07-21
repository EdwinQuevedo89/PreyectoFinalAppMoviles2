import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, updateProfile } from 'firebase/auth';
import { auth } from './config/firebaseConfig';
 // Ajusta la ruta según tu configuración

const EditProfileScreen: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSaveProfile = async () => {
    if (!currentUser) {
      console.error('No hay usuario autenticado');
      return;
    }

    try {
      await updateProfile(currentUser, {
        displayName: displayName.trim(),
        // Puedes agregar más campos de perfil aquí si es necesario
      });
      console.log('Perfil actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text>No hay usuario autenticado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Editar Perfil</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={displayName}
        onChangeText={text => setDisplayName(text)}
      />
      {/* Agrega más campos de perfil aquí si es necesario */}
      <Button title="Guardar cambios" onPress={handleSaveProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
});

export default EditProfileScreen;
