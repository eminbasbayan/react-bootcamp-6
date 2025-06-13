import React, { createContext, useContext, useEffect, useState } from 'react';
import { subscribeToAuthChanges } from '../services/authService';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Firebase user objesinden doğru bilgileri al
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          emailVerified: firebaseUser.emailVerified, // Firebase'den gelen gerçek emailVerified durumu
          photoURL: firebaseUser.photoURL,
          phoneNumber: firebaseUser.phoneNumber,
          createdAt: firebaseUser.metadata.creationTime,
          lastLoginAt: firebaseUser.metadata.lastSignInTime,
          providerData: firebaseUser.providerData
        };
        
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isEmailVerified: user?.emailVerified || false, // Firebase'den gelen emailVerified değeri
    userEmail: user?.email,
    userName: user?.displayName,
    userId: user?.uid
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 