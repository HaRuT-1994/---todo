import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { NgIf } from '@angular/common';
import { DateTime } from 'ts-luxon';
import { Utl } from "../utl";
import { StorageMap } from '@ngx-pwa/local-storage';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    NgIf, RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    NgxMatTimepickerModule,
    MatNativeDateModule
    ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddComponent {
  todoForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    expirationDate: new FormControl(null, Validators.required),
    expirationTime: new FormControl(null)
  });
  minDate = new Date();
  minTime!: DateTime;
  formSubmitted = false;
  private storage = inject(StorageMap);

  ngOnInit() {
    this.todoForm.valueChanges.subscribe(() => {
      if(this.todoForm.value.expirationDate && Utl.isToday(this.todoForm.value.expirationDate) &&
        !Utl.isValidExpirationDate(this.todoForm.value.expirationTime)){
          this.todoForm.controls['expirationTime'].setErrors({invalidTime: true});
      } else {
        this.todoForm.controls['expirationTime'].setErrors(null);
      }
    })
  }

  openFromIcon(timepicker: { open: () => void }) {
    if (!this.todoForm.controls['expirationTime'].disabled) {
      timepicker.open();
    }
  }

  onClear() {
    this.todoForm.controls['expirationTime'].setValue(null);
  }

  createTODO() {
    if(this.todoForm.invalid) {
      this.formSubmitted = true;
      return;
    }

    if(this.todoForm.value.expirationDate.getHours()) {
      this.todoForm.value.expirationDate.setHours(0);
      this.todoForm.value.expirationDate.setMinutes(0);
    }

    if(this.todoForm.value.expirationTime) {
      const [hours, minutes] = this.todoForm.value.expirationTime.split(':');
      this.todoForm.value.expirationDate.setHours(hours);
      this.todoForm.value.expirationDate.setMinutes(minutes);
    }

    const data = this.todoForm.value;
    delete data.expirationTime;
    data.created = Date.now();

    this.storage.get('TODO').pipe(
      switchMap(res => {
        if(res) {
          (res as any[]).push(data);
          return this.storage.set('TODO', res);
        } else {
          return this.storage.set('TODO', [data]);
        }
      })
    ).subscribe(res => {
        alert('Successfully added TODO')
    })    
  }
}
