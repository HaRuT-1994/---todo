import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { DateTime } from 'ts-luxon';

@Injectable()
export class Utl {
  static isToday = (date: string | Date): boolean => {
    const givenDate = new Date(date);
    const currentDate = new Date();

    if (
        givenDate.getFullYear() === currentDate.getFullYear() &&
        givenDate.getMonth() === currentDate.getMonth() &&
        givenDate.getDate() === currentDate.getDate()
    ) {
        return true;
    } else {
        return false;
    }
  };

  static isValidExpirationDate = (time: string): boolean => {
    if(!time) return false;
    
    const curDate = DateTime.local();
    const [hour, minute] = time.split(':');
    if (
      curDate.hour < +hour || (curDate.hour == +hour && curDate.minute < +minute)
    ) {
        return true;
    } else {
        return false;
    }
  };
}