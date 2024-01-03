import React from 'react';
import { FIREBASE_AUTH } from '../config/FireBase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updatePassword as updateFirebasePassword, reauthenticateWithCredential } from 'firebase/auth';

export interface AuthContextInterface {
 isAuthenticated: boolean;
 login: (email: string, password: string) => Promise<void>;
 logout: () => Promise<void>;
 createUser: (email: string, password: string) => Promise<void>;
 onAuthStateChange: (nextOrObserver: any, error?: any, completed?: any) => void;
 updatePassword: (newPassword: string) => Promise<void>;
 reauthenticate: (credential: any) => Promise<void>;
}

export const authContextDefaults: AuthContextInterface = {
 isAuthenticated: false,
 login: async (email: string, password: string) => {
  await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
 },
 logout: async () => {
  await signOut(FIREBASE_AUTH);
 },
 createUser: async (email: string, password: string) => {
  await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
 },
 onAuthStateChange: (nextOrObserver: any, error?: any, completed?: any) => {
  return onAuthStateChanged(FIREBASE_AUTH, nextOrObserver, error, completed);
 },
 updatePassword: async (newPassword: string) => {
  let user = FIREBASE_AUTH.currentUser;
  if (user) {
    await updateFirebasePassword(user, newPassword);
  }
 },
 reauthenticate: async (credential: any) => {
  let user = FIREBASE_AUTH.currentUser;
  if (user) {
    await reauthenticateWithCredential(user, credential);
  }
 }
};

export const AuthContext = React.createContext<AuthContextInterface>(
 authContextDefaults
);