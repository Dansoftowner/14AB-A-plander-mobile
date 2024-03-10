import { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native'

import Pdf from 'react-native-pdf';
import { Buffer } from 'buffer'

import reports from '../api/reports';
import i18n from '../locales/i18n';

import Screen from './Screen';
import MyText from '../components/MyText';

function ViewPdfScreen({ route }) {

    const handleGetPdfURL = async () => {
        const response = await reports.getReportPdf(route.params.id);
        if (!response.ok) {
            return
        }
        const buf = Buffer.from(response.data)
        const base64 = buf.toString('base64')
        setPdfSource({ uri: `data:application/pdf;base64,${base64}`, cache: true });
    }

    useState(() => {
        handleGetPdfURL()
    }, [route.params.id])

    const { colors: colorsByTheme } = useTheme()
    const [pdfSource, setPdfSource] = useState({ uri: '', cache: true });
    const pdfRef = useRef();
    return (
        <Screen style={[
            styles.container,
            { backgroundColor: colorsByTheme.Login_background, paddingTop: 5 },
        ]}
        >
            <Pdf
                renderActivityIndicator={() => (
                    <MyText style={{ fontWeight: 'bold', fontSize: 25 }}>
                        {i18n.t('loading')}
                    </MyText>)}
                trustAllCerts={false}
                ref={pdfRef}
                source={pdfSource}
                onError={(error) => {
                    console.log(error);
                }}
                style={[styles.pdf, { backgroundColor: colorsByTheme.Login_background }]}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        justifyContent: 'center',
    },
    pdf: {
        flex: 1,
    }
});

export default ViewPdfScreen;