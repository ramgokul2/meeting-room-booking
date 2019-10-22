import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public items: MenuItem[];
    public rooms: any = [];
    public activeItem: any = 'Book';
    public isOpen: Boolean = false;
    public bookedRooms: any = [];
    public roomNo: Number;
    public bookingForm: FormGroup;
  constructor(public router: Router, private fb: FormBuilder, private authenticationService: AuthenticationService) {
      this.bookingForm = fb.group({
          username: ['', [Validators.required]],
          roomNo: [''],
          date: [''],
          agenda: [''],
          fromTime: [''],
          toTime: ['']
      });
      this.fillRooms();
  }

    public ngOnInit() {
        this.items = [
            { label: 'Book Meeting Rooms', icon: 'fa fa-fw fa-calendar', command: () => { this.activeItem = "Book" } },
            { label: 'View Booking Records', icon: 'fa fa-eye', command: () => { this.activeItem = "View" } }
        ]
    }

    public fillRooms() {
        this.rooms = Array(10).fill({}).map((x, i) => {
            return {
                name: 'Room No - ' + (i + 1),
                capacity: Math.round((Math.random() * 100) % 3)
            };
        });
    }

    public openModal(room: any, index: any) {
        this.isOpen = true;
        this.roomNo = index + 1;
    }

    public closeModal() {
        this.isOpen = false;
    }

    public getTime(newTime: any, room: any) {
        let splittedFromTime = room.fromTime.split(':');
        let splittedToTime = room.toTime.split(':');
        newTime['from'] = new Date();
        newTime['to'] = new Date();
        newTime['from'].setHours(splittedFromTime[0], splittedFromTime[1]);
        newTime['to'].setHours(splittedToTime[0], splittedToTime[1]);
        return newTime;
    }

    public bookRoom(value: any) {
        const checkConflict = (room:any) => {
            let roomDate = this.getTime({}, room);
            let currDate = this.getTime({}, value);
            if (currDate.from >= roomDate.from && currDate.from <= roomDate.to) return true;
            if (currDate.to >= roomDate.from && currDate.to <= roomDate.to) return true;
            return false;
        }
        value.roomNo = this.roomNo;
        if (this.bookedRooms.find((room: any) => {
            return room && room.date === value.date && checkConflict(room);
        })) {
            alert("There is a conflict for this room");
        } else {
            this.bookedRooms.push(value);
            alert("Succesfully booked");
        }
        console.log(this.bookedRooms)
        this.bookingForm.reset();
        this.closeModal();
    }
}
