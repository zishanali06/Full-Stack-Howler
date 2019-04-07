import * as React from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import Timeline from './Timeline';
import Chirpdetail from './Chirpdetail';
import Chirpchange from './Chirpchange';

import './scss/app';

export default class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);

        this.state = { name: null };
    }

    async componentWillMount() {
        let r = await fetch('/api/hello');
        let name = await r.json();
        this.setState({ name })
    }

    render () {
        return (
            <main className="container">
                <section className="row text-center">
                    <h1 className="col-12">Howler Plus!</h1>
                </section>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Timeline}></Route>
                        <Route path="/chirp/:id/edit" component={Chirpchange}></Route>
                        <Route path="/chirp/:id" component={Chirpdetail}></Route>
                    </Switch>
                </Router>
            </main>
        )
    }
}

interface IAppProps {

}

interface IAppState {
    name: string;
}