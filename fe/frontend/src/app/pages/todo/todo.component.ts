import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{
  inputTodo :any
  checkedList:any = []
  user:any = {
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
    // localStorage.clear()
    console.log(localStorage.getItem('username'))
    let temp = {"username" : localStorage.getItem("username")}
    this.user = await this.apiService.getUser(temp)
    for(let i = 0 ; i < this.user.todos.length ; i++){
      this.checkedList.push(this.user.todos[i].completed)
    }
    console.log(this.user)
    
  }

  async add_item(){
    this.user.todos.push({
      "task" : this.inputTodo,
      "completed" : false
    })
    this.checkedList.push(false)
  }
  async checkedOnchange(){

    console.log(this.checkedList)
  }
  async saveData(){
    let body = {
      username : "",
      todos : []
    }

    let query = localStorage.getItem("username")?.toString()
    query ? body.username = query : body.username = ""
    for(let i = 0 ; i < this.user.todos.length ; i++){
      this.user.todos[i].completed = this.checkedList[i]
    }
    let todoNew = this.user.todos
    body.todos = todoNew
    console.log(body)
    this.apiService.saveData(body)


  }
}
