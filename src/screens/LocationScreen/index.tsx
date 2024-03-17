import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Locations} from '../../redux/slices/persist/persist.type';
import {colors} from '../../constants/colors';

const LocationScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Location:</Text>
      {Object.values(Locations).map(i => {
        return (
          <View style={styles.item} key={i}>
            <View style={styles.dot}></View>
            <Text style={styles.content}>{i}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.mainTxt,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    height: 8,
    width: 8,
    backgroundColor: colors.description,
    borderRadius: 20,
  },
  content: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.mainTxt,
  },
});

export default LocationScreen;
