import { useRef, useState } from 'react';
import { StyleSheet, SafeAreaView, Button, View } from 'react-native';
import { useTheme } from '@react-navigation/native'
import Pdf from 'react-native-pdf';
import Screen from './Screen';
import reports from '../api/reports';
import { Buffer } from 'buffer'
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
    const [pdfSource, setPdfSource] = useState({uri: '', cache: true});
    const pdfRef = useRef();
    return (
        <Screen style={[
            styles.container,
            { backgroundColor: colorsByTheme.Login_background, paddingTop: 5 },
        ]}
        >
            <Pdf
            renderActivityIndicator={() => (<MyText style={{fontWeight: 'bold', fontSize: 25}}>
                Loading...
            </MyText>)}
                trustAllCerts={false}
                ref={pdfRef}
                source={pdfSource}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={ [styles.pdf, {backgroundColor: colorsByTheme.Login_background}]}
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