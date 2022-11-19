import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {MoodOptionType} from '../types';
import {theme} from '../theme';

const moodOptions: MoodOptionType[] = [
  {emoji: '🧑‍💻', description: 'studious'},
  {emoji: '🤔', description: 'pensive'},
  {emoji: '😊', description: 'happy'},
  {emoji: '🥳', description: 'celebratory'},
  {emoji: '😤', description: 'frustrated'},
];
type MoodPickerProps = {
  onSelect: (mood: MoodOptionType) => void;
};
const MoodPicker: React.FC<MoodPickerProps> = ({onSelect}) => {
  const [selectMood, setSelectMood] = React.useState<MoodOptionType>();
  const handleSelect = React.useCallback(() => {
    if (selectMood) {
      onSelect(selectMood);
      setSelectMood(undefined);
    }
  }, [onSelect, selectMood]);
  return (
    <View style={styles.container}>
      <View style={styles.textWelcome}>
        <Text style={styles.wText}> How are you right now</Text>
      </View>
      <View style={styles.moodList}>
        {moodOptions.map(option => (
          <View key={option.emoji}>
            <Pressable
              onPress={() => setSelectMood(option)}
              key={option.emoji}
              style={[
                styles.moodItem,
                option.emoji === selectMood?.emoji
                  ? styles.selectedMoodItem
                  : {},
              ]}>
              <Text style={styles.moodText}> {option.emoji}</Text>
            </Pressable>
            <Text style={styles.descriptionText}>
              {option.description === selectMood?.description
                ? option.description
                : ''}
            </Text>
          </View>
        ))}
      </View>
      <Pressable style={styles.button} onPress={handleSelect}>
        <Text style={styles.buttonText}>Choose</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colorPurple,
    borderRadius: 10,
    flexWrap: 'nowrap',
  },
  moodText: {
    fontSize: 24,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  moodItem: {
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    margin: 5,
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: theme.colorPurple,
    borderColor: theme.colorWhite,
  },
  descriptionText: {
    color: theme.colorPurple,
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
  },
  wText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  textWelcome: {
    paddingTop: 25,
    fontWeight: 'bold',
  },
  button: {
    height: 30,
    width: 120,
    backgroundColor: theme.colorPurple,
    marginBottom: 20,
    borderLeftWidth: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colorPurple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    marginBottom: 3,
    marginLeft: 10,
    marginRight: 10,
    color: theme.colorWhite,
  },
});
export default MoodPicker;
