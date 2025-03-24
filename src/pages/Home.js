import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../redux/userSlice';
import { Link } from 'react-router-dom';

const Home = () => {
  const users = useSelector(state => state.users.users);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Filter users based on search input
  const filterResult = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Toggle individual user selection
  const handleCheckbox = (id) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id]
    );
  };

  // Select or Deselect all users
  const handleSelectAll = () => {
    if (selectedUsers.length === filterResult.length) {
      setSelectedUsers([]); // Deselect all
    } else {
      setSelectedUsers(filterResult.map(user => user.id)); // Select all
    }
  };

  // Bulk delete selected users
  const deleteSelectedUsers = () => {
    selectedUsers.forEach(id => dispatch(deleteUser(id)));
    setSelectedUsers([]); // Clear selection after deletion
  };

  return (
    <div style={containerStyle}>
      <h1>CRUD-OPERATION</h1>
      <h2>User List</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '5px', marginBottom: '10px', width: '100%' }}
      />

      {/* Add User Button */}
      <Link to="/add">
        <button style={addButtonStyle}>Add User</button>
      </Link>

      {/* Select All Checkbox */}
      {filterResult.length > 0 && (
        <div style={{ marginBottom: '10px' }}>
          <input
            type="checkbox"
            checked={selectedUsers.length === filterResult.length}
            onChange={handleSelectAll}
          />{' '}
          Select All
        </div>
      )}

      {/* Bulk Delete Button */}
      {selectedUsers.length > 0 && (
        <button onClick={deleteSelectedUsers} style={deleteButtonStyle}>
          Delete Selected ({selectedUsers.length})
        </button>
      )}

      {/* User List */}
      <ul style={listStyle}>
        {filterResult.map(user => (
          <li key={user.id} style={listItemStyle}>
            <input
              type="checkbox"
              checked={selectedUsers.includes(user.id)}
              onChange={() => handleCheckbox(user.id)}
            />
            <span>{user.name} - {user.email}</span>
            <div>
              <Link to={`/edit/${user.id}`}>
                <button style={editButtonStyle}>Edit</button>
              </Link>
              <button
                onClick={() => setConfirmDelete(user)}
                style={deleteButtonStyle}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <p>Are you sure you want to delete <b>{confirmDelete.name}</b>?</p>
            <button onClick={() => {
              dispatch(deleteUser(confirmDelete.id));
              setConfirmDelete(null);
            }} style={confirmButtonStyle}>Yes</button>
            <button onClick={() => setConfirmDelete(null)} style={cancelButtonStyle}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

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

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalStyle = {
  background: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
};

const confirmButtonStyle = {
  ...buttonStyle,
  background: '#28a745',
  color: 'white',
};

const cancelButtonStyle = {
  ...buttonStyle,
  background: '#6c757d',
  color: 'white',
};
