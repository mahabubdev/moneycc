import  React  from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import routes from './register'

function Routers (props) {
    return(
        <Router>
            <Switch>
                { routes.map(route => (<Route exact path={route.path} key={route.path} component={route.component} />)) }
            </Switch>
        </Router>
    )
}

export default Routers