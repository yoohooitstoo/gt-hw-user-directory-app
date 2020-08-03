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
    Axios.get("https://randomuser.me/api/?results=100").then((res) =>
      this.setState({
        employees: res.data.results,
        filterEmployees: res.data.results,
      })
    );
  }

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

  render() {
    const ListOfEmp = this.state.employees.map((employee) => (
      <tr>
        <td>
          <img src={employee.picture.thumbnail} alt="employee headshot" />
        </td>
        <td>
          {employee.name.first} {employee.name.last}
        </td>
        <td>{employee.cell}</td>
        <td>{employee.email}</td>
        <td>{employee.dob.age}</td>
      </tr>
    ));
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
            type="text"
            value={this.state.search}
            onChange={this.handleSearch}
          ></input>
        </div>
        <table className="table table-striped">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col">Age</th>
          </tr>
          <tbody>{ListOfEmp}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
