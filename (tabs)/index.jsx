import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  ScrollView, 
  TextInput, 
  FlatList 
} from 'react-native';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';

const ExpenseTrackerApp = () => {
  // State Management
  const [transactions, setTransactions] = useState([]);

  // Financial Summaries
  const [balance, setBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  // Modal and Transaction Input States
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: 'expense',
    amount: '',
    category: '',
    date: new Date(),
  });

  // Show Date Picker
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Calculate Financial Summaries
  useEffect(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    setTotalIncome(income);
    setTotalExpenses(expenses);
    setBalance(income - expenses);
  }, [transactions]);

  // Add New Transaction
  const handleAddTransaction = () => {
    const transaction = {
      ...newTransaction,
      id: transactions.length + 1,
      amount: parseFloat(newTransaction.amount),
    };

    setTransactions([...transactions, transaction]);
    setIsModalVisible(false);
    setNewTransaction({
      type: 'expense',
      amount: '',
      category: '',
      date: new Date(),
    });
  };

  // Date Change Handler
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || newTransaction.date;
    setShowDatePicker(false);
    setNewTransaction({ ...newTransaction, date: currentDate });
  };

  // Render Transaction Item
  const renderTransactionItem = ({ item }) => (
    <View
      style={[
        styles.transactionItem,
        item.type === 'income' ? styles.incomeBackground : styles.expenseBackground,
      ]}
    >
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: '../Trans/[Details]',
            params: {
              type: item.type,
              amount: item.amount,
              category: item.category,
              date: item.date,
            },
          })
        }
      >
        <View>
          <Text style={styles.transactionCategory}>{item.category}</Text>
          <Text style={styles.transactionDate}>
            {item.date.toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>

      <Text style={item.type === 'income' ? styles.incomeText : styles.expenseText}>
        {item.type === 'income' ? '+' : '-'}${item.amount.toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Tracker</Text>

      <View style={styles.overviewContainer}>
        <View style={styles.overviewCard}>
          <Icon name="wallet" size={24} color="#666" />
          <Text style={styles.overviewCardTitle}>Total Balance</Text>
          <Text style={styles.balanceText}>${balance.toLocaleString()}</Text>
        </View>

        <View style={styles.overviewCard}>
          <Icon name="arrow-up" size={24} color="green" />
          <Text style={styles.overviewCardTitle}>Total Income</Text>
          <Text style={styles.incomeText}>${totalIncome.toLocaleString()}</Text>
        </View>

        <View style={styles.overviewCard}>
          <Icon name="arrow-down" size={24} color="red" />
          <Text style={styles.overviewCardTitle}>Total Expenses</Text>
          <Text style={styles.expenseText}>${totalExpenses.toLocaleString()}</Text>
        </View>
      </View>

      {/* Transactions List */}
      <View style={styles.transactionsHeader}>
        <Text style={styles.transactionsTitle}>Recent Transactions</Text>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Icon name="add-circle" size={30} color="#007bff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTransactionItem}
        ListEmptyComponent={<Text style={styles.emptyListText}>No transactions yet.</Text>}
      />

      {/* Add Transaction Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Transaction</Text>

            <Picker
              selectedValue={newTransaction.type}
              onValueChange={(itemValue) =>
                setNewTransaction({ ...newTransaction, type: itemValue })
              }
              style={styles.picker}
            >
              <Picker.Item label="Expense" value="expense" />
              <Picker.Item label="Income" value="income" />
            </Picker>

            <TextInput
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              value={newTransaction.amount.toString()}
              onChangeText={(text) =>
                setNewTransaction({ ...newTransaction, amount: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Category"
              value={newTransaction.category}
              onChangeText={(text) =>
                setNewTransaction({ ...newTransaction, category: text })
              }
            />

            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.dateButton}
            >
              <Text>Select Date: {newTransaction.date.toLocaleDateString()}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={newTransaction.date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onDateChange}
              />
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddTransaction}
              >
                <Text style={styles.addButtonText}>Add Transaction</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: 50,
    paddingHorizontal: 15
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  overviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  overviewCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '30%',
    elevation: 3
  },
  overviewCardTitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 5
  },
  balanceText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  incomeText: {
    color: 'green',
    fontWeight: 'bold'
  },
  expenseText: {
    color: 'red',
    fontWeight: 'bold'
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  incomeBackground: {
    backgroundColor: 'rgba(0, 255, 0, 0.1)'
  },
  expenseBackground: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)'
  },
  transactionCategory: {
    fontWeight: 'bold'
  },
  transactionDate: {
    color: '#666'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  picker: {
    width: '100%',
    marginBottom: 10
  },
  dateButton: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center'
  },
  cancelButtonText: {
    color: 'black'
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center'
  },
  addButtonText: {
    color: 'white'
  }
});

export default ExpenseTrackerApp;
