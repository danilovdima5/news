import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ModalComponent } from '../../../shared/components';
import { CarsNewsService } from '../../cars-news.service';
import { ModalsService } from '../../../core/modal-container/modals.service';
import { CarsNewsNewSuccessComponent } from '../success/cars-news-new-success.component';

@Component({
  selector: 'app-cars-news-new-form',
  templateUrl: './cars-news-new-form.component.html',
  styleUrls: ['./cars-news-new-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ModalComponent, NgIf, ReactiveFormsModule]
})
export class CarsNewsNewFormComponent {
  private readonly __modalsService = inject(ModalsService);
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

    this.__modalsService.show({
      class: CarsNewsNewSuccessComponent,
      value: {
        image: titleImageUrl,
        description
      }
    });
  }

  public async onFileSelected(event: any): Promise<void> {
    const file = event.target.files[0];

    const base64 = await this.file2Base64(file);

    this.fileControl.setValue(base64);
    this.__cdr.markForCheck();
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
