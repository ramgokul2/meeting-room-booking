import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
    public items: MenuItem[];
    public rooms: any = [];
    public activeItem: any = 'Book';
    public isOpen: Boolean = false;
    public check: boolean = false;
    public bookedRooms: any = [];
    public roomNo: Number;
    public bookingForm: FormGroup;
  constructor(public router: Router, private fb: FormBuilder) {
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

    public openModal(room: any, index: any, optional?: boolean) {
        this.isOpen = true;
        this.roomNo = index + 1;
        this.check = optional;
    }

    public closeModal() {
        this.isOpen = false;
    }

    public checkConflict(room:any, value:any) {
      const getTime = (newTime: any, room: any) => {
          let splittedFromTime = room.fromTime.split(':');
          let splittedToTime = room.toTime.split(':');
          newTime['from'] = new Date();
          newTime['to'] = new Date();
          newTime['from'].setHours(splittedFromTime[0], splittedFromTime[1]);
          newTime['to'].setHours(splittedToTime[0], splittedToTime[1]);
          return newTime;
      }
      let roomDate = getTime({}, room);
      let currDate = getTime({}, value);
      if (currDate.from >= roomDate.from && currDate.from <= roomDate.to) return true;
      if (currDate.to >= roomDate.from && currDate.to <= roomDate.to) return true;
      if (roomDate.from >= currDate.from && roomDate.from <= currDate.to) return true;
      if (roomDate.to >= currDate.from && roomDate.to <= currDate.to) return true;
      return false;
    }

    public bookRoom(value: any) {
        value.roomNo = this.roomNo;
        if (this.bookedRooms.find((room: any) => {
            return room && room.date === value.date && this.checkConflict(room, value);
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

    public deleteRecord(index: Number) {
      this.bookedRooms.splice(index, 1);
    }

    public checkAvailability(value: any) {
      value.roomNo = this.roomNo;
      const foundRoom = this.bookedRooms.find((room: any) => {
        return room && room.date === value.date && this.checkConflict(room, value);
      });
      if (foundRoom) {
        alert(`${foundRoom.username} has already booked that slot. Try a different slot` );
      } else {
        alert("This slot is available");
      }
    }
}
