import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';

import { AES, enc } from 'crypto-js';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent {

  siteId !: string;
  siteName !: string;
  siteUrl !: string;
  siteImgUrl !: string;

  passwordsList !: Array<any>

  email !: string;
  username !: string;
  password !: string;
  passwordId !: string;

  formState: string = 'addNew'

  isSucess: boolean = false;
  sucessMessage !: string;

  constructor(private route: ActivatedRoute, private passwordMannager: PasswordManagerService) {

    this.route.queryParams.subscribe((val: any) => {
      this.siteId = val.id,
        this.siteName = val.siteName,
        this.siteUrl = val.siteUrl,
        this.siteImgUrl = val.siteImgUrl
    })

    this.loadPasswords()

  }

  showAlert(message: string) {
    this.isSucess = true;
    this.sucessMessage = message;
  }

  onSubmit(values: any) {

    const encrypted = this.encryptPassword(values.password)
    values.password = encrypted

    if (this.formState == 'addNew') {
      console.log(values);
      this.passwordMannager.addPassword(values, this.siteId).then(() => {
        this.showAlert('password saved sucessfully')
        this.resetForm()
      }).catch(err => {
        console.log(err);
      })

    }

    else if (this.formState == 'edit') {
      this.passwordMannager.updatePassword(this.siteId, this.passwordId, values).then(() => {
        this.showAlert('password updated sucessfully')
        this.resetForm()
      }).catch(err => {
        console.log(err);
      })
    }


  }

  loadPasswords() {
     this.passwordMannager.loadpasswords(this.siteId).subscribe(val=>{this.passwordsList=val
     })
  }

  editPassword(email: string, username: string, password: string, passwordId: string) {

    this.email = email;
    this.username = username;
    this.password = password;
    this.passwordId = passwordId;

    this.formState = 'edit'

  }

  deletePassword(passwordId: string) {

    this.passwordMannager.deletePassword(this.siteId, passwordId).then(() => {
      this.showAlert('password deleted sucessfully')
    }).catch(err => {
      console.log(err);
    })

  }

  onDecrypt(password:string,index:number){
    const desPassword=this.decrptPassword(password)
    this.passwordsList[index].password=desPassword


  }

  encryptPassword(password: string) {
    const secretkey = 'aHS9siQx'
    const enpassword = AES.encrypt(password, secretkey).toString();
    console.log("encrypted data", enpassword);

    return enpassword


  }

  decrptPassword(password:string){
    const secretkey = 'aHS9siQx'
    const decryptpassword=AES.decrypt(password,secretkey).toString(enc.Utf8)
    return decryptpassword

  }

  resetForm() {
    this.email = ''
    this.username = ''
    this.password = ''
    this.passwordId = ''
    this.formState = 'addNew'
  }

}
