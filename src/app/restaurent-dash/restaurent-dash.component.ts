import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant.model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {

  formValue!: FormGroup
  restaurantModelObj :RestaurantData = new RestaurantData;
  allRestaurantData: any;
  showAdd! : boolean
  showbtn! : boolean
  constructor(private formBulider: FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBulider.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllData()
  }
  clickAddResto(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }
 // Now Subscribing our data which is append via Services..0
 addResto(){
   this.restaurantModelObj.name = this.formValue.value.name;
   this.restaurantModelObj.email = this.formValue.value.email;
   this.restaurantModelObj.mobile = this.formValue.value.mobile;
   this.restaurantModelObj.address = this.formValue.value.address;
   this.restaurantModelObj.services = this.formValue.value.services;

    this.api.postRestaurnt(this.restaurantModelObj).subscribe(res=>{
      console.log(res);
      alert("Restaurant Records Added Successful");
      //clear fill form data
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset()
      this.getAllData();//when u post any data
    },
    err=>{
      alert("kuch to galat hai ashish !")
    }
    )
 }

 //Get all Data
 getAllData(){
   this.api.getRestaurant().subscribe(res=>{
     this.allRestaurantData = res;
   })
 }
 //Delete Records 
 deleteResto(data:any){
   this.api.deleteRestaurant(data.id).subscribe(res=>{ 
    alert("Restaurant records deleted")
    this.getAllData();// Quick refresh data
   })
 }

 onEditResto(data:any){
  this.showAdd=false;
  this.showbtn=true;
   this.restaurantModelObj.id = data.id
   this.formValue.controls['name'].setValue(data.name);
   this.formValue.controls['email'].setValue(data.email);
   this.formValue.controls['mobile'].setValue(data.mobile);
   this.formValue.controls['address'].setValue(data.address);
   this.formValue.controls['services'].setValue(data.services);

 }
 updateResto(){
  this.restaurantModelObj.name = this.formValue.value.name;
  this.restaurantModelObj.email = this.formValue.value.email;
  this.restaurantModelObj.mobile = this.formValue.value.mobile;
  this.restaurantModelObj.address = this.formValue.value.address;
  this.restaurantModelObj.services = this.formValue.value.services;
  
  this.api.updateRestaurant(this.restaurantModelObj,this.restaurantModelObj.id).subscribe(res=>{
    alert("Restaurant Record updated");
    let ref = document.getElementById('clear');
    ref?.click();

    this.formValue.reset()
    this.getAllData();//when u post any data
  })
 }
}
