import { db } from '../firebase';

// User API

// Create User
export const doCreateUser = (id, name, email, photoURL) =>
  db.ref(`users/${id}`).set({
    name,
    email,
    photoURL,
    username: "",
    bio: "",
    gender: "",
  });

// Get all users
export const onceGetUsers = () =>
  db.ref('users').once('value');