import { Inject,OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.component.html',
  styleUrls: ['./videocall.component.scss']
})
export class VideocallComponent implements OnInit {

  public accepted:boolean=true;
  public rejected:boolean=false;

  constructor(
        public dialogRef: MatDialogRef<VideocallComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private _snackBar: MatSnackBar
    ) { }


  ngOnInit(): void {
  }

}

export interface DialogData {
    caller: string | any;
    //joinCall: boolean | any
}
