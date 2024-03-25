import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function App() {
  const [textInput, setTextInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addTask = () => {
    if (textInput.trim() !== '') {
      setTasks([...tasks, { id: tasks.length + 1, item: textInput.trim() }]);
      setTextInput('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, item: newText.trim() } : task
      )
    );
    setEditingTaskId(null); 
  };

  const renderItem = ({ item }) => {
    if (item.id === editingTaskId) {
       return (
        <View style={styles.taskContainer}>
          <TextInput
            style={styles.input}
            value={editingText}
            onChangeText={(text) => setEditingText(text)}
            autoFocus
            onBlur={() => updateTask(item.id, editingText)}
            onSubmitEditing={() => updateTask(item.id, editingText)}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.taskContainer}>
          <Text style={styles.taskText}>{item.item}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Entypo name="circle-with-cross" size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => startEditingTask(item.id, item.item)}>
              <Entypo name="edit" size={24} color="blue" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  const startEditingTask = (id, text) => {
    setEditingTaskId(id);
    setEditingText(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo List</Text>

      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          value={textInput}
          placeholder={'Adicione uma tarefa...'}
          onChangeText={(text) => setTextInput(text)}
        />
        <TouchableOpacity onPress={addTask}>
          <Entypo name="circle-with-plus" size={28} />
        </TouchableOpacity>
      </View>


      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEBD2',
    marginTop: StatusBar.currentHeight,
    padding: 10,
  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '600',
    marginBottom: 20,
    marginTop: 30,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 6,
    width: '90%',
    fontSize: 18,
    fontWeight: '600',
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
  },
  taskText: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
});
