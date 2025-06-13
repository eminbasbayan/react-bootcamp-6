import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { USER_ROLES, isAdmin, hasPermission } from '../constants/roles';

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
        try {
          // Firestore'dan kullanıcı verilerini al (role için)
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.exists() ? userDoc.data() : null;
          
          const userInfo = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            emailVerified: firebaseUser.emailVerified,
            photoURL: firebaseUser.photoURL,
            phoneNumber: firebaseUser.phoneNumber,
            createdAt: firebaseUser.metadata.creationTime,
            lastLoginAt: firebaseUser.metadata.lastSignInTime,
            providerData: firebaseUser.providerData,
            // Firestore'dan gelen veriler
            role: userData?.role || USER_ROLES.USER,
            isActive: userData?.isActive !== false,
            permissions: userData?.permissions || []
          };
          
          setUser(userInfo);
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Firebase Auth verilerini kullan, role'ü default yap
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            emailVerified: firebaseUser.emailVerified,
            photoURL: firebaseUser.photoURL,
            phoneNumber: firebaseUser.phoneNumber,
            createdAt: firebaseUser.metadata.creationTime,
            lastLoginAt: firebaseUser.metadata.lastSignInTime,
            providerData: firebaseUser.providerData,
            role: USER_ROLES.USER,
            isActive: true,
            permissions: []
          });
        }
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
    isEmailVerified: user?.emailVerified || false,
    userEmail: user?.email,
    userName: user?.displayName,
    userId: user?.uid,
    userRole: user?.role,
    isAdmin: user ? isAdmin(user.role) : false,
    isActive: user?.isActive || false,
    hasPermission: (permission) => user ? hasPermission(user.role, permission) : false
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 