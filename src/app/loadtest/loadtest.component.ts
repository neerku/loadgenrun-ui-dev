import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KeyholeService } from '@app/@core/http/keyhole.service';
import { GenerateDataDialogComponent } from '@app/generate-data-dialog/generate-data-dialog.component';
import { JsonTypePickerDialogComponent } from '@app/json-type-picker-dialog/json-type-picker-dialog.component';
import { SaveTemplateDialogComponent } from '@app/save-template-dialog/save-template-dialog.component';
import { TemplatePreviewDialogComponent } from '@app/template-preview-dialog/template-preview-dialog.component';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { interval, Subscription } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
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

  constructor(private keyholeService: KeyholeService, private dialog: MatDialog) {}
  file: any;
  fileContent: string;
  templateToLoad: any;
  loadTestLogs: string;
  uuid: string;
  infoResponse: any;
  showDBDetails: boolean;
  timer: any;
  //Cosmos to Mongo Properties
  infraCreationProject: any = null;
  /* {
    id:"8ece72b6-7f68-40b7-802c-6ad059117a30",
    AzAccount: {
      ClientId: "8ece72b6-7f68-40b7-802c-6ad059117a30",
      ClientSecret: "469o1_cAZd2_M-Zi7U442v0rPBGsTkI_c1",
      SubscriptionId: "73eb6d29-402a-4726-b8be-2c3415b91f0a",
      TenantId: "384f62c1-bce1-4bf2-8cc2-d262d500d522"
    },
    Configuration: {
      CosmosAuthenticationDatabase: "test",
      CosmosDatabases: [],
      CosmosHost: "cosmosmongo-test.mongo.cosmos.azure.com:10255",
      CosmosPassword: "XJLY4lZBs1UqEGqg6qBm2l4BY9ro48yzs1PPiPNeQMize1KvByHoelLiRbQM9wwh1Ou4WtBbGK7N0gDuf5BXWA==",
      CosmosUser: "cosmosmongo-test",
      DumpAll: true,
      MongoUri: "mongodb://azureuser:6MFCRWYgO4aM7ezt@cluster0-shard-00-00.wdpzr.mongodb.net:27017,cluster0-shard-00-01.wdpzr.mongodb.net:27017,cluster0-shard-00-02.wdpzr.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-3odlmy-shard-0&authSource=admin",
      StorageAccountName: "",
      StorageAccountPrimaryKey: ""
    },
    MigrationName: "Task 1",
    vmConfiguration: {
      Location: "westus2",
      MachineName: "MNQA",
      OsDiskSize: 1024,
      OsName: "Windows",
      Password: "pass",
      ResourceGroupName: "TRS2",
      UserName: "Admin",
      VMSize: "Standard_M416-208s_v2",
      VmPublicIPAddress: ""
    }
  }; */
  isCosmosConnectionValid: boolean = false;
  isMongoConnectionValid: boolean = false;
  isConfigurationavailable: boolean = false;
  cosmosDbList: [];
  projectList: [];
  vmLocations: [];
  vmSizes: [];
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
    this.keyholeService.saveProject(this.Project).subscribe((result: any) => {
      this.clearFields();
      console.log(result);
      this.infraCreationProject = result;
      this.isBackupStarted = true;
      this.getProjectInInterval(result.id);
      stepper.next();
    });
  }
  startMigration(stepper: MatStepper, project: any) {
    this.infraCreationProject = project;

    this.keyholeService.startDumpProcess(project).subscribe(
      (dbList: []) => {
        this.cosmosDbList = dbList;
        if (dbList.length > 0) {
          this.isCosmosConnectionValid = true;
          this.validationError = '';
        } else {
          this.validationError = 'Invalid input.';
        }
      },
      (error) => {
        this.validationError = 'Invalid input.';
      }
    );
    stepper.next();
  }
  editProject(projectId: any) {
    console.log(projectId);
  }
  refreshProject(projectId: any) {
    console.log(projectId);
  }
  backupProject(projectId: any) {
    console.log(projectId);
  }
  restoreProject(projectId: any) {
    console.log(projectId);
  }
  changeEventProject(projectId: any) {
    console.log(projectId);
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
    this.keyholeService.getDbList(cosmosDetails).subscribe(
      (dbList: []) => {
        this.cosmosDbList = dbList;
        if (dbList.length > 0) {
          this.isCosmosConnectionValid = true;
          this.validationError = '';
        } else {
          this.validationError = 'Invalid input.';
        }
      },
      (error) => {
        this.validationError = 'Invalid input.';
      }
    );
  }
  getAzureLocations() {
    console.log(this.vmLocations);

    this.keyholeService.getVmLocations(this.Project.AzAccount).subscribe(
      (locations: []) => {
        this.vmLocations = locations;
        if (locations.length > 0) {
          this.validationError = '';
        } else {
          this.validationError = 'Invalid input/Check your access for service principal.';
        }
      },
      (error) => {
        this.validationError = 'Invalid input/Check your access for service principal.';
      }
    );
  }
  changeLocation(location: string) {
    console.log(location);

    this.keyholeService.getVmSizes(this.Project.AzAccount, location).subscribe(
      (vmSizes: []) => {
        this.vmSizes = vmSizes;
        if (vmSizes.length > 0) {
          this.validationError = '';
        } else {
          this.validationError = 'Invalid input/Check your access for service principal.';
        }
      },
      (error) => {
        this.validationError = 'Invalid input/Check your access for service principal.';
      }
    );
  }
  getProjectListInInterval() {
    setInterval(() => this.getProjectList(), 5000);
  }
  getProjectInInterval(id: any) {
    setInterval(() => this.getProject(id), 12000);
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
    var mongoDetails = {
      Uri: this.Project.Configuration.MongoUri,
    };
    this.keyholeService.validateMongo(mongoDetails).subscribe((isValid: boolean) => {
      this.isMongoConnectionValid = isValid;
      if (isValid) this.validationError = '';
      else this.validationError = 'Invalid input.';
    });
  }

  onStepChange(stepper: MatStepper, event: any): void {
    console.log(stepper);
    if (stepper.selectedIndex == 0 && this.infraCreationProject == null) {
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
    }

    //if(stepper.selectedIndex === stepper._steps.length-2 && this.infraCreationProject == null)
    //stepper.previous();
  }

  onTabChanged(event: any): void {
    console.log(this);
    //let clickedIndex = event.index;
  }
  ngOnInit(): void {
    this.clearFields();
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
