import { DarkTheme } from '@react-navigation/native';
import colors from '../colors';

const AppLightTheme = {
  ...DarkTheme,
  dark: false,
  colors: {
    ...DarkTheme.colors,
    Login_background: colors.light_blue,
    Login_dropDownFont: colors.light,
    Login_placeholders: colors.dark_blue,
    Login_textColor: colors.white,
    Login_buttonBg: colors.yellow,
    Login_buttonColor: colors.dark_blue,
    Login_titleColor: colors.dark_blue,
    Login_eyeColor: colors.dark_blue,
    soft_blue_light_blue: colors.light_blue,
    medium_white: colors.white,
    medium_light: colors.light,
    light_dark_blue: colors.dark_blue,
    medium_blue_yellow: colors.yellow,
    white_dark_blue: colors.dark_blue,
    medium_blue_dark_blue: colors.dark_blue,
    black_white: colors.white,
    white_black: colors.black,
    white_white: colors.white,
    white_darker_blue: colors.darker_blue,
    medium_red_light_red: colors.light_red,
    medium_green_light_green: colors.light_green,
    medium_yellow_light_yellow: colors.light_yellow,
    light_medium: colors.medium,
    light_blue_dark_blue: colors.dark_blue,
    medium_blue_light_blue: colors.light_blue,
  }
}

export default AppLightTheme;