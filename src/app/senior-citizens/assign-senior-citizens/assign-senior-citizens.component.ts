import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-assign-senior-citizens',
  templateUrl: './assign-senior-citizens.component.html',
  styleUrls: ['./assign-senior-citizens.component.scss']
})
export class AssignSeniorCitizensComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  get selectedCitizens(){
    return this.assignCitizenForm.get('selectedCitizens') as FormArray;
  }
  addSelectedCitizens(){
    this.tempCitizensNumber.forEach(element => {
      console.log(element);
      this.selectedCitizens.push(
        this.fb.group({
          id: [element['id']],
          checked:[false]
        })
        );
    });
    
  }
  assignCitizenForm=this.fb.group({
      selectAll:[false],
      selectedCitizens: this.fb.array([])
  });
  public tempCitizensNumber:object[];
  public base_url;
  ngOnInit(): void {
    this.base_url=environment.base_url;
    this.tempCitizensNumber=[
      {id:1,name:"Citizen1",phone:1234567890},
      {id:2,name:"Citizen2",phone:1234567890},
      {id:3,name:"Citizen3",phone:1234567890},
      {id:4,name:"Citizen4",phone:1234567890},
      {id:5,name:"Citizen5",phone:1234567890},
      {id:6,name:"Citizen6",phone:1234567890},
      {id:7,name:"Citizen7",phone:1234567890},
      {id:8,name:"Citizen8",phone:1234567890},
      {id:9,name:"Citizen9",phone:1234567890},
      {id:10,name:"Citizen10",phone:1234567890},
      {id:11,name:"Citizen11",phone:1234567890},
      {id:12,name:"Citizen12",phone:1234567890},
      {id:13,name:"Citizen13",phone:1234567890},
      {id:14,name:"Citizen14",phone:1234567890},
      {id:15,name:"Citizen15",phone:1234567890},
    ];
    // this.assignCitizenForm.valueChanges.subscribe(formArray=>{
    //   console.log(formArray);
    // });
    this.addSelectedCitizens();
    //console.log(this.assignCitizenForm.value);
  }
  onchecked(){
    
    console.log(this.assignCitizenForm.value);
    //console.log(e.source);
  }
  onChangeSelectAll(){
    let temp_checked=false;
    if(this.assignCitizenForm.controls['selectAll'].value){
      temp_checked=true;
    }
    console.log(this.assignCitizenForm.value)
    this.assignCitizenForm.value.selectedCitizens.forEach((element , i) => {
      this.selectedCitizens.controls[i].patchValue({
        checked:temp_checked
      })
    });
  }
}
