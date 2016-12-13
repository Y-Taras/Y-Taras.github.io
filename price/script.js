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
                        this.setState({data: tempData});

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
                    <th>1</th>
                    <th>2</th>
                    <th>2</th>
                    <th>2</th>
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

        const convertT = (data)=> {
            let arr = data.split(/(?:,\s)?_[a-z\d]+:\s/g);
            arr.shift();
            return arr;
        };

        let rowDataArray = convertT(this.props.user.content.$t);

        return (
            <tr key={this.props.index}>
                <td>{this.props.index + 1}</td>
                <td>
                    <span>{this.props.user.title.$t}</span>
                </td>
                <td>{rowDataArray[0]}</td>
                <td>{rowDataArray[1]}</td>
                <td>{rowDataArray[2]}</td>
            </tr>
        )
    }
}

ReactDOM.render(<TableBox />, document.getElementById('root'));


