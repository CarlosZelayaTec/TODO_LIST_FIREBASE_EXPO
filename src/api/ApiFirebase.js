import { database } from "../firebase/config";
import {
  doc,
  setDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  collection,
  addDoc,
} from "firebase/firestore";

export const createTask = async (task) => {
  await addDoc(collection(database, "Tasks"), { ...task, createAt: new Date() });
};

export const updateTask = async (id, Task, route) => {
  const ref = doc(database, "Tasks", id);
  await updateDoc(ref, {
    titleTask: Task.titleTask || route.params.title,
    descriptionTask: Task.descriptionTask || route.params.description,
  });
};
