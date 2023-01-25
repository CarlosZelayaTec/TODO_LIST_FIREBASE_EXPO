import { database } from "../firebase/config";
import {
  doc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  collection,
  addDoc,
  setDoc,
  query,
  orderBy,
  getDoc,
  getDocs,
} from "firebase/firestore";

export const createTask = async (task, userId) => {

  const ref = doc(database, "Tasks", userId, "TaskUser", Math.random().toString(36).substring(2));

  await setDoc((ref), {
    ...task,
    createAt: new Date(),
  });
};

export const getTasks = async (setTasks, userId) => {
  const ref = collection(database, "Tasks", userId, "TaskUser");
  const q = query(ref, orderBy("createAt", "desc"));

  const unsuscribe = onSnapshot(q, (querySnapshot) => {
    setTasks(
      querySnapshot.docs.map((x) => ({
        id: x.id,
        titleTask: x.data().titleTask,
        descriptionTask: x.data().descriptionTask,
        createAt: x.data().createAt,
      }))
    );
  });

  return unsuscribe;
};

export const updateTask = async (id, userId, Task, route) => {
  const ref = doc(database, "Tasks", userId, "TaskUser", id);
  await updateDoc(ref, {
    titleTask: Task.titleTask || route.params.title,
    descriptionTask: Task.descriptionTask || route.params.description,
  });
};

export const deleteTask = async (id, userId) => {
  const ref = doc(database, "Tasks", userId, "TaskUser", id);
  deleteDoc(ref);
};
