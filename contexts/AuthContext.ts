import React, { createContext, useState, useEffect, useContext } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../config/FireBase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword as updateFirebasePassword,
  reauthenticateWithCredential
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export interface AuthContextInterface {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  createUser: (email: string, password: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  reauthenticate: (credential: any) => Promise<void>;
}

export const AuthContext = createContext<AuthContextInterface>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  createUser: async () => {},
  updatePassword: async () => {},
  reauthenticate: async () => {}
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (firebaseUser) => {
      if (firebaseUser) {
        const dbRef = ref(FIREBASE_DB, `users/${firebaseUser.uid}`);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          setUser(snapshot.val() as User);
        }
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    const firebaseUser = userCredential.user;
    const userObject: User = {
      uid: firebaseUser.uid,
      email: firebaseUser.email ?? '',
      displayName: firebaseUser.displayName || undefined,
      photoURL: firebaseUser.photoURL || undefined
    };
    setUser(userObject);
    const dbRef = ref(FIREBASE_DB, `users/${firebaseUser.uid}`);
    set(dbRef, userObject);
  };

  const logout = async () => {
    await signOut(FIREBASE_AUTH);
    setUser(null);
  };

  const createUser = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
    const firebaseUser = userCredential.user;
    const userObject: User = {
      uid: firebaseUser.uid,
      email: firebaseUser.email ?? '',
      displayName: firebaseUser.displayName ?? undefined,
      photoURL: firebaseUser.photoURL ?? undefined,
    };
    setUser(userObject);
    const dbRef = ref(FIREBASE_DB, `users/${firebaseUser.uid}`);
    set(dbRef, userObject);
  };

  const updatePassword = async (newPassword: string) => {
    if (user && FIREBASE_AUTH.currentUser) {
      await updateFirebasePassword(FIREBASE_AUTH.currentUser, newPassword);
    }
  };

  const reauthenticate = async (credential: any) => {
    if (user && FIREBASE_AUTH.currentUser) {
      await reauthenticateWithCredential(FIREBASE_AUTH.currentUser, credential);
    }
  };

  const contextValue: AuthContextInterface = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    createUser,
    updatePassword,
    reauthenticate
  };

  return React.createElement(AuthContext.Provider, { value: contextValue }, children);
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
