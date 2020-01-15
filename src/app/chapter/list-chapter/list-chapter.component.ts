import {Component, OnInit} from '@angular/core';
import {Chapter} from '../../_models/chapter';
import {CrudService} from '../../_services/crud.service';
import {SignInService} from '../../_services/sign-in.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {API_URL, LIST_CHAPTERS} from '../../globals/global-variables';

@Component({
  selector: 'app-list-chapter',
  templateUrl: './list-chapter.component.html',
  styleUrls: ['./list-chapter.component.scss']
})
export class ListChapterComponent implements OnInit {

  chapters: Chapter [];

  constructor(private crudService: CrudService, private signInService: SignInService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.crudService.getAll(API_URL + LIST_CHAPTERS).subscribe(
      (response) => {
        this.chapters = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onRead(chapter: any) {
    console.log(chapter.content);
    this.router.navigate(['/read-chapter/', chapter.id]);
  }

}
