import React, { PropTypes } from 'react';
import { Table, Segment, Button } from 'semantic-ui-react';
import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeDepartment, renameDepartment } from '../../actions/appActions';

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  removeItem(i) {
    const { removeDepartment } = this.props;
    if (confirm('Are you sure? 0_o')) {
      removeDepartment(i);
      axios.delete(`http://localhost:3333/departments/${i}`);
    }
  }

  renameItem(i) {
    const { renameDepartment } = this.props;
    const newName = prompt('Enter new name:');
    if (newName) {
      renameDepartment(i, newName);
      axios.put(`http://localhost:3333/departments/${i}`, {
        name: newName,
      });
    }
  }

  render() {
    const { departments } = this.props;
    return (
      <Segment loading={!departments.length ? true : false}>
        {
          departments ? <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>№</Table.HeaderCell>
                <Table.HeaderCell>Department name</Table.HeaderCell>
                <Table.HeaderCell width={1}></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                departments.map((item, key) => (
                  <Table.Row key={key}>
                    <Table.Cell>{item.id}</Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>
                      <Button onClick={this.renameItem.bind(this, item.id)} color="blue" icon="edit"></Button>
                      <Button onClick={this.removeItem.bind(this, item.id)} color="red" icon="remove"></Button>
                    </Table.Cell>
                  </Table.Row>
                ))
              }
            </Table.Body>
          </Table> : <div><br/><br/><br/></div>
        }
      </Segment>
    );
  }

}

const mapStateToProps = ({ reducers }) => ({
  departments: reducers.departments,
});

const mapDispatchToProps = (dispatch) => ({
  removeDepartment: (i) => dispatch(removeDepartment(i)),
  renameDepartment: (i, name) => dispatch(renameDepartment(i, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
