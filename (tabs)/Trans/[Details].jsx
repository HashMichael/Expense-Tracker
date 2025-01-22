import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Details = () => {
  const { type: initialType, amount: initialAmount, category: initialCategory, date: initialDate } = useLocalSearchParams();

  const [type, setType] = useState(initialType);
  const [amount, setAmount] = useState(initialAmount);
  const [category, setCategory] = useState(initialCategory);
  const [date, setDate] = useState(initialDate);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    if (isEditing) {
      Alert.alert('Updated', 'Changes have been saved!');
    }
    setIsEditing(!isEditing); 
  };

  const handleDelete = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setType('');
          setAmount('');
          setCategory('');
          setDate('');
          Alert.alert('Deleted', 'Item has been deleted!');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Type:</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={type}
          onChangeText={setType}
        />
      ) : (
        <Text style={styles.value}>{type}</Text>
      )}

      <Text style={styles.label}>Amount:</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      ) : (
        <Text style={styles.value}>${amount}</Text>
      )}

      <Text style={styles.label}>Category:</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
        />
      ) : (
        <Text style={styles.value}>{category}</Text>
      )}

      <Text style={styles.label}>Date:</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
        />
      ) : (
        <Text style={styles.value}>{date}</Text>
      )}

      <View style={styles.buttonContainer}>
        {/* Edit Button */}
        <TouchableOpacity onPress={handleEdit} style={styles.button}>
          <Icon name="edit" size={24} color="#fff" />
          <Text style={styles.buttonText}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity onPress={handleDelete} style={[styles.button, styles.deleteButton]}>
          <Icon name="delete" size={24} color="#fff" />
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    marginLeft: 50,
    width: '80%',
    marginTop: 250,
    elevation: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    marginLeft: 10,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
