import { DarkTheme } from '@react-navigation/native';
import colors from '../colors';

const AppLightTheme = {
  ...DarkTheme,
  dark: false,
  colors: {
    ...DarkTheme.colors,
    Login_background: colors.light_blue,
    Login_dropDownFont: colors.white,
    Login_placeholders: colors.dark_blue,
    Login_textColor: colors.white,
    Login_buttonBg: colors.yellow,
    Login_buttonColor: colors.dark_blue,
    Login_titleColor: colors.dark_blue,
    Login_eyeColor: colors.white,
    softBlue_lightBlue: colors.light_blue,
    medium_white: colors.white,
    light_dark_blue: colors.dark_blue,
    medium_blue_yellow: colors.yellow,
    white_dark_blue: colors.dark_blue,
    medium_blue_dark_blue: colors.dark_blue,
    black_white: colors.white,
    white_black: colors.black,
    white_white: colors.white
  }
}

export default AppLightTheme;