import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexeddbService {

  private db : IDBDatabase | null = null;
  private dbName ='OrderDb';
  private storeName='orders';

  constructor() { }

  private initDb():Promise<void>{
    return new Promise((resolve, reject) => {
      const request = indexedDB.open( this.dbName , 1);

      request.onerror=()=> reject('Error Opening database');

      request.onsuccess=()=>{
        this.db=request.result;
        resolve();
      };

      request.onupgradeneeded =(event:IDBVersionChangeEvent)=>{
        const db=(event.target as IDBOpenDBRequest).result;
        db.createObjectStore(this.storeName, { keyPath : 'id', autoIncrement:true});
      };

      
    });
  }

  add(item:any):Promise<any>{
    return new Promise((resolve, reject) => {
      if(!this.db){
        reject('Database not initialized');
        return;
      }

      const transaction = this.db.transaction([this.storeName],'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request =store.add(item);

      request.onerror=()=>reject('Error adding item to IndexedDB');
      request.onsuccess=()=>resolve(request.result);
      
    });
  }
  getAll():Promise<any[]>{
    return new Promise((resolve, reject) => {
      if(!this.db){
        reject('Database not initialized');
        return;
      }
      
      const transaction=this.db.transaction([this.storeName],'readonly');
      const store=transaction.objectStore(this.storeName);
      const request=store.getAll();

      request.onerror = () => reject('Error getting items from IndexedDB');
      request.onsuccess = () => resolve(request.result);

    });
  }


  update(item: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('Database not initialized');
        return;
      }

      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put(item);

      request.onerror = () => reject('Error updating item in IndexedDB');
      request.onsuccess = () => resolve();
    });
  }

  
  delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('Database not initialized');
        return;
      }

      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);

      request.onerror = () => reject('Error deleting item from IndexedDB');
      request.onsuccess = () => resolve();
    });
  }

}
