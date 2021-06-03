import { Component, OnDestroy, OnInit } from '@angular/core';
import { KeyholeService } from '@app/@core/http/keyhole.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  projectList: [];
  constructor(private keyholeService: KeyholeService) {}

  getProjectListInInterval() {
    setInterval(() => this.getProjectList(), 120000);
  }

  getProjectList(): void {
    this.keyholeService.getProjectList().subscribe((projects: []) => {
      this.projectList = projects;
    });
  }

  editProject(projectId: any) {
    console.log(projectId);
  }

  refreshProject(projectId: any) {
    console.log(projectId);
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.getProjectList();
    this.getProjectListInInterval();
  }
}
