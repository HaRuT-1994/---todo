import { Injectable } from "@angular/core";
import { StorageMap } from "@ngx-pwa/local-storage";
import { Observable, delay, filter, map } from "rxjs";
import { TODO } from "./todo.model";

@Injectable()
export class ListService {

  constructor( private storage: StorageMap) {}

  getFavourites(): Observable<TODO[]> {
    return this.storage.get('TODO')
    .pipe(
      map(res => (res as TODO[]).filter(todo => todo.favourite)),
      delay(400)
    )
  }

  getTODOs(): Observable<any> {
    return this.storage.get('TODO')
    .pipe(delay(400))
  }
}