import { Component, OnInit } from '@angular/core';
import { IEstudiante } from 'src/app/interface/IEstudiante';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public cargando: boolean = true;
  public usuarios: IEstudiante[] = [];
  public usuariosTemp: IEstudiante[] = [];

  constructor(
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit(): void {
    this.cargarMisUsuarios();
  }

  cargarMisUsuarios(){
    this.firebaseService.getUsuarios().subscribe(res => {

      this.usuarios= res.map((e:any) => {
        var data: IEstudiante = e.payload.doc.data();
        return {
          nombre: data.nombre,
          apellido: data.apellido,
          correo: data.correo,
          codigo: data.codigo,
          marca: data.marca,
          mobil: data.mobil,
          versionMobil: data.versionMobil,
        }
      })
      this.cargando =false
    },error => {
      console.log(error);
      Swal.fire('Error', 'No se pudo cargar la lista (ver console log)', 'error')
      this.cargando =false
    })
    
  }

  buscar( termino: string ){
    console.log(termino)
  }

  buscarPorDispositivo(tipo:String){
    this.firebaseService.buscarPorTipo(tipo).subscribe(res => {
      this.usuarios = res.map((e:any) => {
        var data: IEstudiante = e.payload.doc.data();
        return {
          nombre: data.nombre,
          apellido: data.apellido,
          correo: data.correo,
          codigo: data.codigo,
          marca: data.marca,
          mobil: data.mobil,
          versionMobil: data.versionMobil,
        }
      })
    })
  }
}
