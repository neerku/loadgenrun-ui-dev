import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KeyholeService } from '@app/@core/http/keyhole.service';
import { GenerateDataDialogComponent } from '@app/generate-data-dialog/generate-data-dialog.component';
import { JsonTypePickerDialogComponent } from '@app/json-type-picker-dialog/json-type-picker-dialog.component';
import { SaveTemplateDialogComponent } from '@app/save-template-dialog/save-template-dialog.component';
import { TemplatePreviewDialogComponent } from '@app/template-preview-dialog/template-preview-dialog.component';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { interval, Subscription } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { DetailsOverviewDialogComponent } from './details-overview-dialog/details-overview-dialog.component';
import { promise } from 'selenium-webdriver';
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

  constructor(private keyholeService: KeyholeService, private dialog: MatDialog, private route: ActivatedRoute) { }
  file: any;
  fileContent: string;
  templateToLoad: any;
  loadTestLogs: string;
  uuid: string;
  infoResponse: any;
  showDBDetails: boolean;
  timer: any;
  //Cosmos to Mongo Properties
  projectInterval: any;
  infraCreationProject: any = null;
  isCosmosConnectionValid: boolean = false;
  isMongoConnectionValid: boolean = false;
  isConfigurationavailable: boolean = false;
  cosmosDbList: [];
  projectList: [];
  vmLocations: [];
  vmSizes: [];
  dataForValidation: [];
  sampleDataForValidation: any;
  isBackupStarted: boolean = false;
  Project: Project = {
    MigrationName: '',
    Configuration: {
      CosmosHost: '',
      CosmosAuthenticationDatabase: '',
      CosmosUser: '',
      CosmosPassword: '',
      DumpAll: true,
      CosmosDatabases: [],
      StorageAccountName: '',
      StorageAccountPrimaryKey: '',
      MongoUri: '',
    },
    VMConfiguration: {
      ResourceGroupName: '',
      Location: '',
      MachineName: '',
      OsName: '',
      UserName: '',
      Password: '',
      VMSize: '',
      OsDiskSize: 1024,
      VmPublicIPAddress: '',
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
  showLoader: boolean = false;
  projectId: string = '';
  @ViewChild('stepper') stepper: MatStepper;
  clearFields(): void {
    this.Project = {
      MigrationName: '',
      Configuration: {
        CosmosHost: '',
        CosmosAuthenticationDatabase: '',
        CosmosUser: '',
        CosmosPassword: '',
        DumpAll: true,
        CosmosDatabases: [],
        StorageAccountName: '',
        StorageAccountPrimaryKey: '',
        MongoUri: '',
      },
      VMConfiguration: {
        ResourceGroupName: '',
        Location: '',
        MachineName: '',
        OsName: '',
        UserName: '',
        Password: '',
        OsDiskSize: 1024,
        VMSize: '',
        VmPublicIPAddress: '',
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
    this.isConfigurationavailable = false;
    this.cosmosDbList = [];
    this.isBackupStarted = false;
    this.vmLocations = [];
    this.vmSizes = [];
  }

  saveTemplate(templateData: any): void {
    console.log(templateData);
  }

  saveConfiguration(stepper: MatStepper): void {
    this.showLoader = true;
    this.keyholeService.saveProject(this.Project).subscribe((result: any) => {
      this.clearFields();
      console.log(result);
      this.infraCreationProject = result;
      this.isBackupStarted = true;
      this.getProjectInInterval(result.id);
      this.showLoader = false;
      stepper.next();
    });
  }
  startDumping(project: any) {
    this.showLoader = true;

    this.keyholeService.startDumpProcess(project.id).subscribe(
      (result: any) => {
        this.getProject(project.id);
        this.showLoader = false;
      },
      (error) => {
        this.showLoader = false;
      }
    );
  }

  restartDumping(project: any) {
    this.showLoader = true;

    this.keyholeService.reStartDumpProcess(project.id).subscribe(
      (result: any) => {
        this.getProject(project.id);
        this.showLoader = false;
      },
      (error) => {
        this.showLoader = false;
      }
    );
  }

  startRestore(project: any) {
    this.showLoader = true;
    this.keyholeService.startRestoreProcess(project.id).subscribe(
      (result: any) => {
        this.getProject(project.id);
        this.showLoader = false;
      },
      (error) => {
        this.showLoader = false;
      }
    );
  }


  startProcessingChangeEvents(project: any) {
    this.showLoader = true;
    this.keyholeService.processChangeStream(project.id).subscribe(
      (result: any) => {
        this.getProject(project.id);
        this.showLoader = false;
      },
      (error) => {
        this.showLoader = false;
      }
    );
  }

  validateData(stepper: MatStepper) {
    this.showLoader = true;
    this.keyholeService.validateMigration(this.infraCreationProject.id).subscribe((result: any) => {
      this.dataForValidation = result
      this.showLoader = false;
      stepper.next();
    });
  }

  getSampleDataForValidation(database: string, collection: string) {
    this.showLoader = true;
    this.keyholeService.getSampleValidationData(this.infraCreationProject.id, database, collection).subscribe((result: any) => {
      this.sampleDataForValidation = result
      this.showLoader = false;
      return result;
    });

  }

  editProject(projectId: any) {
    console.log(projectId);
  }
  refreshProject(projectId: any) {
    console.log(projectId);
  }

  openDialogForInfraLogs() {
    const dialogRef = this.dialog.open(DetailsOverviewDialogComponent, {
      width: '600px',
      data: { name: 'Infra Creation Details', details: this.infraCreationProject, createdFor: "InfraLogs" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
  openDialogForOutputLogs(job: string) {
    var data: any;
    this.showLoader = true; const dialogRef = this.dialog.open(DetailsOverviewDialogComponent, {
      width: '1500px',
      data: { name: 'Run Logs', details: '', createdFor: "OutputLogs" },
    });


    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });

    if (job == "dump") {
      this.keyholeService.getDumpLogs(this.infraCreationProject.id).subscribe((result: any) => {
        dialogRef.componentInstance.data.details = result;
        this.showLoader = false;

      });
    }
    if (job == "restore") {
      this.keyholeService.getRestoreLogs(this.infraCreationProject.id).subscribe((result: any) => {
        dialogRef.componentInstance.data.details = result;
        this.showLoader = false;
      });
    }
    if (job == "changeEvents") {
      this.keyholeService.getChangeEventLogs(this.infraCreationProject.id).subscribe((result: any) => {
        dialogRef.componentInstance.data.details = result;
        this.showLoader = false;
      });
    }

    this.showLoader = false;
  }


  openDialogForValidationLogs(row: any) {
    this.showLoader = true;

    const dialogRef = this.dialog.open(DetailsOverviewDialogComponent, {
      width: '1000px',
      data: { name: 'Validation', details: '', createdFor: "ValidationLogs" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
    this.keyholeService.getSampleValidationData(this.infraCreationProject.id, row.database, row.collection).subscribe((result: any) => {

      var cosmosDocument = JSON.parse(result.cosmosDocument.replace('\"', '"'));
      var mongoDocument = JSON.parse(result.mongoDocument.replace('\"', '"'));
      dialogRef.componentInstance.data.details = {
        projectId: this.infraCreationProject.id,
        database: row.database,
        collection: row.collection,
        cosmosDocument,
        mongoDocument
      }
      this.showLoader = false;
    });
  }

  validateCosmosDetails(): void {
    console.log(this.Project);
    this.showLoader = true;
    var cosmosDetails = {
      CosmosHost: this.Project.Configuration.CosmosHost,
      CosmosAuthenticationDatabase: this.Project.Configuration.CosmosAuthenticationDatabase,
      CosmosUser: this.Project.Configuration.CosmosUser,
      CosmosPassword: this.Project.Configuration.CosmosPassword,
    };
    this.keyholeService.validateCosmos(cosmosDetails).subscribe((isValid: boolean) => {
      this.isCosmosConnectionValid = isValid;
      if (isValid) this.getDatabaseList();
      this.showLoader = false;
    });
  }

  getDatabaseList(): void {
    console.log(this.Project);
    this.showLoader = true;
    var cosmosDetails = {
      CosmosHost: this.Project.Configuration.CosmosHost,
      CosmosAuthenticationDatabase: this.Project.Configuration.CosmosAuthenticationDatabase,
      CosmosUser: this.Project.Configuration.CosmosUser,
      CosmosPassword: this.Project.Configuration.CosmosPassword,
    };
    this.keyholeService.getDbList(cosmosDetails).subscribe(
      (dbList: []) => {
        this.cosmosDbList = dbList;
        if (dbList.length > 0) {
          this.isCosmosConnectionValid = true;
          this.validationError = '';
        } else {
          this.validationError = 'Invalid input.';
        }
        this.showLoader = false;
      },
      (error) => {
        this.validationError = 'Invalid input.';
        this.showLoader = false;
      }
    );
  }

  getAzureLocations() {
    console.log(this.vmLocations);
    this.showLoader = true;
    this.keyholeService.getVmLocations(this.Project.AzAccount).subscribe(
      (locations: []) => {
        this.vmLocations = locations;
        if (locations.length > 0) {
          this.validationError = '';
        } else {
          this.validationError = 'Invalid input/Check your access for service principal.';
        }
        this.showLoader = false;
      },
      (error) => {
        this.validationError = 'Invalid input/Check your access for service principal.';
        this.showLoader = false;
      }
    );
  }

  changeLocation(location: string) {
    console.log(location);
    this.showLoader = true;
    this.keyholeService.getVmSizes(this.Project.AzAccount, location).subscribe(
      (vmSizes: []) => {
        this.vmSizes = vmSizes;
        if (vmSizes.length > 0) {
          this.validationError = '';
        } else {
          this.validationError = 'Invalid input/Check your access for service principal.';
        }
        this.showLoader = false;
      },
      (error) => {
        this.validationError = 'Invalid input/Check your access for service principal.';
        this.showLoader = false;
      }
    );
  }

  getProjectListInInterval() {
    setInterval(() => this.getProjectList(), 5000);
  }

  getProjectInInterval(id: any) {
    this.projectInterval = setInterval(() => this.getProject(id), 120000);
  }

  getProjectList(): void {
    this.keyholeService.getProjectList().subscribe((projects: []) => {
      this.projectList = projects;
    });
  }

  getProject(id: any): void {
    this.keyholeService.getProject(id).subscribe((project: any) => {
      this.infraCreationProject = project;
    });
  }

  validateMongoDBConnection(): void {
    this.showLoader = true;
    var mongoDetails = {
      Uri: this.Project.Configuration.MongoUri,
    };
    this.keyholeService.validateMongo(mongoDetails).subscribe((isValid: boolean) => {
      this.isMongoConnectionValid = isValid;
      if (isValid) this.validationError = '';
      else this.validationError = 'Invalid input.';
      this.showLoader = false;
    });
  }

  onStepChange(stepper: MatStepper, event: any): void {
    console.log(stepper);
    /*  if (stepper.selectedIndex == 0 && this.infraCreationProject == null) {
        setTimeout(function () {
          stepper.selectedIndex = 0;
        }, 50);
        alert('Please configure infrastructure first.');
      }
      if (stepper.selectedIndex == 1 && event.selectedIndex == 0 && this.infraCreationProject != null) {
        setTimeout(function () {
          stepper.selectedIndex = 1;
        }, 50);
        alert('Please edit project to re-configure.');
      }
      if (
        stepper.selectedIndex == 1 &&
        event.selectedIndex == 2 &&
        !this.infraCreationProject.vmConfiguration.isVirtualMachineCreated &&
        this.infraCreationProject != null
      ) {
        setTimeout(function () {
          stepper.selectedIndex = 1;
        }, 50);
        alert('Infrastructure creation is in progress. Please wait for status change.');
      }
      if (stepper.selectedIndex == 2) {
        setTimeout(function () {
          stepper.selectedIndex = 2;
        }, 50);
        alert('Migration is in progress.');
      }*/

    //if(stepper.selectedIndex === stepper._steps.length-2 && this.infraCreationProject == null)
    //stepper.previous();
  }

  onTabChanged(event: any): void {
    console.log(this);
    //let clickedIndex = event.index;
  }

  ngOnInit(): void {
    this.clearFields();
    if (this.route.snapshot.queryParams.projectId) {
      this.projectId = this.route.snapshot.queryParams.projectId;
      this.getProject(this.projectId);
      this.getProjectInInterval(this.projectId);
    }
  }
  ngAfterViewInit() {
    if (this.projectId != '') this.stepper.selectedIndex = 1;
  }
  ngOnDestroy() {
    if (this.timer != null) {
      clearInterval(this.timer);
    }
  }
  // validations
  goPreviousStep() {
    if (this.tabIndex > 0) this.tabIndex -= 1;
  }
  goNextStep() {
    if (this.tabIndex <= 2 && this.tabIndex >= 0) this.tabIndex += 1;
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
    CosmosDatabases: [];
    StorageAccountName: string;
    StorageAccountPrimaryKey: string;
    MongoUri: string;
  };
  VMConfiguration: {
    ResourceGroupName: string;
    Location: string;
    MachineName: string;
    OsName: string;
    UserName: string;
    Password: string;
    OsDiskSize: number;
    VMSize: string;
    VmPublicIPAddress: string;
  };
  AzAccount: {
    ClientId: string;
    ClientSecret: string;
    TenantId: string;
    SubscriptionId: string;
  };
}
