import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, orderBy, getDocs, Timestamp } from "firebase/firestore";
import type { UserType, OrderType, CreateOrderRequestType } from "@shared/schema";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project"}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project"}.firebasestorage.app`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "demo-app-id",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithRedirect(auth, googleProvider);
};

export const handleAuthRedirect = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      // User signed in successfully
      const user = result.user;
      await saveUserToFirestore(user);
      return user;
    }
  } catch (error) {
    console.error("Error handling auth redirect:", error);
    throw error;
  }
};

export const signOutUser = () => {
  return signOut(auth);
};

export const saveUserToFirestore = async (user: any) => {
  try {
    const userDoc: Omit<UserType, 'id'> = {
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
      createdAt: new Date(),
    };
    
    await addDoc(collection(db, "users"), {
      ...userDoc,
      uid: user.uid,
      createdAt: Timestamp.fromDate(userDoc.createdAt),
    });
  } catch (error) {
    console.error("Error saving user to Firestore:", error);
    // Don't throw error as user is already authenticated
  }
};

export const createOrder = async (userId: string, orderData: CreateOrderRequestType & { packageName: string; amount: number }) => {
  try {
    const order = {
      userId,
      playerId: orderData.playerId,
      playerName: orderData.playerName,
      packageId: orderData.packageId,
      packageName: orderData.packageName,
      amount: orderData.amount,
      transactionId: orderData.transactionId,
      status: "pending" as const,
      createdAt: Timestamp.now(),
    };
    
    const docRef = await addDoc(collection(db, "orders"), order);
    return { id: docRef.id, ...order };
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getUserOrders = async (userId: string) => {
  try {
    const q = query(
      collection(db, "orders"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as (OrderType & { id: string })[];
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};
