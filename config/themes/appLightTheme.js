import { DefaultTheme } from '@react-navigation/native';
import colors from '../colors';

const AppLightTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    Login_background: colors.soft_blue,
    Login_dropDownFont: colors.medium,
    Login_placeholders: colors.light,
    Login_textColor: colors.white,
    Login_buttonBg: colors.medium_blue,
    Login_buttonColor: colors.white,
    Login_titleColor: colors.medium_blue,
    Login_eyeColor: colors.black,
    softBlue_lightBlue: colors.soft_blue,
    medium_white: colors.medium,
    light_dark_blue: colors.light,
    medium_blue_yellow: colors.medium_blue,
    white_dark_blue: colors.white,
    medium_blue_dark_blue: colors.medium_blue,
    black_white: colors.black,
    white_black: colors.white,
    white_white: colors.white
  }
}

export default AppLightTheme;