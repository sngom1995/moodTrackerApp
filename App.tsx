import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {BottomTabsNavigator} from './src/screens/BottomTabs.navigator';
import {AppProvider} from './src/App.provider';

const App: React.FC = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
