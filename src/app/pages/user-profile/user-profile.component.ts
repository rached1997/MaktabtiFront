import { Component, OnInit } from '@angular/core';
import {CrudService} from '../../_services/crud.service';
import {User} from '../../_models/user';
import {API_URL} from '../../globals/global-variables';
import {SignInService} from '../../_services/sign-in.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  updateForm: FormGroup;
  user: User;
  constructor(private signInService: SignInService, private formBuilder: FormBuilder) {
    this.signInService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      id: this.user.id,
      name: this.user.name || '',
      email: this.user.email,
      address: this.user.address,
      birthDate: '',
      aboutMe: '',
    })
  }

  editProfile() {

  }
}
