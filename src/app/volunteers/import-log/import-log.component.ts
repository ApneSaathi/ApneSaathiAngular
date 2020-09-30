import { Component, OnInit } from '@angular/core';
import { ApiInfoService } from 'src/app/services/api-info.service';
import { MatSnackBar } from '@angular/material/snack-bar';

const ELEMENT_DATA = [
  {position: 1, originalFile: 'abc.csv', totalRecords: 1, failedRecords: 0,errorFile: 'errorfile1.csv','requestedby':'user1'},
  {position: 2, originalFile: 'xyz.csv', totalRecords: 4, failedRecords: 2,errorFile: 'fileerror1.csv','requestedby':'user2'},
  {position: 3, originalFile: 'abc.csv', totalRecords: 6, failedRecords: 0,errorFile: 'errorfile2.csv','requestedby':'user3'},
  {position: 4, originalFile: 'abc.csv', totalRecords: 9, failedRecords: 3,errorFile: 'fileerror2.csv','requestedby':'user4'},
  {position: 5, originalFile: 'abc.csv', totalRecords: 10, failedRecords: 8,errorFile: 'errorfile3.csv','requestedby':'user5'},
  {position: 6, originalFile: 'xyz.csv', totalRecords: 12, failedRecords: 4,errorFile: 'fileerror3.csv','requestedby':'user6'},
  {position: 7, originalFile: 'abc.csv', totalRecords: 14, failedRecords: 1,errorFile: 'errorfile4.csv','requestedby':'user7'},
  {position: 8, originalFile: 'abc.csv', totalRecords: 15, failedRecords: 2,errorFile: 'fileerror4.csv','requestedby':'user8'},
  {position: 9, originalFile: 'xyz.csv', totalRecords: 18, failedRecords: 1,errorFile: 'errorfile5.csv','requestedby':'user9'},
  {position: 10, originalFile: 'xyz.csv', totalRecords: 20, failedRecords: 0,errorFile: 'fileerror5.csv','requestedby':'user10'},
];

@Component({
  selector: 'app-import-log',
  templateUrl: './import-log.component.html',
  styleUrls: ['./import-log.component.scss']
})
export class ImportLogComponent implements OnInit {
  displayedColumns: string[] = ['originalFile', 'totalRecords', 'failedRecords', 'errorFile','requestedby'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data = ELEMENT_DATA;
  constructor(private api_info: ApiInfoService,private SnackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

}
