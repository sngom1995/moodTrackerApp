import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {useAppContext} from '../App.provider';
import {MoodItemRow} from '../components/MoodItemRow';

export const History: React.FC = () => {
  const appContext = useAppContext();
  return (
    <ScrollView style={styles.container}>
      {appContext.moodList
        .slice()
        .reverse()
        .map(item => (
          <View key={item.timestamp}>
            <MoodItemRow item={item} />
          </View>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
