import { database } from "../firebase/config";
import {
  doc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";

export const createTask = async (task, userId) => {
  await addDoc(collection(database, "Tasks" + userId), {
    ...task,
    createAt: new Date(),
  });
};

export const getTasks = async (setTasks, userId) => {
  const ref = collection(database, "Tasks" + userId);
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

export const updateTask = async (id, Task, route) => {
  const ref = doc(database, "Tasks", id);
  await updateDoc(ref, {
    titleTask: Task.titleTask || route.params.title,
    descriptionTask: Task.descriptionTask || route.params.description,
  });
};

export const deleteTask = async (id) => {
  const ref = doc(database, "Tasks", id);
  deleteDoc(ref);
};
