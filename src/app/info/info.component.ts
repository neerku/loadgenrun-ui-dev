import { Component, OnInit } from '@angular/core';
import { KeyholeService } from '@app/@core/http/keyhole.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  version: string | null = environment.version;

  showInfo: boolean = false;
  info: string = '';
  infoResponse: any;
  infoRequest: InfoRequest = { server: '', connectionString: '', command: 'allinfo' };
  round = Math.round;
  constructor(private keyholeService: KeyholeService) {}

  getClusterInfo(): void {
    console.log(this.infoRequest);
  }

  ngOnInit(): void {
    //this.getClusterInfo();
  }
}

interface InfoRequest {
  server: string;
  connectionString: string;
  command: string;
}
