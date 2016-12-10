class TableBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    loadCampersFromServer() {
        let spreadsheetId = "1EQooWYnjOoY_UC0BLLnH-vXBA073jA8K14jYeAXZAi0";
        let url = "https://spreadsheets.google.com/feeds/list/" +
            spreadsheetId + "/od6/public/basic?alt=json";
        fetch(url)
            .then(
                (response) => {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ${response.status}');
                        return;
                    }
                    response.json().then((data) => {
                        console.log('getting data:..', data.feed.entry);
                        let tempData = data.feed.entry;
                        this.setState({data : tempData});

                    })
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

    componentDidMount() {
        this.loadCampersFromServer();
    }

    render() {
        return <CampersList _data={this.state.data}/>;
    }
}

class CampersList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let campersNodes = this.props._data.map((element, index) => {
            return (
                <Camper user={element} index={index} key={index}/>

            );
        });
        return (
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Назва Виробу</th>
                    <th>Ціна та розмір</th>
                </tr>
                </thead>
                <tbody>
                {campersNodes}
                </tbody>
            </table>
        )
    }
}

class Camper extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr key={this.props.index}>
                <td>{this.props.index + 1}</td>
                <td>
                    <span>{this.props.user.title.$t}</span>
                </td>
                <td>{this.props.user.content.$t}</td>
            </tr>
        )
    }
}

ReactDOM.render(<TableBox />, document.getElementById('root'));


