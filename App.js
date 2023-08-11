import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Barcodes from './src/pages/barcodes';
import Imgcodes from './src/pages/imgcodes';
import Selection from './src/pages/selection';

const App = () => {
  const webViewRef = React.useRef(null);
  const isDarkMode = useColorScheme() === 'dark';
  const [scannedData, setScannedData] = useState(null);
  const [SelectScann, setSelectScann] = useState('');

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [webViewRef]);
  const backAction = () => {
    if (webViewRef.current) {
      setScannedData(null);
      return true;
    }
    return false;
  };
  const handleSelectCodes = codes => {
    if (codes === 'barcodes') {
      setSelectScann('barcodes');
    } else if (codes === 'Image') {
      setSelectScann('Image');
    }
  };

  const handleBarcodeScan = code => {
    const encodedData = encodeURIComponent(code);
    setScannedData(encodedData);
  };

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const goBack = () => {
    setScannedData(null);
    setSelectScann('');
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Selection
        SelectScann={SelectScann}
        handleSelectCodes={handleSelectCodes}
      />
      <Barcodes
        scanndata={scannedData}
        scannType={SelectScann}
        onBarcodeScan={handleBarcodeScan}
        goBack={goBack}
      />

      <Imgcodes
        scanndata={scannedData}
        scannType={SelectScann}
        goBack={goBack}
      />
    </SafeAreaView>
  );
};

export default App;
