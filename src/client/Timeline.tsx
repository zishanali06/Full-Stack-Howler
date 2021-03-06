import * as React from 'react';
import Chirps from './Chirp';
import * as io from 'socket.io-client';
let http = require('http');


export default class Timeline extends React.Component<ITimelineProps, ITimelineState> {

    constructor(props: ITimelineProps) {
        super(props);

        this.state = {
            chirpArray: [],
            user: "",
            chirptext: "",
            count: 1001,
            location: ""
        };
    }
    private socket: any = null;


    async componentDidMount() {
        let getchirpdata = await fetch('/api/chirp');
        let name = await getchirpdata.json();
        let newchirparray = Object.keys(name).map(id => {
            return {
                id: name[id].id,
                user: name[id].username,
                chirp: name[id].chirp
            }
        });
        this.setState({
            chirpArray: newchirparray.reverse(),
            count: (parseInt(newchirparray[newchirparray.length - 1].id, 10) + 1)
        });

        //using socket
        this.socket = io.connect();
        this.socket.on('newChirp', async () => {
            let getchirpdata = await fetch('/api/chirp');
            let name = await getchirpdata.json();
            let newchirparray = Object.keys(name).map(id => {
                return {
                    id: name[id].id,
                    user: name[id].username,
                    chirp: name[id].chirp
                }
            });
            this.setState({
                chirpArray: newchirparray.reverse(),
                count: (parseInt(newchirparray[newchirparray.length - 1].id, 10) + 1)
            });
        });
        //end of socket
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    handleonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        let chirp = {
            userid: this.state.user,
            text: this.state.chirptext,
            location: this.state.location
        };
        fetch('/api/chirp', {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify(chirp) // body data type must match "Content-Type" header
        }).then((results) => results.json())
            .then((newdata) => {
                //map thru results by key ID
                let newchirparray = Object.keys(newdata).map(id => {
                    return {
                        id: newdata[id].id,
                        user: newdata[id].username,
                        chirp: newdata[id].chirp
                    }
                });
                this.setState({
                    chirpArray: newchirparray.reverse(),
                    count: (parseInt(newchirparray[newchirparray.length - 1].id, 10) + 1)
                });
            })
            //SENT NEW DATA BACK AS RESPONSE AND TAKING THAT RESPONSE AND SETTING AS NEW ARRAY WITH NEW CHIRP
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <React.Fragment>
                <section className="row">
                    <section className="col-4"></section>
                    <section className="col-4"><h3 className="text-center text-light">Timeline</h3></section>
                    <section className="col-4"></section>
                </section>
                <section className="row">
                    <section className="col-md-4">
                        <form className="form-group p-3 border border-info rounded col-md-12 bg-light mt-3">
                            <input
                                type="text"
                                placeholder="Type Chirp Here"
                                className="my-3 form-control"
                                value={this.state.chirptext}
                                onChange={e => this.setState({ chirptext: e.target.value })} />
                            <input
                                type="text"
                                placeholder="Type ID Here(Only 1-10)"
                                className="my-3 form-control"
                                value={this.state.user}
                                onChange={e => this.setState({ user: e.target.value })} />
                            <input
                                type="text"
                                placeholder="Type Location Here"
                                className="my-3 form-control"
                                value={this.state.location}
                                onChange={e => this.setState({ location: e.target.value })} />
                            <br />
                            <button className="btn btn-outline-primary btn-sm" onClick={this.handleonClick}>Click to Add <img src="http://joshi-ma.net/wp-content/uploads/e034.gif" alt="" /></button>
                        </form>
                    </section>
                    <section className="col-md-6">
                        {this.state.chirpArray.map((chirp) => {
                            return <Chirps chirp={chirp} key={chirp.id} />
                        })}
                    </section>
                    <section className="row">
                        <section className="col-12"><h3 className="text-center text-light">Made by ZishanTheDon</h3></section>
                        <section className="col-12"><h3 className="text-center text-light">Show bottom</h3></section>
                        <section className="col-12"><h3 className="text-center text-light">This</h3></section>
                        <section className="col-12"><h3 className="text-center text-light">is</h3></section>
                        <section className="col-12"><h3 className="text-center text-light">very</h3></section>
                        <section className="col-12"><h3 className="text-center text-light">nice</h3></section>
                        <section className="col-12"><h3 className="text-center text-light">background</h3></section>
                        <section className="col-12"><h3 className="text-center text-light">image</h3></section>
                        <section className="col-12"><h3 className="text-center text-light">Made</h3></section>
                        <section className="col-12"><h3 className="text-center text-light">BY</h3></section>
                        <section className="col-12"><h3 className="text-center text-light">ZishanTheDon</h3></section>
                        <section className="col-12"><h3 className="text-center text-light">Show bottom</h3></section>
                        <section className="col-12"><h3 className="text-center text-light">Show bottom</h3></section>
                        <section className="col-12"><h3 className="text-center text-light">Show bottom</h3></section>
                    </section>
                    <section className="row">
                        <section className="col-12"><h3 className="text-center text-light">Made by ZishanTheDon</h3></section>
                    </section>
                </section>
            </React.Fragment>
        )
    }
}

interface ITimelineProps {

}

interface ITimelineState {
    chirpArray: {
        id: string,
        user: string,
        chirp: string
    }[];
    user: string;
    chirptext: string;
    location: string;
    count: number;
}
