import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isCorrectPass = true ;
  isHave = false;
  users:any;
  isSignUp = true ;
  loginObj:any  = {
    username : '',
    password : '',
    repass : '',
    todos : []
    // email : '',
  }
  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }
  async ngOnInit() {
    localStorage.clear()
    
    this.users = await this.apiService.fetchData()
    console.log(this.users)
  }
  async onLogin() {
    const isUserExit = await this.users.find( (m: { username: any; password: any; }) => m.username == this.loginObj.username && m.password == this.loginObj.password )
    if(isUserExit != undefined){
      console.log("Login Success")
      console.log(this.loginObj)
      this.router.navigate(['/todo']);
      localStorage.setItem('username',this.loginObj.username)
    }else {
      console.log("Login Faild")
      alert("Tai khoan hoac mat khau khong dung")
    }
  }
  async sleep(delay:any) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
  }
  async onSignUp() {
    if(this.loginObj.password != this.loginObj.repass)
    {
      alert("Mat khau khong khop")
    }
    else{
      const isUserExit = await this.users.find( (m: { username: any; password: any; }) => m.username == this.loginObj.username  )
      if(isUserExit)
        this.isHave = true 
      else 
        this.isHave = false
      if(!this.isHave){
        await this.apiService.signUp(this.loginObj)
        this.users.push(this.loginObj)
        this.onChangeSignUp()
        alert("Tao tai khoan thanh cong")
      } else {
        alert ("tai khoan da ton tai")
      }
      console.log(this.users)
    }
    
    
  }
  onChangeSignUp(){
    if(this.isSignUp == true)
      this.isSignUp = false 
    else 
      this.isSignUp = true
  }
  
}
