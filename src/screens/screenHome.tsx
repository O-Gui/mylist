// screens/screenHome.js
import React from 'react';
import { View, Image, StyleSheet, SafeAreaView } from 'react-native';

export default function ScreenHome() {
  return (
    // SafeAreaView garante que o conteúdo não fique escondido atrás da barra de status (bateria, hora)
    <SafeAreaView style={styles.container}>
      
      <View style={styles.content}>
        {/* Substitua '../assets/logo.png' pelo caminho real de onde você salvou o seu PNG */}
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain" // Mantém a proporção da imagem para não achatar nem esticar
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Faz o container ocupar 100% do espaço da tela
    backgroundColor: '#181818', // Aplica a cor de fundo que você pediu
  },
  content: {
    flex: 1,
    alignItems: 'center', // Centraliza a logo horizontalmente (esquerda/direita)
    
    // Se no seu print a logo fica mais para o TOPO:
    paddingTop: 80, 
    
    // Se no seu print a logo fica exatamente no MEIO da tela, 
    // apague o 'paddingTop' acima e descomente a linha abaixo:
    // justifyContent: 'center', 
  },
  logo: {
    width: 180, // Ajuste a largura de acordo com o tamanho do seu print
    height: 180, // Ajuste a altura de acordo com o tamanho do seu print
  }
});
