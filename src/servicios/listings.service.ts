import { Injectable } from '@angular/core';
import { Listing } from 'src/modelos/listing.model';
import { ListingDetail } from 'src/modelos/listingdetail.model';
import {ListingUserFeedCategory } from "src/modelos/listinguserfeedcategory.model"
import {Category} from "src/modelos/categories.model"

import { HttpClient,HttpParams,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  private ChuckUrl = environment.listingServiceWS; //'http://192.168.1.66:8100'; // URL to web api


  constructor(private http: HttpClient) {}

  public getListings(user:string,ecommunites:string[],types:string[]): Observable<Listing[]> {
    //let jsonarray=JSON.stringify(ecommunites);
    //alert( `/Listings/${user}/${ ecommunites}`);
      return this.http.get<Listing[]>(this.ChuckUrl + `/Listings/${user}/${ ecommunites}/${types}`);
  }


  public getListingsType(user: string, category: string,ecommunites:string[], types:string[]): Observable<Listing[]> {
      return this.http.get<Listing[]>(this.ChuckUrl +`/ListingsType/${user}/${encodeURIComponent(category)}`);
  }


  public getListingsCategory(user: string, category: string,ecommunities:string[],types:string[]): Observable<Listing[]> {
      return this.http.get<Listing[]>(this.ChuckUrl +`/ListingsCategory/${user}/${encodeURIComponent(category)}/${ecommunities}/${types}`)
  }

  public getUserListingsCategory(user: string, category: string,ecommunities:string[],types:string[]): Observable<Listing[]> {
      return this.http.get<Listing[]>(this.ChuckUrl +`/ListingsUserCategory/${user}/${encodeURIComponent(category)}/${ecommunities}/${types}`)
  }

  public getListingDetail(user: string, owner:string,objectid: string): Observable<ListingDetail> {

      let params = new HttpParams();
      params.set('user', user);
      params.set('objectid', objectid);
      //`/ListingDetail`
      return this.http.get<ListingDetail>(this.ChuckUrl +`/ListingDetail/${user}/${owner}/${objectid}`)


  }

  public getListingUserFeedCategory(user: string,ecommunities:string[],types:string[]): Observable<ListingUserFeedCategory> {

      let params = new HttpParams();
      params.set('user', user);
      //`/ListingDetail`
      return this.http.get<ListingUserFeedCategory>(this.ChuckUrl +`/ListingUserCategoriesFeed/${user}/${ecommunities}/${types}`)


  }

  public getCategories(user: string,ecommunities:string[],types:string[]): Observable<Category[]> {

      let params = new HttpParams();
      params.set('user', user);
      //`/ListingDetail`
      return this.http.get<Category[]>(this.ChuckUrl +`/Categories/${user}/${ecommunities}/${types}`)


  }

  public getUserCategories(user: string,ecommunities:string[],types:string[]): Observable<Category[]> {


      return this.http.get<Category[]>(this.ChuckUrl +`/UserCategories/${user}/${ecommunities}/${types}`)


  }

  public getListingsPrice(user: string,price: number): Observable<Listing[]> {

      let params = new HttpParams();
      params.set('user', user);
      //`/ListingDetail`
      return this.http.get<Listing[]>(this.ChuckUrl +`/ListingsPrice/${user}/${price}`)


  }






  public contactPublisher(owner:string,requester:string,namerequester:string,email:string,message:string,mobile:string,product:string,price:number,objectid:number,type:string, category:string[],view:boolean,contact:boolean,nameowner:string){

    for(var i = 0;i<category.length;i++) {
      category[i]=encodeURIComponent(category[i]);
    }
    let link =this.ChuckUrl +`/ListingContact/${owner}/${requester}/${encodeURIComponent(namerequester)}/${email}/${encodeURIComponent(message)}/${encodeURIComponent(mobile)}/${encodeURIComponent(product)}/${price}/${objectid}/${type}/${category}/${view}/${contact}/${encodeURIComponent(nameowner)}`;

    this.http.get(link).subscribe((res) => {
    let resStr = JSON.stringify(res);
    let resJSON = JSON.parse(resStr);
    //console.log(resJSON.body);
  })
  }




  public getProductDescription(objectid:number,user:string,price:number): Observable<Listing>{
    //alert(objectid);
    let link =this.ChuckUrl +`/ListingsObjectid/${objectid}/${user}/${price}`;
    return this.http.get<Listing>(link)


  }

  public sharePost(listing:Listing,user:string): void{

    ///ListingSharePost/{username}/{objectid}/{saleprice}/{category}/{type}/{name}/{owner}
    let link =this.ChuckUrl +`/ListingSharePost/${user}/${listing.objectid}/${listing.saleprice}/${listing.category}/${listing.type}/${listing.name}/${listing.owner}`;

     this.http.get(link).subscribe((res) => {
    let resStr = JSON.stringify(res);
    let resJSON = JSON.parse(resStr);
    alert('El Post Fue Compartido');
    //console.log(resJSON.body);
  })


  }

}
