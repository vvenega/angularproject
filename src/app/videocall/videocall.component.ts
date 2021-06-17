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

  constructor(
        public dialogRef: MatDialogRef<VideocallComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private _snackBar: MatSnackBar
    ) { }

    public showCopiedSnackBar() {
        this._snackBar.open('Peer ID Copied!', 'Hurrah', {
        duration: 1000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }

  ngOnInit(): void {
  }

}

export interface DialogData {
    peerId: string | any;
    joinCall: boolean | any
}
