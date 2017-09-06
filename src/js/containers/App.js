import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router';
import { NavLink } from 'react-router-dom';

import { Container, Grid, Menu } from 'semantic-ui-react';

import { setDepartments, setEmployees } from '../actions/appActions';

import Departments from '../components/Departments';
import Employees from '../components/Employees';

class App extends Component {

  static state = {
    activeItem: 'departments',
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { setDepartments, setEmployees } = this.props;
    axios.get('http://localhost:3333/departments').then(({ data }) => setDepartments(data));
    axios.get('http://localhost:3333/employees').then(({ data }) => setEmployees(data));
  }

  handleItemClick(path) {
    this.setState({ activeItem: path });
  }

  render() {
    const { pathname } = this.props.router;
    return (
      <div>
        <Container>

          <Grid>
            <Grid.Column width={4}>
              <Menu pointing secondary vertical>
                <Menu.Item
                  active={pathname === '/departments'}
                  onClick={this.handleItemClick.bind(this, 'departments')}>
                  <NavLink to="/departments">Departments</NavLink>
                </Menu.Item>
                <Menu.Item
                  active={pathname === '/employees'}
                  onClick={this.handleItemClick.bind(this, 'employees')}>
                  <NavLink to="/employees">Employees</NavLink>
                </Menu.Item>
              </Menu>
            </Grid.Column>

            <Grid.Column width={12}>
              <Route exact path='/departments' component={Departments} />
              <Route path='/Employees' component={Employees} />
            </Grid.Column>
          </Grid>

        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ router }) => ({
  router: router.location,
});

const mapDispatchToProps = (dispatch) => ({
  setDepartments: (arr) => dispatch(setDepartments(arr)),
  setEmployees: (arr) => dispatch(setEmployees(arr)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(App);
