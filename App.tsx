import React from 'react';
import Navigator from './src/navigation/Navigator';
import { Provider } from 'react-redux';
import { store } from './src/store/store';



function App(): JSX.Element {

  return (
      <Provider store={store}>
        <Navigator /> 
      </Provider>
     
  
  );
}


export default App;
