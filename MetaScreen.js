// MetaScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MetaScreen({ navigation }) {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const carregarRegistros = async () => {
      try {
        const registrosSalvos = await AsyncStorage.getItem('registros');
        if (registrosSalvos !== null) {
          setRegistros(JSON.parse(registrosSalvos));
        }
      } catch (error) {
        console.error('Erro ao carregar registros:', error);
      }
    };
    carregarRegistros();
  }, []);

  const excluirRegistro = async (registro) => {
    try {
      let novosRegistros = registros.filter(item => item.dia !== registro.dia || item.mes !== registro.mes);
      await AsyncStorage.setItem('registros', JSON.stringify(novosRegistros));
      setRegistros(novosRegistros);
    } catch (error) {
      console.error('Erro ao excluir registro:', error);
    }
  };

  return (
    <View style={styles.container}>
      {registros.map((registro, index) => (
        <View key={index} style={styles.registroContainer}>
          <Text style={styles.label}>Dia: {registro.dia}</Text>
          <Text style={styles.label}>Mês: {registro.mes}</Text>
          <Text style={styles.label}>Filé de Frango (g): {registro.frangoGramas}</Text>
          <Text style={styles.label}>Ovo (quantidade): {registro.ovoQuantidade}</Text>
          <Text style={styles.label}>Shake de Whey (quantidade): {registro.shakeQuantidade}</Text>
          <Text style={styles.label}>Meta Diária de Proteína (g): {registro.metaDiaria}</Text>
          <Text style={styles.label}>Proteínas Ingeridas (g): {registro.totalProteinas}</Text>
          <TouchableOpacity style={styles.excluirButton} onPress={() => excluirRegistro(registro)}>
            <Text style={styles.excluirButtonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  registroContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  excluirButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  excluirButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
