import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogRiegosPageRoutingModule } from './log-riegos-routing.module';

import { LogRiegosPage } from './log-riegos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogRiegosPageRoutingModule
  ],
  declarations: [LogRiegosPage]
})
export class LogRiegosPageModule {}
