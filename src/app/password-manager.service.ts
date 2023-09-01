import { Injectable } from '@angular/core';
import {Firestore, collection,addDoc, collectionData, doc, updateDoc, deleteDoc} from '@angular/fire/firestore'
@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private fireStore:Firestore) { }

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

}
