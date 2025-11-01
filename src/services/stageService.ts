// stageService.ts
import { db } from "../lib/firebaseConfig";
import { ref, set, onValue, get } from "firebase/database";

/**
 * Initialize stageRaised with default value if not exists
 */
export async function initializeStageRaised(defaultValue = 2320867) {
  const stageRef = ref(db, "stageRaised");
  const snapshot = await get(stageRef);
  if (!snapshot.exists()) {
    await set(stageRef, defaultValue);
  }
}

/**
 * Update stageRaised value
 */
export async function updateStageRaised(value: number) {
  const stageRef = ref(db, "stageRaised");
  await set(stageRef, value);
}

/**
 * Listen for real-time updates
 */
export function listenStageRaised(callback: (value: number) => void) {
  const stageRef = ref(db, "stageRaised");
  onValue(stageRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
}
