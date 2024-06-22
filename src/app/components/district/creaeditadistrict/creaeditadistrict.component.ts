import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DistrictService } from '../../../services/district.service';
import { District } from '../../../models/district';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-creaeditadistrict',
  standalone: true,
  imports: [MatFormFieldModule, 
    ReactiveFormsModule,
    MatSelectModule, 
    CommonModule, 
    MatInputModule,
    MatButtonModule,
    NgIf,
    RouterLink,
  ],
  templateUrl: './creaeditadistrict.component.html',
  styleUrl: './creaeditadistrict.component.css'
})
export class CreaeditadistrictComponent {
  form:FormGroup= new FormGroup({});
  district:District = new District();
 
  constructor(private formBuilder:FormBuilder,
    private dS:DistrictService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      distrito:['',Validators.required],
    })
  }
  aceptar():void
  { 
    if(this.form.valid)
      {
        this.district.name = this.form.value.distrito;
        this.dS.insert(this.district).subscribe((data)=>{
          this.dS.list().subscribe((data)=>{
            this.dS.setlist(data)
          })
      });
      this.router.navigate(['district'])
  }

}
}
