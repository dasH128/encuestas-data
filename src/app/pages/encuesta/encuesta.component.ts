import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { IEstudiante } from 'src/app/interface/IEstudiante';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styles: [
  ]
})
export class EncuestaComponent implements OnInit {
  title = 'formulario-web';
  windows= false;

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public formularioEncuesta = this.fb.group({
    nombre: ['', [Validators.required]], 
    apellidos: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    codigo: ['', [Validators.required]],
  })

  constructor(
    private firebaseService: FirebaseService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    const fullInformation = "User-agent header sent: "+ navigator.userAgent;
    console.log(fullInformation);
    const isFormPhoneWin = fullInformation.search('Win64') != -1;
    console.log(isFormPhoneWin);
    this.windows = isFormPhoneWin
  }

  getDataDispositivo(estudiante : IEstudiante):IEstudiante {
    // console.log('click');
    const fullInformation = "User-agent header sent: "+ navigator.userAgent;
    // console.log('------------');
    // console.log(fullInformation);
    // console.log('------------');
    const isFormPhoneAndroid = fullInformation.search('Android') != -1;
    const isFormPhoneiPhone = fullInformation.search('iPhone') != -1;
    const isFormPhoneiPad = fullInformation.search('iPad') != -1;

    if(isFormPhoneAndroid) {            
      const realInformation = fullInformation.split('5.0 (').pop().split(') ')[0]
      const stringArray = realInformation.split(';');
      // console.log(stringArray[2])
      // console.log(stringArray[1])
      // console.log(true);
      estudiante.marca = stringArray[2]
      estudiante.mobil = stringArray[0]
      estudiante.versionMobil = stringArray[1]
    }   
    
    if(isFormPhoneiPhone) {            
      const realInformation = fullInformation.split('5.0 (').pop().split(') ')[0]
      const stringArray = realInformation.split(';');
      // console.log(stringArray[2])
      // console.log(stringArray[1])
      // console.log(true);
      estudiante.mobil = stringArray[0]
      estudiante.versionMobil = stringArray[1]
    }

    if(isFormPhoneiPad) {            
      const realInformation = fullInformation.split('5.0 (').pop().split(') ')[0]
      const stringArray = realInformation.split(';');
      // console.log(stringArray[2])
      // console.log(stringArray[1])
      // console.log(true);
      estudiante.mobil = stringArray[0]
      estudiante.versionMobil = stringArray[1]
    }

    return estudiante
  }

  insertarUsuario(){
    var estudiante : IEstudiante = this.formularioEncuesta.value
    // estudiante.correo = "s";
    console.log(this.formularioEncuesta.value)
    if(this.formularioEncuesta.invalid){
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Se requiere completar todos los datos para continuar',
      })
      return
    }

    estudiante = this.getDataDispositivo(estudiante);

    
    console.log(estudiante)
    this.firebaseService.insertUsuario(estudiante).then(r=>{
      return Swal.fire('success', 'Gracias Por realizar la encusta', 'success')
    }).catch(e=> {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error')
    });
  }

}
