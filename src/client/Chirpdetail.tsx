import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

export default class Chirpdetail extends React.Component<IChirpdetailProps, IChirpdetailState> {
    constructor(props: IChirpdetailProps) {
        super(props)
        this.state = {
            user: "",
            chirp: "",
            location: ""
        }
    }
    async componentDidMount() {
        let getchirpdata = await fetch(`/api/chirp/${this.props.match.params.id}`);
        let name = await getchirpdata.json();
        this.setState({
            user: name[0].username,
            chirp: name[0].text,
            location: name[0].location
        });
    }

    handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        fetch(`/api/chirp/${this.props.match.params.id}`, {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer"
        }).then(() => {
            this.props.history.goBack();
        }).catch((err) => console.log(err));
    }

    handleBackClick = (e: React.MouseEvent) => {
        e.preventDefault();
        this.props.history.goBack();
    }

    render() {
        return (
            <section className="row text-center">
                <section className="col-12"><h1>Chirp Detials</h1></section>
                <section className="col-2"></section>
                <section className="col-8 border border-primary rounded">
                    <h4>Username: {this.state.user}</h4>
                    <h5>Chirp: {this.state.chirp}</h5>
                    <h6>Location: {this.state.location}</h6>
                    <Link to={`/chirp/${this.props.match.params.id}/edit`} className="btn btn-dark">Change Chirp</Link>
                    <button className="btn btn-danger m-1" onClick={this.handleDeleteClick}>Delete</button>
                    <button className="btn btn-secondary m-1" onClick={this.handleBackClick}>Back</button>
                </section>
                <section className="col-2">
                    
                </section>
            </section>
        )
    }
}

interface IChirpdetailProps extends RouteComponentProps<{ id: string }> {

}

interface IChirpdetailState {
    user: string,
    chirp: string,
    location: string
}