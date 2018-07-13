import { db } from '../firebase';

// User API

// Create User
export const doCreateUser = (id, username, email, photoURL) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    photoURL
  });

// Get all users
export const onceGetUsers = () =>
  db.ref('users').once('value');