import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { ChartjsModule } from '@ctrl/ngx-chartjs';
import { SystemInfoComponent } from '../components/system-info/system-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    ChartjsModule
  ],
  declarations: [FolderPage,SystemInfoComponent]
})
export class FolderPageModule {}
