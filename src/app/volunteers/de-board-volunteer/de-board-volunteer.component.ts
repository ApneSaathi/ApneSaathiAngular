import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalDialogComponent } from 'src/app/global-dialog/global-dialog.component';
import { SubscriptionsContainer } from 'src/app/subscriptions-container';

@Component({
  selector: 'app-de-board-volunteer',
  templateUrl: './de-board-volunteer.component.html',
  styleUrls: ['./de-board-volunteer.component.scss']
})
export class DeBoardVolunteerComponent implements OnInit {
  @Input() volunteerObj;
  deboardForm=this.fb.group({
    deboardType:['',[Validators.required]]
  });
  public subs = new SubscriptionsContainer();
  constructor(private fb: FormBuilder,private dialogRef:MatDialogRef<GlobalDialogComponent>) { }

  ngOnInit(): void {
    this.deboardForm.valueChanges.subscribe(data=>{
    console.log(this.deboardForm);
    });
  }
  proceedDeboard(){
    console.log("Value:",this.deboardForm.value);
    this.dialogRef.close(this.deboardForm.value);
  }
}
