import * as React from 'react';
import { RouteChildrenProps } from 'react-router';

export default class Chirpchange extends React.Component<IChirpchangeProps, IChirpchangeState>{
    constructor(props: IChirpchangeProps) {
        super(props)
        this.state = {
            usertext: "",
            chirptext: ""
        }
    }

    async componentDidMount() {
        let getchirpdata = await fetch(`/api/chirp/${this.props.match.params.id}`);
        let name = await getchirpdata.json();
        this.setState({
            usertext: name[0].username,
            chirptext: name[0].text
        })
    }

    handleonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        let chirp = {
            text: this.state.chirptext
        }
        fetch(`/api/chirp/${this.props.match.params.id}`, {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify(chirp)
        }).then(() => {
            this.props.history.push('/');
        }).catch((err) => console.log(err));

    }
    render() {
        return (
            <section className="row text-center">
                <section className="col-12"><h1>Chirp Detials</h1></section>
                <section className="col-md-4"></section>
                <section className="col-md-4">
                    <h3>Change Chirp</h3>
                    <form className="form-group p-3 border border-info rounded col-md-12">
                        <input
                            type="text"
                            placeholder="Type Chirp Here"
                            className="my-3 form-control"
                            value={this.state.chirptext}
                            onChange={e => this.setState({ chirptext: e.target.value })} />
                        <input
                            type="text"
                            placeholder="Type Username Here"
                            className="my-3 form-control"
                            value={this.state.usertext}
                            onChange={e => this.setState({ usertext: e.target.value })} />
                        <br />
                        <button className="btn btn-outline-primary btn-sm" onClick={this.handleonClick}>Change Chirp <img src="http://joshi-ma.net/wp-content/uploads/e034.gif" alt="" /></button>
                    </form>
                </section>
                <section className="col-md-4"></section>
            </section>
        )
    }
}

interface IChirpchangeProps extends RouteChildrenProps<{ id: string }> {

}

interface IChirpchangeState {
    usertext: string,
    chirptext: string
}