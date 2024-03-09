import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyAlert from '../components/MyAlert';
import i18n from '../locales/i18n';

function ExampleScreen(props) {
  return (
    <View style={styles.container}>
        <MyAlert
          visible={false}
          type="confirmation"
          size="large"
          title={i18n.t('editCredentials')}
          button={i18n.t('save')}
          message={i18n.t('reEnterPwd')}
          cancel={true}
          close={i18n.t('close')}
        />
        <MyAlert
          visible={false}
          type="error"
          size="small"
          button={i18n.t('close')}
          message='Hibaüzi'
        />
        <MyAlert
          visible={false}
          type="success"
          size="small"
          button={i18n.t('close')}
          message={i18n.t('reLogin')}
        />
        <MyAlert
          visible={true}
          type="success"
          size="small"
          button={i18n.t('close')}
          message={i18n.t('detailsSuccess')}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default ExampleScreen;