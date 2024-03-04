import { useRef, useState } from 'react';
import { StyleSheet, SafeAreaView, Button, View } from 'react-native';
import { useTheme } from '@react-navigation/native'
import Pdf from 'react-native-pdf';
import Screen from './Screen';

function ViewPdfScreen(props) {
    const { colors: colorsByTheme } = useTheme()
    const onlineSource = { uri: "http://samples.leanpub.com/thereactnativebook-sample.pdf", cache: true };
    const [pdfSource, setPdfSource] = useState(onlineSource);
    const pdfRef = useRef();
    return (
        <Screen style={[
                styles.container,
                { backgroundColor: colorsByTheme.Login_background, paddingTop: 5 },
            ]}
        >   
        <Pdf
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
                style={styles.pdf}
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