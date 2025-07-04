import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
  onAuthStateChanged,
  sendPasswordResetEmail,
  reload
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { USER_ROLES } from '../constants/roles';

// Kullanıcı kayıt işlemi
export const registerUser = async (userData) => {
  try {
    const { fullName, email, password, phone } = userData;
    
    // Firebase Auth ile kullanıcı oluştur
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Kullanıcı profil bilgisini güncelle
    await updateProfile(user, {
      displayName: fullName
    });
    
    // Email doğrulama gönder
    await sendEmailVerification(user);
    
    // Firestore'da kullanıcı belgesi oluştur - DEFAULT ROLE EKLEME
    const userDocData = {
      uid: user.uid,
      fullName,
      email,
      phone,
      role: USER_ROLES.USER, // Default role
      createdAt: new Date().toISOString(),
      emailVerified: user.emailVerified,
      isActive: true,
      permissions: ['read:products', 'read:profile', 'write:profile', 'read:orders']
    };
    
    await setDoc(doc(db, 'users', user.uid), userDocData);
    
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
        role: USER_ROLES.USER
      },
      message: 'Kayıt başarılı! Lütfen e-postanızı doğrulayın.'
    };
    
  } catch (error) {
    console.error('Register error:', error);
    
    let errorMessage = 'Kayıt sırasında bir hata oluştu.';
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Bu e-posta adresi zaten kullanımda.';
        break;
      case 'auth/weak-password':
        errorMessage = 'Şifre çok zayıf. Daha güçlü bir şifre seçin.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Geçersiz e-posta adresi.';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'E-posta/şifre girişi etkinleştirilmemiş.';
        break;
      default:
        errorMessage = error.message;
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

// Kullanıcı giriş işlemi - Role bilgisini de al
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Kullanıcı bilgilerini yenile
    await reload(user);
    
    // Kullanıcı verilerini Firestore'dan al (role bilgisi için)
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.exists() ? userDoc.data() : null;
    
    if (!userData) {
      // Eğer Firestore'da veri yoksa default oluştur
      const defaultUserData = {
        uid: user.uid,
        fullName: user.displayName || '',
        email: user.email,
        role: USER_ROLES.USER,
        createdAt: new Date().toISOString(),
        emailVerified: user.emailVerified,
        isActive: true
      };
      
      await setDoc(doc(db, 'users', user.uid), defaultUserData);
      userData = defaultUserData;
    }
    
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        lastLoginAt: user.metadata.lastSignInTime,
        createdAt: user.metadata.creationTime,
        role: userData.role || USER_ROLES.USER, // Role bilgisi
        isActive: userData.isActive !== false,
        permissions: userData.permissions || []
      }
    };
    
  } catch (error) {
    console.error('Login error:', error);
    
    let errorMessage = 'Giriş sırasında bir hata oluştu.';
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Yanlış şifre.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Geçersiz e-posta adresi.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'Bu hesap devre dışı bırakılmış.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin.';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'E-posta veya şifre hatalı.';
        break;
      default:
        errorMessage = error.message;
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

// Kullanıcı role'ünü güncelle (sadece admin işlemi)
export const updateUserRole = async (userId, newRole) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      role: newRole,
      updatedAt: new Date().toISOString()
    });
    
    return {
      success: true,
      message: 'Kullanıcı rolü başarıyla güncellendi.'
    };
  } catch (error) {
    console.error('Update role error:', error);
    return {
      success: false,
      error: 'Rol güncellenirken hata oluştu.'
    };
  }
};

// Email doğrulama durumunu kontrol et
export const checkEmailVerification = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      await reload(user);
      return {
        success: true,
        emailVerified: user.emailVerified
      };
    }
    return {
      success: false,
      error: 'Kullanıcı bulunamadı'
    };
  } catch (error) {
    console.error('Email verification check error:', error);
    return {
      success: false,
      error: 'Email doğrulama durumu kontrol edilemedi'
    };
  }
};

// Email doğrulama yeniden gönder
export const resendEmailVerification = async () => {
  try {
    const user = auth.currentUser;
    if (user && !user.emailVerified) {
      await sendEmailVerification(user);
      return {
        success: true,
        message: 'Doğrulama e-postası tekrar gönderildi.'
      };
    }
    return {
      success: false,
      error: 'Email zaten doğrulanmış veya kullanıcı bulunamadı'
    };
  } catch (error) {
    console.error('Resend verification error:', error);
    return {
      success: false,
      error: 'Email doğrulama gönderilemedi'
    };
  }
};

// Çıkış işlemi
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return {
      success: false,
      error: 'Çıkış yaparken bir hata oluştu.'
    };
  }
};

// Şifre sıfırlama
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: 'Şifre sıfırlama linki e-posta adresinize gönderildi.'
    };
  } catch (error) {
    console.error('Password reset error:', error);
    
    let errorMessage = 'Şifre sıfırlama sırasında bir hata oluştu.';
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Geçersiz e-posta adresi.';
        break;
      default:
        errorMessage = error.message;
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

// Auth state değişikliklerini dinle
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
}; 