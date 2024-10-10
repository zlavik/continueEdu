
import { db, storage } from '../firebase/config';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const addVideo = async (videoData: Record<string, unknown>, file: File) => {
  const docRef = await addDoc(collection(db, 'videos'), videoData);
  const storageRef = ref(storage, `videos/${docRef.id}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return { id: docRef.id, url };
};
export const getVideos = async () => {
  const querySnapshot = await getDocs(collection(db, 'videos'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getUserData = async (userId: string) => {
  const q = query(collection(db, 'users'), where('id', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs[0]?.data();
};