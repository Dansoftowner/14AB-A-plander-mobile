import { DarkTheme } from '@react-navigation/native';
import colors from '../colors';

const AppLightTheme = {
  ...DarkTheme,
  dark: false,
  colors: {
    ...DarkTheme.colors,
    Login_background: colors.medium_blue,
    Login_dropDownFont: colors.white,
    Login_buttonBg: colors.yellow,
    Login_buttonColor: colors.dark_blue,
    Login_textColor: colors.white,
    Login_titleColor: colors.dark_blue
  }
}

export default AppLightTheme;