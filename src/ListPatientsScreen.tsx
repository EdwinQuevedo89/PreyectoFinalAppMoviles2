import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { database } from './config/firebaseConfig';

interface Patient {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  owner: string;
  ownerContact: string;
  medicalHistory: string;
}

const ListPatientsScreen: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const querySnapshot = await getDocs(collection(database, 'patients'));
        const patientsList: Patient[] = [];
        querySnapshot.forEach((doc) => {
          const patientData = doc.data();
          patientsList.push({
            id: doc.id,
            name: patientData.name,
            species: patientData.species,
            breed: patientData.breed,
            age: patientData.age,
            owner: patientData.owner,
            ownerContact: patientData.ownerContact,
            medicalHistory: patientData.medicalHistory,
          });
        });
        setPatients(patientsList);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(database, 'patients', id));
      setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Pacientes</Text>
      <FlatList
        data={patients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.patientItem}>
            <Text>Nombre: {item.name}</Text>
            <Text>Especie: {item.species}</Text>
            <Text>Raza: {item.breed}</Text>
            <Text>Edad: {item.age}</Text>
            <Text>Dueño: {item.owner}</Text>
            <Text>Contacto del Dueño: {item.ownerContact}</Text>
            <Text>Historial Médico: {item.medicalHistory}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                
              >
                <Text style={styles.buttonText}>Actualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  patientItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ListPatientsScreen;
