import {
  collection, doc, getDoc, getDocs, setDoc,
  updateDoc, deleteDoc, query, where, orderBy,
  serverTimestamp, addDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './config';

// ── CV CRUD ────────────────────────────────────────────────

export const saveCV = async (userId, cvId, cvData) => {
  try {
    const cvRef = doc(db, 'users', userId, 'cvs', cvId);
    await setDoc(cvRef, {
      ...cvData,
      updatedAt: serverTimestamp(),
      createdAt: cvData.createdAt || serverTimestamp(),
    }, { merge: true });
    return { success: true, id: cvId };
  } catch (error) {
    console.error('CV kaydedilirken hata:', error);
    throw error;
  }
};

export const getUserCVs = async (userId) => {
  try {
    const cvsRef = collection(db, 'users', userId, 'cvs');
    const q = query(cvsRef, orderBy('updatedAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error('CV\'ler alınırken hata:', error);
    throw error;
  }
};

export const getCVById = async (userId, cvId) => {
  try {
    const cvRef = doc(db, 'users', userId, 'cvs', cvId);
    const snap = await getDoc(cvRef);
    if (snap.exists()) return { id: snap.id, ...snap.data() };
    return null;
  } catch (error) {
    console.error('CV alınırken hata:', error);
    throw error;
  }
};

export const deleteCV = async (userId, cvId) => {
  try {
    await deleteDoc(doc(db, 'users', userId, 'cvs', cvId));
    return { success: true };
  } catch (error) {
    console.error('CV silinirken hata:', error);
    throw error;
  }
};

// ── PHOTO UPLOAD ───────────────────────────────────────────

export const uploadProfilePhoto = async (userId, file) => {
  try {
    const ext = file.name.split('.').pop();
    const photoRef = ref(storage, `users/${userId}/profile.${ext}`);
    await uploadBytes(photoRef, file);
    const url = await getDownloadURL(photoRef);
    return url;
  } catch (error) {
    console.error('Fotoğraf yüklenirken hata:', error);
    throw error;
  }
};

export const deleteProfilePhoto = async (userId) => {
  try {
    const photoRef = ref(storage, `users/${userId}/profile.jpg`);
    await deleteObject(photoRef);
  } catch (error) {
    // dosya yoksa sessizce geç
  }
};
