import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Alert } from 'react-native';
import { TextInput, Button, Title, Surface } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './config/firebaseConfig';
// Asegúrate de ajustar la ruta según sea necesario

interface RegisterScreenProps {}

const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSignUp = async () => {
    try {
      if (!emailIsValid(email)) {
        Alert.alert('Email inválido', 'Por favor ingresa un email válido.');
        return;
      }

      if (password.length < 6) {
        Alert.alert('Contraseña débil', 'La contraseña debe tener al menos 6 caracteres.');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Contraseñas no coinciden', 'Las contraseñas no coinciden.');
        return;
      }

      // Lógica de registro de usuario con Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Registro exitoso', 'Usuario registrado correctamente.');
    } catch (error) {
      console.error('Error durante el registro:', error);
      Alert.alert('Error', 'Hubo un error durante el registro. Por favor intenta de nuevo.');
    }
  };

  const emailIsValid = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToJhTPQs-mWuKNQSkPq9UYjpsbrehcQxJlbQ&s' }} // URL de tu imagen
        style={styles.image}
      />
      <Title style={styles.title}>Regístrate, por favor... </Title>
      <Surface style={styles.surface}>
        <TextInput
          label="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          label="Confirme Contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          secureTextEntry
        />
        <Button mode="contained" onPress={handleSignUp} style={styles.button}>
          Registrar Datos
        </Button>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d1bcbc',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  surface: {
    padding: 16,
    elevation: 4,
    borderRadius: 8,
    width: '100%',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    width: '100%',
  },
  image: {
    width: 200, // Ajusta el ancho según sea necesario
    height: 100, // Ajusta la altura según sea necesario
    marginBottom: 50, // Espacio inferior entre la imagen y el texto
  },
});

export default RegisterScreen;
