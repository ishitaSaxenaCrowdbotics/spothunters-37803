import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: isFocused => ({
    backgroundColor: '#fff',
    paddingTop: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: isFocused ? '#1976D2' : '#bdbdbd',
    borderRadius: 4
  }),
  input: {
    fontSize: 16,
    fontWeight: '500',
    textAlignVertical: 'top',
    color: '#000'
  },
  label: isFocused => ({
    color: isFocused ? '#1976D2' : 'grey',
    fontSize: 12,
    fontWeight: '400',
    marginHorizontal: 5
  }),
  animatedStyle: {
    top: 13,
    left: 15,
    position: 'absolute',
    borderRadius: 90,
    zIndex: 10000,
    backgroundColor: 'white',
  },
})

export default styles
