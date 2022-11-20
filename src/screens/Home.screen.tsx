import React from 'react';
import {StyleSheet, View} from 'react-native';
import MoodPicker from '../components/MoodPicker';
import {theme} from '../theme';
import {useAppContext} from '../App.provider';
import {MoodItemRow} from '../components/MoodItemRow';
export const Home: React.FC = () => {
  const appContext = useAppContext();
  return (
    <View style={styles.container}>
      <MoodPicker onSelect={appContext.handleSelectMood} />
      {appContext.selectedMood && (
        <MoodItemRow item={appContext.selectedMood} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  containerStyle: {
    justifyContent: 'center',
  },
  textStyle: {
    justifyContent: 'flex-end',
    margin: 10,
    marginTop: 10,
    position: 'relative',
  },
  moodDate: {
    textAlign: 'center',
    color: theme.colorLavender,
  },
});
