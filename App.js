import React from 'react';
import { StatusBar, View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CalculoProteinaScreen from './CalculoProteinaScreen';
import MetaScreen from './MetaScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'NutriE',
            headerStyle: { backgroundColor: '#b3e0ff' }, // Cor azul claro para o cabeçalho
            headerTintColor: '#000', // Cor do texto no cabeçalho (preto)
            headerTitleStyle: { fontWeight: 'bold' }, 
            headerTitleAlign: 'center', // Alinha o título ao centro
          }}
        />
        <Stack.Screen
          name="CalculoProteina"
          component={CalculoProteinaScreen}
          options={{ title: 'Cálculo de Proteína', headerStyle: { backgroundColor: '#b3e0ff' } }}
        />
        <Stack.Screen
          name="Meta"
          component={MetaScreen}
          options={{ title: 'Meta Diária de Proteína', headerStyle: { backgroundColor: '#b3e0ff' } }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Seja bem-vindo, senhor!</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CalculoProteina')}>
          <Text style={styles.buttonText}>Calcular Proteína</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Meta')}>
          <Text style={styles.buttonText}>Meta Diária</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
