import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

isError:boolean=false

  constructor( private passwordMannager:PasswordManagerService , private route:Router){

  }

  onSubmit(values:any){

    this.passwordMannager.login(values.email,values.password)
    .then(()=>{this.route.navigate(['/site-list'])
    }).catch(err=>{
      this.isError=true
    })

  }

}
