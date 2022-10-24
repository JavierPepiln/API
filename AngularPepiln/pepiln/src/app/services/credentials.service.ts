import { DebugEventListener, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { addDoc, Firestore, getFirestore, getDoc, collectionData, docData } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Register } from '../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  constructor(private firestore: Firestore, private angularFireStore: AngularFirestore) { }

  addNewUser(register:Register) {
    const registerRef = collection(this.firestore, 'user');
    return addDoc(registerRef, register)
  }

  getUser():Observable<Register[]> {
    const register = collection(this.firestore, 'user');
    return collectionData(register, {idField: 'email'}) as Observable<Register[]>
    // return this.angularFireStore.collection('user', ref => ref.where('email', '==', "999@gmail.com")).snapshotChanges()

  }

  
}
