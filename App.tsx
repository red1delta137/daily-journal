import { StyleSheet, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { Card } from '@ui-kitten/components';
import TodaysLog from './views/TodaysLog';
import { SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function App() {


  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContainer}
          extraScrollHeight={24}
          enableOnAndroid
          keyboardOpeningTime={0}
        >
          <Card style={styles.card}>
            <TodaysLog />
          </Card>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ApplicationProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  layout: {
    flex: 1,
    justifyContent: 'flex-start', // push children to the top
    alignItems: 'flex-start',         // optional: keep it horizontally centered
    paddingTop: 50,               // optional: add some spacing from status bar
  },
  card: {
    alignSelf: 'stretch',
    marginLeft: 16,
    marginRight: 16
  },
  scrollContainer: {
    padding: 16,
  }
});
