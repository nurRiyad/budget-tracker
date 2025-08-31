import {db,app} from '@/firebase'
import { doc, getDoc } from 'firebase/firestore';


export const getUser = async(userId: string) => {
  console.log({ userId})
  const userRef = doc(db, 'budget-users', userId);
  const user = await getDoc(userRef);
  const userData = user.data();

  console.log({ userData })
  return userData;
}