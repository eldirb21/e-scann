/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, BackHandler} from 'react-native';
import {RNCamera} from 'react-native-camera';
import WebView from 'react-native-webview';
const Barcodes = ({scannType, onBarcodeScan, scanndata, goBack}) => {
  const webViewRef = React.useRef(null);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [webViewRef]);
  const backAction = () => {
    if (webViewRef.current) {
      goBack();
      setScanned(false);
      return true;
    }
    goBack();
    return false;
  };
  const [scanned, setScanned] = useState(false);
  const handleBarcodeScan = async ({data}) => {
    if (!scanned) {
      setScanned(true);
      onBarcodeScan(data);
    }
  };
  if (scannType !== 'barcodes') return null;
  return (
    <>
      {scanndata ? (
        <WebView
          ref={webViewRef}
          source={{uri: `https://www.google.com/search?q=${scanndata}`}}
          style={styles.webview}
        />
      ) : (
        <View style={styles.container}>
          <RNCamera
            style={styles.camera}
            onBarCodeRead={handleBarcodeScan}
            captureAudio={true}
            autoFocus="on"
            flashMode="on"
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}>
            <View style={styles.layerTop} />
            <View style={styles.layerCenter}>
              <View style={styles.layerLeft} />
              <View style={styles.focused} />
              <View style={styles.layerRight} />
            </View>
            <View style={styles.layerBottom} />
          </RNCamera>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  layerTop: {
    flex: 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  focused: {
    flex: 10,
    borderColor: '#fff',
    borderWidth: 2,
    borderCurve: 'circular',
  },
  layerRight: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  layerBottom: {
    flex: 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
  },
  scanResultContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanResultText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scanAgainButton: {
    padding: 10,
    backgroundColor: '#4287f5',
    borderRadius: 5,
  },
  scanAgainButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  webview: {
    flex: 1,
  },
});

export default Barcodes;
