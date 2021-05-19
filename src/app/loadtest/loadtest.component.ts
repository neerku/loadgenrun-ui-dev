import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KeyholeService } from '@app/@core/http/keyhole.service';
import { GenerateDataDialogComponent } from '@app/generate-data-dialog/generate-data-dialog.component';
import { JsonTypePickerDialogComponent } from '@app/json-type-picker-dialog/json-type-picker-dialog.component';
import { SaveTemplateDialogComponent } from '@app/save-template-dialog/save-template-dialog.component';
import { TemplatePreviewDialogComponent } from '@app/template-preview-dialog/template-preview-dialog.component';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { interval, Subscription } from 'rxjs';
//import { SignKeyObjectInput } from 'crypto';

@Component({
  selector: 'app-loadtest',
  templateUrl: './loadtest.component.html',
  styleUrls: ['./loadtest.component.scss'],
})
export class LoadtestComponent implements OnInit, OnDestroy {
  @ViewChild('discover', { static: false }) discover: JsonEditorComponent;
  @ViewChild('predefinedEditor', { static: false }) predefinedEditor: JsonEditorComponent;
  @ViewChild('customEditor', { static: false }) customEditor: JsonEditorComponent;
  @ViewChild('templateFile') templateFile: ElementRef;
  showFileClear: boolean;
  clearFile() {
    this.templateFile.nativeElement.value = '';
    this.showFileClear = false;
  }
  contentEditorClick: number = 0;
  contentEditorExpansionState: any = {};

  saveExpansionState(node: any, state: any) {
    state[node.getPath().join()] = node.expanded;
    if (node.childs) {
      node.childs.forEach((child: any) => this.saveExpansionState(child, state));
    }
  }

  restoreExpansionState(node: any, state: any) {
    if (state[node.getPath().join()]) node.expand(false);
    if (node.childs) {
      node.childs.forEach((child: any) => this.restoreExpansionState(child, state));
    }
  }

  constructor(private keyholeService: KeyholeService, private dialog: MatDialog) { }
  file: any;
  fileContent: string;
  templateToLoad: any;
  loadTestLogs: string;
  uuid: string;
  infoResponse: any;
  showDBDetails: boolean;
  timer: any;
  //Cosmos to Mongo Properties
  isCosmosConnectionValid: boolean = false;
  isMongoConnectionValid: boolean = false;
  cosmosDbList: [];
  projectList: [];
  isBackupStarted: boolean = false;
  Project: Project = {
    MigrationName: '',
    Configuration: {
      CosmosHost: '',
      CosmosAuthenticationDatabase: '',
      CosmosUser: '',
      CosmosPassword: '',
      DumpAll: true,
      CosmosDatabases: '',
      StorageAccountName: '',
      MongoUri: '',
    },
    VMConfiguration: {
      ResourceGroupName: '',
      Location: '',
      MachineName: '',
      OsName: '',
      UserName: '',
      Password: '',
      Size: 1024,
    },
    AzAccount: {
      ClientId: '',
      ClientSecret: '',
      TenantId: '',
      SubscriptionId: '',
    },
  };

  //validation properties
  tabIndex: number = 0;
  validationError: string = '';

  clearFields(): void {
    this.Project = {
      MigrationName: '',
      Configuration: {
        CosmosHost: '',
        CosmosAuthenticationDatabase: '',
        CosmosUser: '',
        CosmosPassword: '',
        DumpAll: true,
        CosmosDatabases: '',
        StorageAccountName: '',
        MongoUri: '',
      },
      VMConfiguration: {
        ResourceGroupName: '',
        Location: '',
        MachineName: '',
        OsName: '',
        UserName: '',
        Password: '',
        Size: 1024,
      },
      AzAccount: {
        ClientId: '',
        ClientSecret: '',
        TenantId: '',
        SubscriptionId: '',
      },
    };
    this.isCosmosConnectionValid = false;
    this.isMongoConnectionValid = false;
    this.cosmosDbList = [];
    this.isBackupStarted = false;
  }

  saveTemplate(templateData: any): void {
    console.log(templateData);
  }

  startBackup(): void {
    this.keyholeService.saveProject(this.Project).subscribe((result: any) => {
      this.clearFields();
      console.log(result);
      this.isBackupStarted = true;
    });
  }

  validateCosmosDetails(): void {
    console.log(this.Project);
    var cosmosDetails = {
      CosmosHost: this.Project.Configuration.CosmosHost,
      CosmosAuthenticationDatabase: this.Project.Configuration.CosmosAuthenticationDatabase,
      CosmosUser: this.Project.Configuration.CosmosUser,
      CosmosPassword: this.Project.Configuration.CosmosPassword,
    };
    this.keyholeService.validateCosmos(cosmosDetails).subscribe((isValid: boolean) => {
      this.isCosmosConnectionValid = isValid;
      if (isValid) this.getDatabaseList();
    });
  }

  getDatabaseList(): void {
    console.log(this.Project);
    var cosmosDetails = {
      CosmosHost: this.Project.Configuration.CosmosHost,
      CosmosAuthenticationDatabase: this.Project.Configuration.CosmosAuthenticationDatabase,
      CosmosUser: this.Project.Configuration.CosmosUser,
      CosmosPassword: this.Project.Configuration.CosmosPassword,
    };
    this.keyholeService.getDbList(cosmosDetails).subscribe((dbList: []) => {
      this.cosmosDbList = dbList;
      if (dbList.length > 0) {
        this.isCosmosConnectionValid = true;
        this.validationError = '';
      }
    }, error => { this.validationError = "Invalid input."; });
  }

  getProjectListInInterval() {
    setInterval(() => this.getProjectList(), 120000);
  }

  getProjectList(): void {
    this.keyholeService.getProjectList().subscribe((projects: []) => {
      this.projectList = projects;
    });
  }

  validateMongoDBConnection(): void {
    var mongoDetails = {
      Uri: this.Project.Configuration.MongoUri,
    };
    this.keyholeService.validateMongo(mongoDetails).subscribe((isValid: boolean) => {
      this.isMongoConnectionValid = isValid;
      if(isValid)
      this.validationError = '';
      else
      this.validationError = 'Invalid input.';
    });
  }

  onStepChange(): void {
    console.log(this);
  }

  onTabChanged(event: any): void {
    console.log(this);
    //let clickedIndex = event.index;

  }
  ngOnInit(): void {
    this.clearFields();
    this.getProjectList();
    this.getProjectListInInterval();
  }
  ngOnDestroy() {
    if (this.timer != null) {
      clearInterval(this.timer);
    }
  }
  // validations
  goPreviousStep() {
    if (this.tabIndex > 0)
      this.tabIndex -= 1;
  }
  goNextStep() {
    if (this.tabIndex <= 2 && this.tabIndex >= 0)
      this.tabIndex += 1;
  }
}
interface Project {
  MigrationName: string;
  Configuration: {
    CosmosHost: string;
    CosmosAuthenticationDatabase: string;
    CosmosUser: string;
    CosmosPassword: string;
    DumpAll: boolean;
    CosmosDatabases: string;
    StorageAccountName: string;
    MongoUri: string;
  };
  VMConfiguration: {
    ResourceGroupName: string;
    Location: string;
    MachineName: string;
    OsName: string;
    UserName: string;
    Password: string;
    Size: number;
  };
  AzAccount: {
    ClientId: string;
    ClientSecret: string;
    TenantId: string;
    SubscriptionId: string;
  };
}
