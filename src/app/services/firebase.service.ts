import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IEstudiante } from '../interface/IEstudiante';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  collection_estudiante: string= "estudiantes";
  constructor(
    private firestore: AngularFirestore
  ) { }

  getUsuarios(){
    return this.firestore.collection(this.collection_estudiante).snapshotChanges();
  }

  insertUsuario(estudiante: IEstudiante){
    // return this.firestore.collection(this.collection_estudiante).add(estudiante)
    return this.firestore.collection(this.collection_estudiante).doc(estudiante.codigo+"").set(estudiante)
  }

  buscarPorTipo(mobil: String){
    return this.firestore.collection(this.collection_estudiante, ref => ref.where('mobil', '==', mobil)).snapshotChanges();
  }
}
