import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../redux/userSlice';
import { Link } from 'react-router-dom';

const Home = () => {
  const users = useSelector(state => state.users.users);
  const dispatch = useDispatch();

  // Styles
  const containerStyle = {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    background: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const buttonStyle = {
    padding: '10px 15px',
    margin: '5px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: '0.3s ease',
  };

  const addButtonStyle = {
    ...buttonStyle,
    background: '#28a745',
    color: 'white',
  };

  const editButtonStyle = {
    ...buttonStyle,
    background: '#007bff',
    color: 'white',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    background: '#dc3545',
    color: 'white',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: '0',
  };

  const listItemStyle = {
    padding: '10px',
    background: '#fff',
    margin: '10px 0',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <div style={containerStyle}>
        <h1>CRUD-OPERATION</h1>
      <h2>User List</h2>
      <Link to="/add">
        <button style={addButtonStyle}>Add User</button>
      </Link>
      <ul style={listStyle}>
        {users.map(user => (
          <li key={user.id} style={listItemStyle}>
            <span>{user.name} - {user.email}</span>
            <div>
              <Link to={`/edit/${user.id}`}>
                <button style={editButtonStyle}>Edit</button>
              </Link>
              <button
                onClick={() => dispatch(deleteUser(user.id))}
                style={deleteButtonStyle}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
