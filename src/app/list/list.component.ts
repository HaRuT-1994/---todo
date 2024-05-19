import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TODO } from './todo.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { delay, filter, map, of, switchMap, tap } from 'rxjs';
import { ListService } from './list.service';
import { Utl } from '../utl';
import { LeftUnderOneDirective } from './left-under-one.directive';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [DatePipe, LeftUnderOneDirective],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ ListService ]
})
export class ListComponent implements OnInit {
  todoList: TODO[] = []; 
  todayTodoList: TODO[] = [];
  isFavourite = this.router.url === '/favourite';

  constructor(
    private listService: ListService,
    private storage: StorageMap,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private zone: NgZone) {}

  ngOnInit(): void {
   this.updateList();
  }

  private updateList(lists?: TODO[]) {
    if(this.isFavourite) {
      this.getFavourites();
    } else {
      this.getTODOs(lists);
    }
  }

  private getFavourites() {
    this.listService.getFavourites()
      .subscribe((res: any) => {
        this.todoList = res;
        this.cdr.detectChanges();
      });
  }

  private getTODOs(lists?: TODO[]) {
    const listObservable = lists ? of(lists) :  this.listService.getTODOs();

    listObservable.pipe(
      map(res => {
        this.todayTodoList = res.filter((todo: TODO) =>  Utl.isToday(todo.expirationDate))
        this.remainingTime(res);
        this.zone.runOutsideAngular(() => {
          setInterval(() => this.remainingTime(this.todayTodoList), 1000);
        })

        return res;
      })
    ).subscribe((res: any) => {        
        this.todoList = res;
        this.cdr.detectChanges();
      });
  }

  favouriteTodo(todoCreated: string) {
    this.listService.getTODOs().pipe(
      switchMap(todos => {
        for (let todo of todos) {
          if(todo.created === todoCreated) {
            todo.favourite = todo.favourite ? false: true;
            break;
          }
        }

        return this.storage.set('TODO', todos)
      }),
      delay(400)
    ).subscribe(() => this.updateList() );
  }

  removeTodo(todoCreated: string) {
    this.listService.getTODOs().pipe(
      map(todos => todos.filter((todo: any) => todo.created !== todoCreated)),
      switchMap(todos => this.storage.set('TODO', todos)),
      delay(400)
    ).subscribe(() => this.updateList() );
  }

  remainingTime(todos: any): void {
    todos.map((todo: any) => {

      const remainingTimestamp = Date.parse(todo.expirationDate) - Date.now();

      if(remainingTimestamp <= 0) {
        return;
      }

      const date = new Date(remainingTimestamp);
      const hours = date.getUTCHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      todo.timeLeft = `${hours}h ${minutes}m ${seconds}s`
    })

    this.cdr.detectChanges();
  }
}
