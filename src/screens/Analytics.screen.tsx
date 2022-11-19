import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Analytics: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Analytics</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default Analytics;
