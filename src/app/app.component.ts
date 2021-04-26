import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'formulario-web';
  data = '---';

  constructor(){

  }

  getData(){
    console.log('click');
    const fullInformation = "User-agent header sent: "+ navigator.userAgent;
    const isFormPhone = fullInformation.search('Android') != -1;

    if(isFormPhone) {            
      const realInformation = fullInformation.split('5.0 (').pop().split(') ')[0]
      const stringArray = realInformation.split(';');
      console.log(stringArray[2])
      console.log(stringArray[1])
      console.log(true);
    }    

    console.log('-->', isFormPhone);
    this.data = 'aaaaaaaa'
  }
}
