import { registerRootComponent } from 'expo';

import App from './App.js';
// import { AppProvider } from './components/AppProvider.js';


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

// const Root = () => {
//     return (
//         <AppProvider>
//             <App />
//         </AppProvider>
//     )
// }

registerRootComponent(App);