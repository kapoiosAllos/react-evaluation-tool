import React from 'react'
import Routes from './routes'
import PropTypes from 'prop-types'
import Navigation from './components/Navigation'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from './styles/theme'

class App extends React.Component {
  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }
  getChildContext() {
  return { muiTheme }
}
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
             <div className="App">
               <Navigation />
               <Routes />
             </div>
     </MuiThemeProvider>
    )
  }
}

export default App
