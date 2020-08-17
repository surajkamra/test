import { Component, OnInit } from '@angular/core';
import { RestService } from '../_services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../_services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  _years$=['2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020']
  _resdata=[];
  _isShowLoading:boolean
  constructor(private _restService:RestService,
              private router:Router,
              private _loaderService:LoaderService,
              private activatedRoute:ActivatedRoute) { 
                this.activatedRoute.queryParams.subscribe(it=>{
                    this.getData(this.router.url.split('?')[1]);
                })
               
              }

  ngOnInit(): void {
    this._loaderService.isLoading.subscribe(it=>{
      this._isShowLoading=it;
    })
    this.getData()

  }

  getData(qyery?:string){
   let qyeryParams=qyery ? qyery : 'limit=100&amp;launch_success=true';
    this._restService.get(qyeryParams).subscribe(
      it=>{
        this._resdata=it;
      }
    )
  }

  filter$(value$,qyery){
    this.router.onSameUrlNavigation = 'reload';
    let queryParams={
     ...(qyery=='launch_year' && { launch_year: value$ }),
     ...(qyery=='launch_success' && { launch_success: value$ }),
     ...(qyery=='land_success' && { land_success: value$ }) 
    }
    this.router.navigate(
      ['/home'], 
      {
        relativeTo: this.activatedRoute,
        queryParams: queryParams, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
     
  }
  

}
