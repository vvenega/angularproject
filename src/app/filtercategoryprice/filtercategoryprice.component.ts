import { Component, OnInit } from '@angular/core';
import { ListingsService } from 'src/servicios/listings.service';
import { ListingUserFeedCategory } from 'src/modelos/listinguserfeedcategory.model'
import {Category} from 'src/modelos/categories.model'
import {Router} from '@angular/router';
import {User } from 'src/modelos/user.model';
import { LoginService } from 'src/servicios/login.service';

@Component({
  selector: 'app-filtercategoryprice',
  templateUrl: './filtercategoryprice.component.html',
  styleUrls: ['./filtercategoryprice.component.scss']
})
export class FiltercategorypriceComponent implements OnInit {

   user: User=new User();
   public myFeedListingsUserCategory: ListingUserFeedCategory=new ListingUserFeedCategory();
    public myCategories: Category[]=[];
    private generalprice: number=0;
    public  isChecked : boolean=false;


    public chlistings: boolean=false;
    public chrentals: boolean=false;
    public chdonations: boolean=false;
    public chexchange:boolean=false;


  constructor(private listingservice: ListingsService, private router: Router,private loginService:LoginService) {


  }

  ngOnInit() {

    this.user=this.loginService.getSession();
    this.loginService.cancelChatStreaming();
    this.listingservice.getListingUserFeedCategory(this.user.username,this.user.ecommunities,this.user.types).subscribe(data => {this.myFeedListingsUserCategory = data;});
    this.listingservice.getCategories(this.user.username,this.user.ecommunities,this.user.types).subscribe(data1 => {this.myCategories = data1;});
    this.generalprice=1000;
    //alert("victor");
    this.chlistings=true;
    this.chrentals=true;
    this.chdonations=true;
    this.chexchange=true;

    //alert(this.chdonations);
  }


  public updateFlags():void {

    if(localStorage.getItem("chlistings")!=undefined){
       if(localStorage.getItem("chlistings")=='true')
         this.chlistings=true;
      else
         this.chlistings=false;

    }

    if(localStorage.getItem("chrentals")!=undefined){
       if(localStorage.getItem("chrentals")=='true')
         this.chrentals=true;
      else
         this.chrentals=false;

    }



    if(localStorage.getItem("chdonations")!=undefined){
       if(localStorage.getItem("chdonations")=='true')
         this.chdonations=true;
      else
         this.chdonations=false;



    }

    if(localStorage.getItem("chexchange")!=undefined){
       if(localStorage.getItem("chexchange")=='true')
         this.chexchange=true;
      else
         this.chexchange=false;



    }



  }

  public saveCode(e:any): void {
let name = e.target.value;
localStorage.setItem('currentcategory', name);
this.router.navigate([`/listing/${this.user}/${name}`]);
}

public savePrice(e:any): void {
this.generalprice = e.target.value;

}

public applyPrice(): void{
  let category = "N-A";
  //alert(this.user);
  //alert(category);
  //alert(this.generalprice);

 this.router.navigate([`/listing/${this.user}/${category}/${this.generalprice}`]);
}


public updateData():void {
   let category = localStorage.getItem('currentcategory');
  if(category==undefined)
   alert("Selecciona Al menos una categoria.");
  else if(this.chlistings==false && this.chrentals==false && this.chdonations==false && this.chexchange==false)
   alert("Debes seleccionar al menos un tipo!.");
  else {
   //this.router.navigate([`/listing/${this.user}/${category}/${this.chlistings}/${this.chrentals}/${this.chdonations}/${this.chexchange}`]);
   let types:string[];
   types=[];
   if(this.chlistings)
     types.push('Listing');
   if(this.chrentals)
    types.push('Rent');
   if(this.chdonations)
    types.push('Donation');
    if(this.chexchange)
     types.push('Exchange');

     //alert('types:'+types);

   this.user.types=[];
   this.user.types=types;
   this.loginService.saveSession(this.user);

   this.router.navigate([`/listing/${this.user}/${category}/${this.user.types}`]);
  }

}

public updateListings(e:any):void{
  //form.controls['tc'].value;


  if (e!=null && e.target!=null && e.target.checked)
   this.chlistings=true;
  else{

    if(!this.chdonations && !this.chrentals && !this.chexchange){
     alert("Debes seleccionar al menos un tipo!.");
     if(e!=null && e.target!=null)
     e.target.checked=true;
    }
    else
     this.chlistings=false;
  }

   localStorage.setItem('chlistings', this.chlistings+"");
   this.updateData();

}

public updateRent(e:any):void{
  //form.controls['tc'].value;
  if (e!=null && e.target!=null && e.target.checked)
   this.chrentals=true;
  else{

    if(!this.chdonations && !this.chlistings && !this.chexchange){
     alert("Debes seleccionar al menos un tipo!.");
     e.target.checked=true;
    }
    else
   this.chrentals=false;
  }
 localStorage.setItem('chrentals', this.chrentals+"");
   this.updateData();

}

public updateDonations(e:any):void{
  //form.controls['tc'].value;

  if (e!=null && e.target!=null && e.target.checked)
   this.chdonations=true;
  else{

    if(!this.chrentals && !this.chlistings && !this.chexchange){
     alert("Debes seleccionar al menos un tipo!.");
     e.target.checked=true;
    }
    else
   this.chdonations=false;
  }

  localStorage.setItem('chdonations', this.chdonations+"");
  this.updateData();

}


public updateExchange(e:any):void{
  //form.controls['tc'].value;

  if (e!=null && e.target!=null && e.target.checked)
   this.chexchange=true;
  else{

    if(!this.chrentals && !this.chlistings && !this.chdonations){
     alert("Debes seleccionar al menos un tipo!.");
     e.target.checked=true;
    }
    else
   this.chexchange=false;
  }

  localStorage.setItem('chexchange', this.chexchange+"");
  this.updateData();

}

public openPage(user: string, category: string):void{

  localStorage.setItem('currentcategory', category);
  this.router.navigate([`/listing/${user}/${category}`]);


}


}
