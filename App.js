import React,{Component} from 'react';
import { StyleSheet, Text, View,Image  } from 'react-native';

import { Asset } from 'expo-asset';
import  AppLoading  from 'expo-app-loading';
import MusicApp from './app/index';


function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

 class App extends Component{

    constructor(){
      super()
      this.state = {
        isReady:false
      };
   
    }

    async _loadAssetsAsync() {
      const imageAssets = cacheImages([require('./assets/bg.jpg')]);
  
      await Promise.all([...imageAssets]);
    }

      render() {
        if (!this.state.isReady) {
          return (
            <AppLoading
              startAsync={this._loadAssetsAsync}
              onFinish={() => this.setState({ isReady: true })}
              onError={console.warn}
            />
          );
        }
        return <MusicApp/>
      }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;