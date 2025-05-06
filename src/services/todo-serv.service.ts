import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { TODO } from '../model/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoServService {

  constructor(private http : HttpClient) { }

  // signal
  todosignal = signal<TODO[]>([]);

  gettodolist(){
    this.http.get<TODO[]>("http://16.171.11.2:8082/TODO/findall")
    .subscribe((todolist)=>this.todosignal.set(todolist));
  }

  addtask(todonew:TODO){
    this.http.post<TODO[]>("http://16.171.11.2:8082/TODO/save",todonew)
    .subscribe((newTodo)=>{

      this.todosignal.set([...this.todosignal(),todonew])
    });
  }

  deletetask(id:number){

    this.http.delete<{message:String}>(`http://16.171.11.2:8082/TODO/delete/${id}`)
    .subscribe((response)=>{
      console.log(response.message);
      const updatedTodos = this.todosignal().filter((todo)=> todo.id !== id);
      this.todosignal.set(updatedTodos);

    })
    
  }

  // updatetask(id: number, updatedtodo: TODO) {
  // if (!id) {
  //   console.error("Error: ID is missing, cannot update task.");
  //   return;
  // }

  // console.log("Updating task:", { id, updatedtodo });

  // this.http.put<{ message: string }>(`http://localhost:8080/TODO/update?id=${id}`, updatedtodo)
  //   .subscribe(
  //     (response) => {
  //       alert(response.message);
  //       this.todosignal.set(
  //         this.todosignal().map((todo) =>
  //           todo.id === id ? { ...todo, ...updatedtodo } : todo
  //         )
  //       );
  //     },
  //     (error) => {
  //       console.error("Error updating task:", error);
  //       alert("Failed to update task. Please try again.");
  //     }
  //   );
// }
updateTask(id: number, updatedTodo: Partial<TODO>): Observable<string> {
  return this.http.put<string>(`http://16.171.11.2:8082/TODO/updatetask?id=${id}`, updatedTodo);
}




}
