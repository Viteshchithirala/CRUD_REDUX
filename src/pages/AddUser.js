import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser({ id: uuidv4(), name, email }));
    navigate('/');
  };

  // Styles
  const formStyle = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    background: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const inputStyle = {
    width: '90%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  };

  const buttonStyle = {
    padding: '10px 15px',
    background: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: '0.3s ease',
  };

  const buttonHoverStyle = {
    background: '#218838',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Add User</h2>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        style={inputStyle}
      />
      <input
        type="email"
        placeholder="Enter E-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={inputStyle}
      />
      <button
        type="submit"
        style={buttonStyle}
        onMouseEnter={(e) => (e.target.style.background = buttonHoverStyle.background)}
        onMouseLeave={(e) => (e.target.style.background = buttonStyle.background)}
      >
        Add User
      </button>
    </form>
  );
};

export default AddUser;
