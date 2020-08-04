import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddPerson from '../components/AddPerson/AddPerson'
import Person from '../components/Person/Person'

class Persons extends Component {
  state = {
    personsName: '',
    personAge: ''
  }

  // personAddedHandler = () => {
  //   const newPerson = {
  //     id: Math.random(), // not realy unique but good enough here
  //     name: 'John',
  //     age: Math.floor(Math.random() * 40)
  //   }
  //   this.setState((prevState) => {
  //     return { persons: prevState.persons.concat(newPerson) }
  //   })
  // }

  // personDeleteHandler = (personId) => {
  //   this.setState((prevState) => {
  //     return { persons: prevState.persons.filter(person => personId !== person.id) }
  //   })
  // }
  onAddPerson = () => {
    if (this.state.personsName && this.state.personAge) {
      this.props.onAdd(this.state.personsName, this.state.personAge)
    } else {
      alert('add name and age')
    }
  }
  render() {
    return (
      <div>
        <AddPerson personAdded={() => this.onAddPerson()} />
        <input placeholder='Add person name' name='personname' value={this.state.personsName} onChange={(val) => { this.setState({ personsName: val.target.value }) }} /> {"  "}
        <input placeholder='Add person age' minLength={2} type='number' name='personage' value={this.state.personAge} onChange={(val) => { this.setState({ personAge: val.target.value }) }} />
        {console.log(this.props.person)}
        {
          (this.props.person || []).map(person => (
            <Person
              key={person.id}
              name={person.name}
              age={person.age}
              clicked={() => { this.props.onRemove(person.id) }}
            />
          ))
        }
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    person: state.persons
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAdd: (name, age) => dispatch({
      type: "ADD_PERSON", value: {
        id: Math.random(), // not realy unique but good enough here
        name: name,
        age: age
      }
    }),
    onRemove: (id) => dispatch({ type: "REMOVE_PERSON", value: id }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons);