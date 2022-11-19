import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useAppContext} from '../App.provider';
import {MoodItemRow} from '../components/MoodItemRow';

export const History: React.FC = () => {
  const appContext = useAppContext();
  return (
    <ScrollView style={styles.container}>
      {appContext.moodList.map(item => (
        <MoodItemRow item={item} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
