import React, { Component } from "react";
// import API from "../utils/API";
import Axios from "axios";

class App extends Component {
  state = {
    search: "",
    employees: [],
    filterEmployees: [],
    // error: ""
  };

  componentDidMount() {
    Axios.get("https://randomuser.me/api/?results=500").then((res) =>
      this.setState({
        employees: res.data.results,
      })
    );
    console.log(this.state.employees);
    this.sortEmployees();
  }

  sortEmployees = () => {
    function compare(a, b) {
      console.log("A: ", a);
      console.log("B: ", b);
      if (a.employees.name.first > b.employees.name.first) return 1;
      if (b.employees.name.first > a.employees.name.first) return -1;
      return 0;
    }
    const sortedEmployees = this.state.employees.sort(compare);

    this.setState({ sortedEmployees });
  };

  // handleSearch = (e) => {
  //   // const searchValue = this.state.search;
  //   const filteredEmpArray = this.state.employees.filter((employee) => {
  //     return (
  //       employee.name.first
  //         .toLowerCase()
  //         .indexOf(e.target.value.toLowerCase()) !== -1
  //     );
  //   });
  //   this.setState({ filterEmployees: filteredEmpArray });
  // };

  // handleInputChange = event => {
  //   // Getting the value and name of the input which triggered the change
  //   const { name, value } = event.target;

  //   // Updating the input's state
  //   this.setState({
  //     [name]: value
  //   });
  // };

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
          {/* <input
            name="search"
            type="text"
            value={this.state.search}
            onChange={this.handleInputChange}
            onClick={this.handleSearch}
            placeholder="search by name"
          ></input> */}
        </div>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">
                  Employee
              </th>
              <th scope="col" onClick={this.sortEmployees}>
                <button type="button" className="btn btn-outline-light">
                  Name
                </button>
              </th>
              <th scope="col">
                <button type="button" className="btn btn-outline-light">
                  Phone
                </button>
              </th>
              <th scope="col">
                <button type="button" className="btn btn-outline-light">
                  Email
                </button>
              </th>
              <th scope="col">
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
