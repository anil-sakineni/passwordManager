import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent {

  allsites !: Observable<Array<any>>

  sitename !:string;
  
  siteUrl!:string;
  siteImgUrl !:string;
  id!:string;

  formState:string='addNew';
  isSucess:boolean=false;

  sucessMessage !:string;

  constructor(private passwordManager: PasswordManagerService) {
    this.loadSites();

  }

  showAlert(message:string){
    this.isSucess=true;
    this.sucessMessage=message;
  }

  onSubmit(value: object) {

    if(this.formState=='addNew'){
      console.log(value);
    this.passwordManager.addSite(value).then(() => {
      this.showAlert('data saved sucessfully')
    }).catch(err => {
      console.log(err);

    })
    }
    else if(this.formState=='edit'){
      this.passwordManager.updateSite(this.id,value).then(()=>{this.showAlert('data edited sucessfully')
      }).catch(err=>{console.log(err);
      })
    }
  }

  loadSites(){
    this.allsites=this.passwordManager.loadSites()
  }

  onEditSite(siteName:string , siteImgURL:string , siteURL:string , id:string){

    this.sitename=siteName;
    
    this.siteUrl=siteURL;
    this.siteImgUrl=siteImgURL;
    this.id=id;
     
    this.formState='edit'

    

  }

  onDelete(id:string){
    this.passwordManager.deleteSite(id).then(()=>{
      this.showAlert('data deleted sucessfully')
      
    }).catch(err=>{console.log(err);
    })
  }


}
