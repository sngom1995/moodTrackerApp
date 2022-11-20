import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {MoodOptionType} from '../types';
import {theme} from '../theme';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

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

const imageSrc = require('../assets/butterflies.png');
const MoodPicker: React.FC<MoodPickerProps> = ({onSelect}) => {
  const [selectMood, setSelectMood] = React.useState<MoodOptionType>();
  const [hasSelected, setHasSelected] = React.useState(false);
  const handleSelect = React.useCallback(() => {
    if (selectMood) {
      onSelect(selectMood);
      setSelectMood(undefined);
      setHasSelected(true);
    }
  }, [onSelect, selectMood]);
  const buttonStyle = useAnimatedStyle(
    () => ({
      opacity: selectMood ? withTiming(1) : withTiming(0.5),
      transform: [{scale: selectMood ? withTiming(1) : 0.8}],
    }),
    [selectMood],
  );
  if (hasSelected) {
    return (
      <View style={styles.container}>
        <Image source={imageSrc} style={styles.image} />
        <Pressable style={styles.button} onPress={() => setHasSelected(false)}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
      </View>
    );
  }
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
      <ReanimatedPressable
        style={[styles.button, buttonStyle]}
        onPress={handleSelect}>
        <Text style={styles.buttonText}>Choose</Text>
      </ReanimatedPressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colorPurple,
    borderRadius: 10,
    height: 220,
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
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
    fontFamily: theme.fontFamilyRegular,
  },
  wText: {
    color: theme.colorWhite,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: theme.fontFamilyBold,
  },
  textWelcome: {
    paddingTop: 25,
    fontWeight: 'bold',
    fontFamily: theme.fontFamilyRegular,
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
    fontFamily: theme.fontFamilyRegular,
  },
});
export default MoodPicker;
