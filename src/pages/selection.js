import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const Selection = ({handleSelectCodes, SelectScann}) => {
  if (SelectScann) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pilih Metode Scann</Text>
      <View style={styles.btnContent}>
        <TouchableOpacity
          onPress={() => handleSelectCodes('barcodes')}
          style={styles.btn}>
          <Text style={styles.btnText}>Barcode</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSelectCodes('Image')}
          style={styles.btn}>
          <Text style={styles.btnText}>Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: '#000',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  btnContent: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  btn: {
    backgroundColor: 'green',
    padding: 15,
    alignItems: 'center',
    borderRadius: 15,
    margin: 20,
  },
  btnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Selection;
