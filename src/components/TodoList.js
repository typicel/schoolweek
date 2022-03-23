import React from 'react';
import Todo from './Todo'
import {Button} from 'react-bootstrap'

const TodoList = ({list, handleToggle, handleFilter}) => {
    return(
      <div>
  
      <div className="card-group">
        {list.map(todo => {
          return (
            <Todo todo={todo} handleToggle={handleToggle} />
            )
          })}
      </div>
      {list.length > 0 ? <Button variant="danger" style={{margin: '20px'}} onClick={handleFilter}> Clear Finished Tasks </Button> : null}
      </div>
    )
  }

export default TodoList;