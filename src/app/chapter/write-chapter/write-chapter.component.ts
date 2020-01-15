import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CrudService} from '../../_services/crud.service';
import {API_URL, CREATE_CHAPTER} from '../../globals/global-variables';
import {ChapterMV} from '../chaptreModelView/ChapterMV';

@Component({
  selector: 'app-write-chapter',
  templateUrl: './write-chapter.component.html',
  styleUrls: ['./write-chapter.component.scss']
})
export class WriteChapterComponent implements OnInit {
  id: number;
  formWriteChapter: FormGroup;
  chaptercontent = '<p></p>';
  config: any = {
    allowedContent: true,
    toolbar: [['Bold', 'Italic', 'Underline', '-', 'NumberedList', 'BulletedList', 'Link', '-', 'CreatePlaceholder']],
    removePlugins: 'elementspath',
    resize_enabled: false,
    extraPlugins: 'font,divarea,placeholder',
    contentsCss: ['body {font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif;}'],
    autoParagraph: false,
    enterMode: 2
  };

  constructor(private crudService: CrudService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.formWriteChapter = this.formBuilder.group({
      chapter: ''
    });
  }

  onClick() {
    const chapterMv: ChapterMV = new ChapterMV();
    chapterMv.id = this.id;
    chapterMv.content = this.chaptercontent;
    console.log(this.id);
    console.log(this.chaptercontent);
    console.log(chapterMv);

    this.crudService.put(API_URL + CREATE_CHAPTER, chapterMv).subscribe(
      (response) => {
        //this.router.navigate(['/write-chapter/', response.id]);
        this.router.navigate(['/list-chapter']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
