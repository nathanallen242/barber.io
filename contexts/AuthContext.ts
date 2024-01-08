import React, { createContext, useState, useEffect, useContext } from 'react';
import { FIREBASE_DB } from '../config/FireBase';
import { getAuth } from 'firebase/auth';
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
  role?: string;
  phoneNumber?: string;
  averageRating?: number;
}

export interface AuthContextInterface {
  user: User | null;
  isAuthenticated: Boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  // Updated to include the role parameter
  createUser: (email: string, password: string, role: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  reauthenticate: (credential: any) => Promise<void>;
  updateUserProfile: (updatedUser: User) => Promise<void>
}

export const AuthContext = createContext<AuthContextInterface>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  createUser: async () => {},
  updatePassword: async () => {},
  reauthenticate: async () => {},
  updateUserProfile: async () => {}
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
     if (firebaseUser) {
       const snapshot = await get(ref(FIREBASE_DB, 'users/' + firebaseUser.uid));
       if (snapshot.exists()) {
         setUser(snapshot.val() as User);
         setIsAuthenticated(true)
       }
     } else {
       setUser(null);
       setIsAuthenticated(false)
     }
   });
   // Cleanup subscription on unmount
   return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    const userObject: User = {
      uid: firebaseUser.uid,
      email: firebaseUser.email ?? '',
      displayName: firebaseUser.displayName ?? 'Guest',
      photoURL: firebaseUser.photoURL ?? 'https://via.placeholder.com/150',
    };
    setUser(userObject);
    const dbRef = await set(ref(FIREBASE_DB, 'users/' + firebaseUser.uid), userObject);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const createUser = async (email: string, password: string, role: string) => {
   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
   const firebaseUser = userCredential.user;
   const userObject: User = {
     uid: firebaseUser.uid,
     email: firebaseUser.email ?? '',
     displayName: firebaseUser.displayName ?? 'Guest',
     photoURL: firebaseUser.photoURL ?? 'https://via.placeholder.com/150',
     role: role,
     averageRating: 0,
     phoneNumber: firebaseUser.phoneNumber ?? ''
   };
   setUser(userObject);
   const dbRef = await set(ref(FIREBASE_DB, 'users/' + firebaseUser.uid), userObject);
  
   // Create and set user to either employees or clients collection based on role
   if (role === 'barber') {
     await set(ref(FIREBASE_DB, 'employees/' + firebaseUser.uid), userObject);
   } else {
     await set(ref(FIREBASE_DB, 'clients/' + firebaseUser.uid), userObject);
   }
  };

  const updatePassword = async (newPassword: string) => {
    if (user && auth.currentUser) {
      await updateFirebasePassword(auth.currentUser, newPassword);
    }
  };

  const reauthenticate = async (credential: any) => {
    if (user && auth.currentUser) {
      await reauthenticateWithCredential(auth.currentUser, credential);
    }
  };

  const updateUserProfile = async (updatedUser: User) => {
   if (auth.currentUser) {
    await set(ref(FIREBASE_DB, 'users/' + auth.currentUser.uid), updatedUser);
    setUser(updatedUser);
  
    // Update user in either employees or clients collection based on role
    if (updatedUser.role === 'barber') {
      await set(ref(FIREBASE_DB, 'employees/' + auth.currentUser.uid), updatedUser);
    } else {
      await set(ref(FIREBASE_DB, 'clients/' + auth.currentUser.uid), updatedUser);
    }
   }
  };

  const contextValue: AuthContextInterface = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    createUser,
    updatePassword,
    reauthenticate,
    updateUserProfile,
  };

  return React.createElement(AuthContext.Provider, { value: contextValue }, children);
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
