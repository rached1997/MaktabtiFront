import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefaultImageBookPipe} from '../../pipes/default-image-book.pipe';

@NgModule({
  declarations: [DefaultImageBookPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DefaultImageBookPipe
  ]
})
export class SharedModuleModule {
}
