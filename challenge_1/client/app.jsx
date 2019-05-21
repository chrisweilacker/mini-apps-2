import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import ReactPaginate from "react-paginate";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            data: [],
            pages: 1,
            search: ''
        }
    }

    handlePageChange(pageNumber) {
        console.log(pageNumber);
        Axios.get(`http://localhost:3000/events?_page=${(pageNumber.selected+1)}&q=${this.state.search}`)
        .then((response) => {
            let pages = Math.ceil(Number(response.headers['x-total-count'])/10);
            this.setState((prevState)=>{
                return {
                    data: response.data,
                    activePage: (pageNumber.selected+1),
                    pages: pages,
                    search: prevState.search
                }
            });
            
        });
      }

    search(e) {
        let search = document.getElementById('search').value;
        Axios.get('http://localhost:3000/events?_page=1&q='+search)
        .then((response) => {
            let pages = Math.ceil(Number(response.headers['x-total-count'])/10);
            this.setState(()=>{
                return {
                    data: response.data,
                    activePage: 1,
                    pages: pages,
                    search: search
                }
            });
            
        });
        
    }

    render() {
        return(
        <div className="container">
            <div className="row">
                <h1>Historical Event Finder</h1>
                <h3>Search for a Historical Event...</h3>
                <div class="form-group">
                <label for="Search">Search: </label>
                <input id="search" type="text" className="form-control"></input>
                
                </div>
                <button className="btn btn-primary" onClick={this.search.bind(this)}>Search</button>
            </div>
            <div style={{marginTop: '15px'}} className="row">
                <table className="table table-striped table-condensed">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Lang</th>
                        <th>Category1</th>
                        <th>Category2</th>
                        <th>Granularity</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.data.map((item, index)=> {
                    return(<tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.description}</td>
                        <td>{item.lang}</td>
                        <td>{item.category1}</td>
                        <td>{item.category2}</td>
                        <td>{item.granularity}</td>
                    </tr>);
                })}
                </tbody>
                </table>
            </div>
            
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={this.state.pages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageChange.bind(this)}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
                />
        </div>);
    }
}

ReactDOM.render(<App/>, document.getElementById('App'));