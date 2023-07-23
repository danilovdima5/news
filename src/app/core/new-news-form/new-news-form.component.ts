import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

import { ModalService } from '../modal/modal.service';
import { CarsNewsService } from '../../cars-news/cars-news.service';

@Component({
  selector: 'app-new-news-form',
  templateUrl: './new-news-form.component.html',
  styleUrls: ['./new-news-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule]
})
export class NewsFormComponent {
  private readonly __modalService = inject(ModalService);
  private readonly __cdr = inject(ChangeDetectorRef);
  private readonly __carsNewsService = inject(CarsNewsService);

  public readonly form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    description: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    file: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    })
  });

  get fileControl() {
    return this.form.controls.file;
  }

  public onSubmit(): void {
    const { title, description, file: titleImageUrl } = this.form.getRawValue();

    this.__carsNewsService.setNewItem({
      categoryType: '',
      description,
      fullUrl: '',
      id: 0,
      publishedDate: new Date().toISOString(),
      title,
      titleImageUrl,
      url: ''
    });

    this.__modalService.dismiss();
  }

  public async onFileSelected(event: any): Promise<void> {
    const file = event.target.files[0];

    const base64 = await this.file2Base64(file);

    this.fileControl.setValue(base64);
    this.__cdr.markForCheck();
	}

  public closeModal(): void {
    this.__modalService.dismiss();
  }

  public deleteImage(): void {
    this.fileControl.setValue('');
  }

  private async file2Base64(file: File): Promise<string> {
		return await new Promise<string>(resolve => {
			const reader = new FileReader();

			reader.readAsDataURL(file);

			reader.onload = () => resolve(reader.result?.toString() || '');
		});
	}
}
