// import React, { Component } from 'react';
// import './App.css';
// import { BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom"

// //pages
// import MainPage from "./components/main";
// import ResultPage from "./components/result";
// import SavedPage from "./components/saved";

// class App extends Component {
//   render(){
//     return (
//       <Router>
//         <Switch>
//           <Route exact path="/" component={MainPage}/>
//           <Route exact path="/result" component={ResultPage}/>
//           <Route exact path="/saved" component={SavedPage}/>
//         </Switch>
//       </Router>
//     )

//   }
// }




// export default App;

import React, { Component } from 'react';
import PageHandler from './components/pageHandler'
import './App.css';

import { Provider } from 'react-redux';
import store from './store';

class Main extends Component {

  render() {
    return (
      <Provider store={store}>
        <PageHandler />
      </Provider>
    )
  }
  
}


export default Main;
