import { db } from '../firebase';

// User API
export const doCreateUser = (id, username, email, photoURL) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    photoURL
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');