import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';

export default class Chirps extends React.Component<IChirpProps, IChirpState> {
    constructor(props: IChirpProps) {
        super(props)
    }

    render() {

        // let user = this.props.chirp.user;
        // let chirptext = this.props.chirp.chirp;
        // ABOVE IS SAME AS BELOW
        const { user, chirp } = this.props.chirp;
        return (
            <div className="d-flex justify-content-between border border-secondary rounded1 m-1">
                <div><p className="mt-2 ml-2"><img
                src="http://joshi-ma.net/wp-content/uploads/e034.gif" 
                alt="" /><span className="font-weight-bold">{`  ${user}`}</span>{`: ${chirp}`}</p></div><div><Link to={`/chirp/${this.props.chirp.id}`}>
                <button className="btn btn-success btn-sm align-right mt-2 mr-3">Details</button></Link></div>
            </div>
        )
    }
}

export interface IChirpProps {
    chirp: {
        id: string,
        user: string,
        chirp: string
    }
}

export interface IChirpState {
    user: string,
    chirptext: string
}