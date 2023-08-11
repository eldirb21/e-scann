/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect} from 'react';
import {StyleSheet, BackHandler, Linking} from 'react-native';
import {launchCamera} from 'react-native-image-picker';

const Imgcodes = ({scannType, goBack}) => {
  const webViewRef = React.useRef(null);

  useEffect(() => {
    if (scannType === 'Image') {
      handleImageScan();
    }
    if (webViewRef) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }
  }, [scannType, webViewRef]);
  const backAction = () => {
    if (webViewRef.current) {
      goBack();
      return true;
    }
    goBack();
    return false;
  };

  const handleImageScan = () => {
    const options = {
      title: 'Select Image',
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        goBack();
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const url = `https://www.google.com/search?q=${response.assets[0].uri}`;
        Linking.openURL(url).catch(err =>
          console.error('Error opening URL: ', err),
        );
      }
    });
  };

  const handleSearch = () => {
    // Replace 'YOUR_CLARIFAI_API_KEY' with your actual Clarifai API key
    const apiKey = 'YOUR_CLARIFAI_API_KEY';
    const url =
      'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs';

    axios
      .post(
        url,
        {
          inputs: [
            {
              data: {
                image: {
                  url: query,
                },
              },
            },
          ],
        },
        {
          headers: {
            Authorization: `Key ${apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        if (
          response.data &&
          response.data.outputs &&
          response.data.outputs.length > 0
        ) {
          const firstOutput = response.data.outputs[0];
          if (
            firstOutput.data &&
            firstOutput.data.concepts &&
            firstOutput.data.concepts.length > 0
          ) {
            const firstConcept = firstOutput.data.concepts[0];
            setImageUrl(firstConcept.url);
          } else {
            // Handle no image found
            setImageUrl('');
          }
        } else {
          // Handle no image found
          setImageUrl('');
        }
      })
      .catch(error => {
        console.error('Error fetching images: ', error);
        setImageUrl('');
      });
  };

  if (scannType !== 'Image') {
    return null;
  }
  return (
    <>
      {/* {imageData && (
        // <View style={styles.imageContainer}>
        //   <Image
        //     source={{uri: `data:image/jpeg;base64,${imageData.data}`}}
        //     style={styles.image}
        //   />
        // </View>
        <WebView
          ref={webViewRef}
          source={{uri: 'https://www.google.com/search?q=google+lens'}}
          style={styles.webview}
        />
      )} */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  webview: {
    flex: 1,
  },
});
export default Imgcodes;
