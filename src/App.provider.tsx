import React from 'react';
import {MoodOptionType, MoodOptionWithTimestamp} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKey = 'my-app-data';

type AppData = {
  moods: MoodOptionWithTimestamp[];
};

const getAppData = async (): Promise<AppData | null> => {
  try {
    const data = await AsyncStorage.getItem(storageKey);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    return null;
  }
};

const setAppData = async (newData: AppData): Promise<void> => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
  } catch (error) {}
};

type AppContextType = {
  selectedMood: MoodOptionWithTimestamp;
  moodList: MoodOptionWithTimestamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
};

const defaultValue = {
  selectedMood: {},
  moodList: [],
  handleSelectMood: () => {},
};

const AppContext = React.createContext<AppContextType>(defaultValue);
export const useAppContext = () => React.useContext(AppContext);

export const AppProvider: React.FC = ({children}) => {
  const [moodList, setMoodList] = React.useState<MoodOptionWithTimestamp[]>([]);
  const [selectedMood, setSelectedMood] =
    React.useState<MoodOptionWithTimestamp>(null);
  const handleSelectMood = React.useCallback((mood: MoodOptionType) => {
    const moodTem = {mood, timestamp: Date.now()};
    setMoodList(current => {
      const newValue = [...current, moodTem];
      setAppData({moods: newValue});
      return newValue;
    });
    setSelectedMood(moodTem);
  }, []);
  React.useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await getAppData();
      if (data) {
        setMoodList(data.moods);
      }
    };
    getDataFromStorage();
  }, []);
  return (
    <AppContext.Provider value={{selectedMood, moodList, handleSelectMood}}>
      {children}
    </AppContext.Provider>
  );
};
