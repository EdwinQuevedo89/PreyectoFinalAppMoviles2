import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { RootStackParamList } from '../App';
import { RouteProp } from '@react-navigation/native';
import { database } from './config/firebaseConfig';
import { StackNavigationProp } from '@react-navigation/stack';

// Importa tu tipo de navegación

export interface Patient {
    id: string;
    name: string;
    species: string;
    breed: string;
    age: number;
    owner: string;
    ownerContact: string;
    medicalHistory: string;
  }
  
  // Define types for route and navigation props
  type EditPatientScreenRouteProp = RouteProp<RootStackParamList, 'EditPatient'>;
  type EditPatientScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditPatient'>;
  
  interface Props {
    route: EditPatientScreenRouteProp;
    navigation: EditPatientScreenNavigationProp;
  }
  
  const EditPatientScreen: React.FC<Props> = ({ route, navigation }) => {
    const { patientId } = route.params;
    const [patient, setPatient] = useState<Patient | null>(null);
  
    useEffect(() => {
      const fetchPatient = async () => {
        try {
          const patientDoc = await getDoc(doc(database, 'patients', patientId));
          if (patientDoc.exists()) {
            setPatient(patientDoc.data() as Patient);
          } else {
            Alert.alert('Error', 'Patient not found');
            navigation.goBack();
          }
        } catch (error) {
          console.error('Error fetching patient:', error);
          Alert.alert('Error', 'Failed to fetch patient data');
        }
      };
  
      fetchPatient();
    }, [patientId]);
  
    const handleUpdate = async () => {
      if (patient) {
        try {
          // Exclude the id property from update data
          const { id, ...updateData } = patient;
          await updateDoc(doc(database, 'patients', patientId), updateData);
          Alert.alert('Success', 'Patient updated successfully');
          navigation.goBack();
        } catch (error) {
          console.error('Error updating patient:', error);
          Alert.alert('Error', 'Failed to update patient');
        }
      }
    };
  
    if (!patient) {
      return <Text>Loading...</Text>;
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Edit Patient</Text>
        <TextInput
          style={styles.input}
          value={patient.name}
          onChangeText={(text) => setPatient((prev) => prev ? { ...prev, name: text } : null)}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          value={patient.species}
          onChangeText={(text) => setPatient((prev) => prev ? { ...prev, species: text } : null)}
          placeholder="Species"
        />
        <TextInput
          style={styles.input}
          value={patient.breed}
          onChangeText={(text) => setPatient((prev) => prev ? { ...prev, breed: text } : null)}
          placeholder="Breed"
        />
        <TextInput
          style={styles.input}
          value={patient.owner}
          onChangeText={(text) => setPatient((prev) => prev ? { ...prev, owner: text } : null)}
          placeholder="Owner"
        />
        <TextInput
          style={styles.input}
          value={patient.ownerContact}
          onChangeText={(text) => setPatient((prev) => prev ? { ...prev, ownerContact: text } : null)}
          placeholder="Owner Contact"
        />
        <TextInput
          style={styles.input}
          value={patient.medicalHistory}
          onChangeText={(text) => setPatient((prev) => prev ? { ...prev, medicalHistory: text } : null)}
          placeholder="Medical History"
        />
        {/* Add more TextInput fields for other patient properties as needed */}
        <Button title="Update" onPress={handleUpdate} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 10,
      borderRadius: 8,
    },
  });
  
  export default EditPatientScreen;