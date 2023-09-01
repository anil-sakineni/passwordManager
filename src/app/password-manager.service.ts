import { Injectable } from '@angular/core';
import {Firestore, collection,addDoc, collectionData, doc, updateDoc, deleteDoc} from '@angular/fire/firestore'
import { Auth,signInWithEmailAndPassword } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private fireStore:Firestore , private auth:Auth) { }

  addSite(data:object){
    const dbInstance = collection(this.fireStore, 'sites');
    return addDoc(dbInstance,data)

  }

  loadSites(){
    const dbInstance=collection(this.fireStore,'sites')
    return collectionData(dbInstance,{idField:'id'})

  }

  updateSite(id:string,data:object){

    const dbInstance=doc(this.fireStore,'sites',id)
    return updateDoc(dbInstance,data)

  }

  deleteSite(id:string){
    const dbInstance=doc(this.fireStore,'sites',id)

    return deleteDoc(dbInstance)

  }

  // password queries
  addPassword(data:object,siteId:string){
    const dbInstance=collection(this.fireStore,`sites/${siteId}/passwords`)
   return addDoc(dbInstance,data)
  }

  loadpasswords(siteId:string){
    const dbInstance=collection(this.fireStore,`sites/${siteId}/passwords`)
    return collectionData(dbInstance,{idField:'id'})

  }

  updatePassword(siteId:string,passwordId:string,data:object){

    const dbInstance=doc(this.fireStore,`sites/${siteId}/passwords`,passwordId)

    return updateDoc(dbInstance , data)

  }

  deletePassword(siteId:string,passwordId:string){

    const dbInstance=doc(this.fireStore,`sites/${siteId}/passwords`,passwordId)
    return deleteDoc(dbInstance)

  }

  // login query
login(email:string,password:string){

 return signInWithEmailAndPassword(this.auth,email,password)

}
}
