import React from 'react';
import { StyleSheet, Platform } from 'react-native';
export const colors = {
  base: '#1E8FFF',
  black: '#000000',
  white: '#ffffff',
  gray: 'grey',
  red: 'red',
  green: 'green',
  cyanBlue: '#1976D2',
  lightGrey: '#505050',
  darkGrey: '#6A6A6A',
  lightBlack: '#151313',
  COLOR_E9E9E9: '#E9E9E9',
  COLOR_FF9D7E: '#FF9D7E',
  COLOR_3F3F3F: '#3F3F3F',
  COLOR_FBFBFB: '#FBFBFB',
  COLOR_F8D247: '#F8D247'
};
export const commonStyles = StyleSheet.create({
  text_xxs: {
    fontSize: 10,
    fontWeight: '400'
  },
  text_xxs_thick: {
    fontSize: 10,
    fontWeight: '500'
  },
  text_xxs_bold: {
    fontSize: 10,
    fontWeight: '600'
  },
  text_xs: {
    fontSize: 12,
    fontWeight: '400'
  },
  text_xs_thick: {
    fontSize: 12,
    fontWeight: '500'
  },
  text_xs_bold: {
    fontSize: 12,
    fontWeight: '600'
  },
  text_small: {
    fontWeight: '400',
    fontSize: 14
  },
  text_small_thick: {
    fontWeight: '500',
    fontSize: 14
  },
  text_small_bold: {
    fontWeight: '600',
    fontSize: 14
  },
  text_large: {
    fontWeight: '400',
    fontSize: 16
  },
  text_large_thick: {
    fontWeight: '500',
    fontSize: 16
  },
  text_large_bold: {
    fontWeight: '600',
    fontSize: 16
  }, 
  text_large_extra_bold: {
    fontWeight: '700',
    fontSize: 16
  },
  text_big: {
    fontWeight: '400',
    fontSize: 18
  },
  text_big_thick: {
    fontWeight: '500',
    fontSize: 18
  },
  text_big_bold: {
    fontWeight: '600',
    fontSize: 18
  },
  text_xl: {
    fontWeight: '400',
    fontSize: 20
  },
  text_xl_thick: {
    fontWeight: '500',
    fontSize: 20
  },
  text_xl_bold: {
    fontWeight: '600',
    fontSize: 20
  },
  text_xxl: {
    fontWeight: '400',
    fontSize: 22
  },
  text_xxl_thick: {
    fontWeight: '500',
    fontSize: 22
  },
  text_xxl_bold: {
    fontWeight: '600',
    fontSize: 22
  },
  marginHorizontal16: {
    marginHorizontal: 16
  },
  marginHorizontal8: {
    marginHorizontal: 8
  },
  centerTextAlign: {
    textAlign: 'center'
  },
  blueTextColor: {
    color: colors.base
  },
  whiteTextColor: {
    color: colors.white
  },
  darkGreyTextColor: {
    color: colors.darkGrey
  },
  lightGreyTextColor: {
    color: colors.lightGrey
  },
  blackTextColor: {
    color: colors.black
  },
  darkBlackTextColor: {
    color: colors.COLOR_3F3F3F
  },
  redTextColor: {
    color: colors.red
  },
  greenTextColor: {
    color: colors.green
  },
  marginTop16: {
    marginTop: 16
  },
  marginBottom5: {
    marginBottom: 5
  },
  rightTextAlign: {
    textAlign: 'right'
  },
  flexRow: {
    flexDirection: 'row'
  },
  justifyContentBetween: {
    justifyContent: 'space-between'
  },
  lightBlackTextColor: {
    color: colors.lightBlack
  },
  padding8: {
    padding: 8
  },
  marginHorizontal8: {
    marginHorizontal: 8
  },
  size24: {
    width: 24, 
    height: 24
  },
  marginLeft8: {
    marginLeft: 8
  },
  marginLeft15: {
    marginLeft: 15
  },
  marginTop8: {
    marginTop: 8
  },
  marginRight8: {
    marginRight: 8
  },
  flex2: {
    flex: 0.2
  },
  flex8: {
    flex: 0.8
  },
  flex1: {
    flex: 1
  },
  paddingVertical8: {
    paddingVertical: 8
  },
  marginVertical12: {
    marginVertical: 12
  },
  divider: {
    backgroundColor: colors.gray, 
    height: 1, 
    width: '100%', 
    marginVertical: 8
  },
  alignItemsCenter: {
    alignItems: 'center'
  },
  justifyContentCenter: {
    justifyContent: 'center'
  },
  marginLeft5: {
    marginLeft: 5
  },
  marginTop15: {
    marginTop: 15
  },
  marginBottom24: {
    marginBottom: 24
  },
  marginTop24: {
    marginTop: 24
  },
  marginTop10: {
    marginTop: 10
  },
  marginRight20: {
    marginRight: 20
  },
  fullWidth: {
    width: '100%'
  },
  paddingHorizontal16: {
    paddingHorizontal: 16
  },
  marginTop30: {
    marginTop: 30
  },
  marginLeft24: {
    marginLeft: 24
  },
  whiteBackground: {
    backgroundColor: 'white'
  },
  paddingHorizontal8: {
    paddingHorizontal: 8
  },
  paddingVertical16: {
    paddingVertical: 16
  },
  marginTop20: {
    marginTop: 20
  },
  size111: {
    width: 111,
    height: 111
  },
  alignSelfCenter: {
    alignSelf: 'center'
  },
  marginTop12: {
    marginTop: 12
  },
  alignSelfEnd: {
    alignSelf: 'flex-end'
  },
  alignSelfStart: {
    alignSelf: 'flex-start'
  },
  paddingHorizontal30: {
    paddingHorizontal: 30
  },
  fullHeight: {
    height: '100%'
  },
  marginVertical25: {
    marginVertical: 25
  },
  textAlignVerticalCenter: {
    textAlignVertical: 'center'
  },
  flexShrink1: {
    flexShrink: 1
  },
  paddingRight10: {
    paddingRight: 10
  }
});
