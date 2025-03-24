import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  selectedUsers: [], // ✅ Store selected users
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      const { id, name, email } = action.payload;
      const user = state.users.find(user => user.id === id);
      if (user) {
        user.name = name;
        user.email = email;
      }
    },
    toggleSelectUser: (state, action) => {
      const id = action.payload;
      if (state.selectedUsers.includes(id)) {
        state.selectedUsers = state.selectedUsers.filter(userId => userId !== id);
      } else {
        state.selectedUsers.push(id);
      }
    },
    deleteSelectedUsers: (state) => {
      state.users = state.users.filter(user => !state.selectedUsers.includes(user.id));
      state.selectedUsers = []; // Clear selection
    }
  }
});

export const { addUser, deleteUser, updateUser, toggleSelectUser, deleteSelectedUsers } = userSlice.actions;
export default userSlice.reducer;
