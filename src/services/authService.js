import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

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
    
    // Firestore'da kullanıcı belgesi oluştur
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      fullName,
      email,
      phone,
      createdAt: new Date().toISOString(),
      emailVerified: false,
      role: 'user'
    });
    
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified
      },
      message: 'Kayıt başarılı! Lütfen e-postanızı doğrulayın.'
    };
    
  } catch (error) {
    console.error('Register error:', error);
    
    // Firebase hata mesajlarını Türkçe'ye çevir
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

// Kullanıcı giriş işlemi
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Kullanıcı verilerini Firestore'dan al
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.exists() ? userDoc.data() : null;
    
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
        ...userData
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
      default:
        errorMessage = error.message;
    }
    
    return {
      success: false,
      error: errorMessage
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

// Auth state değişikliklerini dinle
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
}; 