import React, { Component } from "react";
// import API from "../utils/API";
import Axios from "axios";

class App extends Component {
  state = {
    search: "",
    employees: [],
  };

  componentDidMount() {
    Axios.get("https://randomuser.me/api/?results=500").then((res) =>
      this.setState({
        employees: res.data.results,
        
      })
    );
    this.sortEmployeesByName();
    this.sortEmployeesByPhone();
    this.sortEmployeesByEmail();
    this.sortEmployeesByAge();
  }

  sortEmployeesByName = () => {
    function compare(a, b) {
      if (a.name.first > b.name.first) return 1;
      if (b.name.first > a.name.first) return -1;
      return 0;
    }
    const sortedEmployees = this.state.employees.sort(compare);

    this.setState({ employees: sortedEmployees });
  };

  sortEmployeesByPhone  = () => {
    function compare(a, b) {
      if (a.cell > b.cell) return 1;
      if (b.cell > a.cell) return -1;
      return 0;
    }
    const sortedEmployees = this.state.employees.sort(compare);

    this.setState({ employees: sortedEmployees });
  };

  sortEmployeesByEmail  = () => {
    function compare(a, b) {
      if (a.email > b.email) return 1;
      if (b.email > a.email) return -1;
      return 0;
    }
    const sortedEmployees = this.state.employees.sort(compare);

    this.setState({ employees: sortedEmployees });
  };

  sortEmployeesByAge  = () => {
    function compare(a, b) {
      if (a.dob.age > b.dob.age) return 1;
      if (b.dob.age > a.dob.age) return -1;
      return 0;
    }
    const sortedEmployees = this.state.employees.sort(compare);

    this.setState({ employees: sortedEmployees });
  };

  handleInputChange = (event) => {
    const searchValue = event.currentTarget.value;
    console.log(searchValue);
    this.setState({search: event.currentTarget.value});
    const searchEmpArray = this.state.employees.filter((user=>{
      console.log("user", Object.values(user));
      let results = Object.values(user).join("").toLowerCase();
      return results.indexOf(searchValue.toLowerCase()) !== -1;
    }));
    
    this.setState({ employees: searchEmpArray });
  };

  
  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid text-center bg-primary text-white">
          <h1 className="display-4">Employee Directory</h1>
          <hr className="my-4" />
          <p>
            Click on the heading to filter by the heading or use the search box
            to narow your results.
          </p>
          <input
            name="search"
            type="text"
            value={this.state.search}
            onChange={this.handleInputChange}
            placeholder="search by name"
          ></input>
        </div>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Employee</th>
              <th scope="col" onClick={this.sortEmployeesByName}>
                <button type="button" className="btn btn-outline-light">
                  Name
                </button>
              </th>
              <th scope="col" onClick={this.sortEmployeesByPhone}>
                <button type="button" className="btn btn-outline-light">
                  Phone
                </button>
              </th>
              <th scope="col" onClick={this.sortEmployeesByEmail}>
                <button type="button" className="btn btn-outline-light">
                  Email
                </button>
              </th>
              <th scope="col" onClick={this.sortEmployeesByAge}>
                <button type="button" className="btn btn-outline-light">
                  Age
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map((employee) => (
              <tr>
                <td>
                  <img
                    src={employee.picture.thumbnail}
                    alt="employee headshot"
                  />
                </td>
                <td>
                  {employee.name.first} {employee.name.last}
                </td>
                <td>{employee.cell}</td>
                <td>{employee.email}</td>
                <td>{employee.dob.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
