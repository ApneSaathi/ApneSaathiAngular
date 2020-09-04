import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiInfoService } from 'src/app/services/api-info.service';
import { SharedService } from 'src/app/services/shared.service';
import { SubscriptionsContainer } from 'src/app/subscriptions-container';

@Component({
  selector: 'app-add-volunteers',
  templateUrl: './add-volunteers.component.html',
  styleUrls: ['./add-volunteers.component.scss']
})
export class AddVolunteersComponent implements OnInit, OnDestroy {

  public uploadError= {
    fileTypeError:false,
    fileNameError:false,
    fileSizeError:false
  };
  public fileNameError:boolean= false;
  constructor(private apiInfo: ApiInfoService, private sharedService: SharedService) { }
  selectedFile:File=null;
  public upload_display_file_name:string="No file Choosen";
  public fileUpload = {status: '', message: '', filePath: ''};
  public subs = new SubscriptionsContainer();
  ngOnInit(): void {
  }
  /**
   * selectedFile function is to get the data of uploaded file
   * @param event 
   */
  onFileSelected(event){
    this.selectedFile= <File>event.target.files[0];
    let sizeInMB = parseFloat((this.selectedFile.size / (1024*1024)).toFixed(2));
    console.log("Size:"+sizeInMB+"MB");
    if(sizeInMB > 1){
      this.uploadError.fileSizeError=true;
      return false;
    }
    let fileExtension=this.selectedFile.name.split('.').pop();
    this.uploadError.fileTypeError= false;
    this.uploadError.fileNameError=false;
    this.uploadError.fileSizeError=false;
    this.upload_display_file_name=this.selectedFile.name.length > 20? "..."+this.selectedFile.name.substr(this.selectedFile.name.length - 20):this.selectedFile.name;
    if(fileExtension.toLowerCase()!='csv'){
      this.uploadError.fileTypeError=true;
    }
    //else 
    if(/\s/g.test(this.selectedFile.name)){
      this.uploadError.fileNameError=true;
    }
    console.log("Event:",event);
    console.log("Extension:",fileExtension);
  }
  submitFile(){
    const fd:FormData= new FormData();
    fd.append('file',this.selectedFile);
    fd.append('adminId',this.sharedService.loginUser.adminId);
    fd.append('adminRole',this.sharedService.loginUser.role);
    console.log("Selected File:",this.selectedFile);
    let uploadParamsObj={
      url:"http://15.207.42.209:8080/Volunteer/getCSVFile",
      //url:"http://localhost:3000/getCSVFile",
      postData:fd
    };
    console.log(fd.get('file'));
    console.log(uploadParamsObj);
    // this.fileUpload.status= 'progress' 
    // this.fileUpload.message= '10' ;
    this.subs.add=this.apiInfo.fileUpload(uploadParamsObj).subscribe(
      res => {
        console.log("Upload Result:",res);
        this.fileUpload = res
      }
    );
  }
  ngOnDestroy(){
    this.subs.dispose();
  }
}
