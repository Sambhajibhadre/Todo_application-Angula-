import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TodoServService } from '../services/todo-serv.service';
import { OnInit } from '@angular/core';
import { TODO } from '../model/todo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  imports: [CommonModule,FormsModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {


  

  constructor(private todos:TodoServService){}
  id:number=0;
  title:String='';
  status:String='';
  showupdatedform=false;

  ngOnInit():void{
    this.todos.gettodolist();
  
  }

  

  get todoList(){
    console.log("helloo")
    return this.todos.todosignal();
  }

  addtodo(id:number,newtitle:String,status:String,event:any){
    console.log(id+''+newtitle+''+status)
    const newtodo:TODO={"id":id,"title":newtitle,"status":status};
    this.todos.addtask(newtodo);
    event.preventDefault();
  }

  deletetask(id:number){
    this.todos.deletetask(id);
  }

  // edittask(todo:TODO){
  //   if(this.showupdatedform){
  //     // if the form is already open for the same task, then first colse form first
  //     this.showupdatedform=false;
  //   }else{
  //     // add task data and show form
  //     this.id=todo.id;
  //     this.title=todo.title;
  //     this.status=todo.status;
  //     this.showupdatedform=true;
  //   }
  // }

  // updateTask(){

  //   if(this.id!=0){
  //     console.error("id is missing cannot update takeLast.");
  //     return;
  //   }

  //   const updatedTodo: Partial<TODO> ={
  //     title:this.title,
  //     status:this.status
  //   };
    
  //   this.todos.updatetask(this.id,updatedTodo);
  //   this.showupdatedform=false;

  // }

  // cancleupdate(){

  //   this.showupdatedform=false;

  // }
  edittask(todo: TODO) {
    this.id = todo.id;
    this.title = todo.title;
    this.status = todo.status;
    this.showupdatedform = true;
  }
  

  updateTask(id: number) {
    if (!id) {
      console.error("Error: ID is missing, cannot update.");
      return;
    }

    const updatedTodo: Partial<TODO> = {
      title: this.title,
      status: this.status
    };

    this.todos.updateTask(id, updatedTodo).subscribe(
      (response) => {
        alert(response);
        this.showupdatedform = false;
      },
      (error) => {
        console.error("Error updating task:", error);
        alert("update task successfully");
      }
    );
  }

}
