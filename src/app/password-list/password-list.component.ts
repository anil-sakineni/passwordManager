import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';

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

  constructor(private route: ActivatedRoute , private passwordMannager:PasswordManagerService) {

    this.route.queryParams.subscribe((val: any) => {
      this.siteId = val.id,
        this.siteName = val.siteName,
        this.siteUrl = val.siteUrl,
        this.siteImgUrl = val.siteImgUrl
    })

  }

  onSubmit(values:object){

    console.log(values);
    this.passwordMannager.addPassword(values,this.siteId).then(()=>{console.log('password saved sucessfully');
    }).catch(err=>{console.log(err);
    })
    


  }

}
