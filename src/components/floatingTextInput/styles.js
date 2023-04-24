import {StyleSheet} from 'react-native'
import { colors, commonStyles } from '../../styles'

const styles = StyleSheet.create({
  container: isFocused => ({
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: isFocused ? '#1976D2' : '#bdbdbd',
    borderRadius: 4,
  }),
  input: {
    fontSize: 16,
    fontWeight: '500',
    textAlignVertical: 'top',
    color: '#000',
    height: 40,
    flex: 1
  },
  label: isFocused => ({
    color: isFocused ? '#1976D2' : 'grey',
    marginHorizontal: 5,
    ...commonStyles.text_xs
  }),
  animatedStyle: {
    top: 8,
    left: 30,
    position: 'absolute',
    borderRadius: 90,
    zIndex: 10000,
    backgroundColor: 'white',
  },
  backgroundColorWhite: {
    backgroundColor: colors.white
  } 
})

export default styles
