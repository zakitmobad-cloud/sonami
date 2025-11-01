// stageService.ts
import { db } from "../lib/firebaseConfig";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

/**
 * Initialize stageRaised with default value if not exists
 */
export async function initializeStageRaised(defaultValue = 2320867) {
  const stageDocRef = doc(db, "stats", "stageRaised");
  const docSnap = await getDoc(stageDocRef);

  if (!docSnap.exists()) {
    await setDoc(stageDocRef, { value: defaultValue });
  }
}

/**
 * Update stageRaised
 */
export async function updateStageRaised(value: number) {
  const stageDocRef = doc(db, "stats", "stageRaised");
  await setDoc(stageDocRef, { value }, { merge: true });
}

/**
 * Listen to real-time updates
 */
export function listenStageRaised(callback: (value: number) => void) {
  const stageDocRef = doc(db, "stats", "stageRaised");
  return onSnapshot(stageDocRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data();
      callback(data.value);
    }
  });
}
