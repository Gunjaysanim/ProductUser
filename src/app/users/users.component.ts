import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../Model/User';
import { UsersService } from '../users';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
    standalone: true, // ✅ important
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class UsersComponent implements OnInit {
UserList?: Observable<User[]>;
  UserList1?: Observable<User[]>;
  userForm: any;
  userId = 0;

  constructor(private formbulider: FormBuilder,
     private userService: UsersService,private router: Router,
     private toastr: ToastrService) { }

  ngOnInit() {
    this.userForm = this.formbulider.group({
      userName: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
    this.getUserList();
  }
  onSubmit() {
  if (this.userForm.valid) {
    const userData = this.userForm.value;
    this.userService.addUser(userData).subscribe({
      next: () => {
        this.toastr.success('User added successfully! 👌', '', {
  toastClass: 'ngx-toastr custom-toast-success'
      });
        this.userForm.reset();
      },
      error: () => {
        this.toastr.error('Failed to add user. ❌');
      }
    });
  }
}
  getUserList() {
    this.UserList1 = this.userService.getUserList();
    this.UserList = this.UserList1;
  }
  PostUser(user: User) {
    const user_Master = this.userForm.value;
    this.userService.postUserData(user_Master).subscribe(
      () => {
        this.getUserList();
        this.userForm.reset();
        this.toastr.success('Data Saved Successfully');
      }
    );
  }
  UserDetailsToEdit(id: string) {
    this.userService.getUserDetailsById(id).subscribe(userResult => {
      this.userId = userResult.userId;
      this.userForm.controls['userName'].setValue(userResult.userName);
      this.userForm.controls['address'].setValue(userResult.address);
    });
  }
  UpdateUser(user: User) {
    user.userId = this.userId;
    const user_Master = this.userForm.value;
    this.userService.updateUser(user_Master).subscribe(() => {
      this.toastr.success('Data Updated Successfully');
      this.userForm.reset();
      this.getUserList();
    });
  }

  DeleteUser(id: number) {
    if (confirm('Do you want to delete this user?')) {
      this.userService.deleteUserById(id).subscribe(() => {
        this.toastr.success('Data Deleted Successfully');
        this.getUserList();
      });
    }
  }

  Clear(user: User){
    this.userForm.reset();
  }
}
