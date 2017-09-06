import React, { PropTypes } from 'react';
import { Table, Segment, Button, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeEmployee, editEmployee } from '../../actions/appActions';

class Employees extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false,
      currentEmployee: {},
    };
  }

  getDepartmentById(i) {
    const { departments } = this.props;
    return departments.filter((_, index) => i == index)[0].name;
  }

  removeEmployee(i) {
    const { removeEmployee } = this.props;
    if (confirm('Are you sure? 0_o')) {
      removeEmployee(i);
      axios.delete(`http://localhost:3333/employees/${i}`);
    }
  }

  editEmployee(id, currentEmployee) {
    this.setState({
      currentEmployee: {
        id: id,
        ...currentEmployee,
      },
    }, () => this.showHideModal(true));
  }

  showHideModal(b) {
    this.setState({
      visibleModal: b,
    });
  }

  changeFiled(field, input, select) {
    const { value } = !select ? input.target : select;
    this.setState({
      currentEmployee: {
        ...this.state.currentEmployee,
        [field]: value,
      },
    });
  }

  saveEmployee() {
    const { editEmployee } = this.props;
    const { currentEmployee } = this.state;
    editEmployee(currentEmployee);
    axios.put(`http://localhost:3333/employees/${currentEmployee.id}`, currentEmployee);
    this.showHideModal(false);
  }

  render() {
    const { employees, departments } = this.props;
    const departmentsOptions = departments.map((item, i) => ({
      text: item.name,
      value: i,
    }));
    return (
      <div>
        <Modal open={this.state.visibleModal} onClose={this.showHideModal.bind(this, false)} size='tiny'>
          <Modal.Header>Edit employee</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Input
                onChange={this.changeFiled.bind(this, 'firstName')}
                id="firstName-field"
                label='First name'
                control='input'
                placeholder="Enter first name"
                value={this.state.currentEmployee.firstName}
              />
              <Form.Input
                onChange={this.changeFiled.bind(this, 'lastName')}
                id="lastName-field"
                label='Last name'
                control='input'
                placeholder="Enter last name"
                value={this.state.currentEmployee.lastName}
              />
              <Form.Select
                onChange={this.changeFiled.bind(this, 'departmentId')}
                id="lastname-field"
                label='Department'
                options={departmentsOptions}
                placeholder="Enter last name"
                value={this.state.currentEmployee.departmentId}
              />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.showHideModal.bind(this, false)}>Close</Button>
            <Button onClick={this.saveEmployee.bind(this)} positive icon='checkmark' labelPosition='right' content='Save' />
          </Modal.Actions>
        </Modal>
        <Segment loading={!employees.length ? true : false}>
          {
            employees ? <Table singleLine>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>№</Table.HeaderCell>
                  <Table.HeaderCell>First name</Table.HeaderCell>
                  <Table.HeaderCell>Last name</Table.HeaderCell>
                  <Table.HeaderCell>Department</Table.HeaderCell>
                  <Table.HeaderCell width={1}></Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {
                  employees.map((item, key) => (
                    <Table.Row key={key}>
                      <Table.Cell>{item.id}</Table.Cell>
                      <Table.Cell>{item.firstName}</Table.Cell>
                      <Table.Cell>{item.lastName}</Table.Cell>
                      <Table.Cell>{this.getDepartmentById(item.departmentId)}</Table.Cell>
                      <Table.Cell>
                        <Button onClick={this.editEmployee.bind(this, item.id, item)} color="blue" icon="edit"></Button>
                        <Button onClick={this.removeEmployee.bind(this, item.id)} color="red" icon="remove"></Button>
                      </Table.Cell>
                    </Table.Row>
                  ))
                }
              </Table.Body>
            </Table> : <div><br/><br/><br/></div>
          }
        </Segment>
      </div>
    );
  }

}

const mapStateToProps = ({ reducers }) => ({
  employees: reducers.employees,
  departments: reducers.departments,
});

const mapDispatchToProps = (dispatch) => ({
  removeEmployee: (i) => dispatch(removeEmployee(i)),
  editEmployee: (obj) => dispatch(editEmployee(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
