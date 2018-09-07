import { db } from '../firebase';

// User API

// Users

  // Create User
  export const doCreateUser = (id, name, email, photoURL) =>
    db.ref(`users/${id}`).set({
      name,
      email,
      photoURL,
      eventsGoing: [""],
      username: "",
      bio: "",
      gender: "",
    });

  // Get all users
  export const onceGetUsers = () =>
    db.ref('users').once('value');

// Events

  // Create Events
  export const doCreateEvent = (id, uid, title, location, address, date, time, description, imageURL, members) =>
  db.ref(`events/${id}`).set({
    id,
    uid,
    title,
    location,
    address,
    date,
    time,
    description,
    imageURL,
    members: members
  });

  // Get all Events
  export const onceGetEvents = () =>
  db.ref('events').once('value');

  // All child events
  export const getChildEvents = () =>
  db.ref().child("events");
