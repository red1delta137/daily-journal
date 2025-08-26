import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import TodaysLog from './views/TodaysLog';
import Settings from './views/Settings'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';

export default function App() {

  return (
    <NavigationContainer>
      <ApplicationProvider {...eva} theme={eva.light}>
        <TabNavigator />
      </ApplicationProvider>
    </NavigationContainer>
  );
}

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => (
  <BottomNavigation
    style={styles.bottomNavigation}
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='TODAY' />
    <BottomNavigationTab title='SETTINGS' />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Daily Log' component={TodaysLog} />
    <Screen name='Settings' component={Settings} />
  </Navigator>
);

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
  bottomNavigation: {
    marginVertical: 8,
  }
});
