// CalculoProteinaScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CalculoProteinaScreen({ navigation }) {
  const [frangoGramas, setFrangoGramas] = useState('');
  const [ovoQuantidade, setOvoQuantidade] = useState('');
  const [shakeQuantidade, setShakeQuantidade] = useState('');
  const [metaDiaria, setMetaDiaria] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');

  useEffect(() => {
    loadMetaDiaria();
  }, []);

  const loadMetaDiaria = async () => {
    try {
      const meta = await AsyncStorage.getItem('metaDiaria');
      if (meta !== null) {
        setMetaDiaria(meta);
      }
    } catch (error) {
      console.error('Erro ao carregar a meta diária:', error);
    }
  };

  const calcularTotalProteinas = () => {
    const frango = parseFloat(frangoGramas) || 0;
    const ovo = parseInt(ovoQuantidade) || 0;
    const shake = parseInt(shakeQuantidade) || 0;
    return frango * 0.25 + ovo * 6 + shake * 30;
  };

  const salvarRegistro = async () => {
    try {
      const totalProteinas = calcularTotalProteinas();
      const registro = {
        frangoGramas,
        ovoQuantidade,
        shakeQuantidade,
        dia,
        mes,
        metaDiaria,
        totalProteinas,
      };
      let registrosAnteriores = await AsyncStorage.getItem('registros');
      registrosAnteriores = registrosAnteriores ? JSON.parse(registrosAnteriores) : [];
      registrosAnteriores.push(registro);
      await AsyncStorage.setItem('registros', JSON.stringify(registrosAnteriores));
      Alert.alert('Sucesso', 'Registro salvo com sucesso!');
      navigation.navigate('Meta', { registro });
    } catch (error) {
      console.error('Erro ao salvar o registro:', error);
      Alert.alert('Erro', 'Houve um erro ao salvar o registro. Por favor, tente novamente.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.label}>Filé de Frango (g)</Text>
        <TextInput
          style={styles.input}
          value={frangoGramas}
          onChangeText={text => setFrangoGramas(text)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Ovo (quantidade)</Text>
        <TextInput
          style={styles.input}
          value={ovoQuantidade}
          onChangeText={text => setOvoQuantidade(text)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Shake de Whey (quantidade)</Text>
        <TextInput
          style={styles.input}
          value={shakeQuantidade}
          onChangeText={text => setShakeQuantidade(text)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Meta Diária de Proteína (g)</Text>
        <TextInput
          style={styles.input}
          value={metaDiaria}
          onChangeText={text => setMetaDiaria(text)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Dia</Text>
        <TextInput
          style={styles.input}
          value={dia}
          onChangeText={text => setDia(text)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Mês</Text>
        <TextInput
          style={styles.input}
          value={mes}
          onChangeText={text => setMes(text)}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.saveButton} onPress={salvarRegistro}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
