import { DefaultTheme } from '@react-navigation/native';
import colors from '../colors';

const AppLightTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    Login_background: colors.soft_blue,
    Login_dropDownFont: colors.medium,
    Login_buttonBg: colors.medium_blue,
    Login_buttonColor: colors.white,
    Login_textColor: colors.medium,
    Login_titleColor: colors.medium_blue
  }
}

export default AppLightTheme;