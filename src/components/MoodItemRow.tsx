import React from 'react';
import {View, Text, StyleSheet, Pressable, LayoutAnimation} from 'react-native';
import format from 'date-fns/format';
import {MoodOptionWithTimestamp} from '../types';
import {theme} from '../theme';
import {useAppContext} from '../App.provider';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

type MoodItemRowProps = {
  item: MoodOptionWithTimestamp;
};

export const MoodItemRow: React.FC<MoodItemRowProps> = ({item}) => {
  const appContext = useAppContext();
  const offset = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));
  const onGestureEvent = useAnimatedGestureHandler(
    {
      onActive: event => {
        console.warn(event.translationX);
      },
    },
    [],
  );

  const handlePress = React.useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    appContext.handleDeleteMood(item);
  }, [appContext, item]);
  return (
    <PanGestureHandler
      minVelocityX={1}
      minVelocityY={100}
     // onGestureEvent={onGestureEvent}
     >
      <View style={styles.moodItem}>
        <View style={styles.iconAndDescription}>
          <Text style={styles.moodValue}>{item.mood.emoji}</Text>
          <Text style={styles.moodDescription}>{item.mood.description}</Text>
        </View>
        <Pressable hitSlop={16} onPress={handlePress}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
        <Text style={styles.moodDate}>
          {format(new Date(item.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
        </Text>
      </View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  moodValue: {
    textAlign: 'center',
    fontSize: 40,
    marginRight: 10,
  },
  moodDate: {
    textAlign: 'center',
    color: theme.colorLavender,
    fontFamily: theme.fontFamilyLight,
  },
  moodItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodDescription: {
    fontSize: 18,
    color: theme.colorPurple,
    fontWeight: 'bold',
    fontFamily: theme.fontFamilyBold,
  },
  iconAndDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteText: {
    color: theme.colorBlue,
    fontFamily: theme.fontFamilyLight,
  },
});
