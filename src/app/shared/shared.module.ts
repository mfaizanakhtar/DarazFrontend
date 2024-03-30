import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {NgxPrintModule} from 'ngx-print'
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { NgbNavModule, NgbDropdownModule, NgbTooltipModule, NgbProgressbarModule, NgbPopover, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DndModule } from 'ngx-drag-drop';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HorizontalnavbarComponent } from './horizontalnavbar/horizontalnavbar.component';
import { HorizontaltopbarComponent } from './horizontaltopbar/horizontaltopbar.component';
import { FooterComponent } from './footer/footer.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { PagetitleComponent } from './pagetitle/pagetitle.component';
import { HorizontalComponent } from '../analytics/horizontal/horizontal.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { PageNavComponent } from './page-nav/page-nav.component';
import { MatTextBoxComponent } from './mat-text-box/mat-text-box.component';
import { MatDropDownComponent } from './mat-drop-down/mat-drop-down.component';
import { MatBtnComponent } from './mat-btn/mat-btn.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 0.3
};

@NgModule({
  declarations: [
    NavbarComponent,
    HorizontalnavbarComponent,
    HorizontaltopbarComponent,
    FooterComponent,
    RightsidebarComponent,
    PagetitleComponent,
    HorizontalComponent,
    PageNavComponent,
    MatTextBoxComponent,
    MatDropDownComponent,
    MatBtnComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatMenuModule,
    MatTableModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule,
    NgxPrintModule,
    MatTabsModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    MatExpansionModule,
    NgbProgressbarModule,
    NgbPopoverModule,
    ScrollingModule,
    

    AppRoutingModule,

    FormsModule,
    MatSelectModule,

    MatSlideToggleModule,
    NgxDatatableModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgApexchartsModule,
    PerfectScrollbarModule,
    DndModule,
    FullCalendarModule,
    LeafletModule,
    NgxSpinnerModule,

  ],
  exports:[
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatMenuModule,
    MatTableModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule,
    NgxPrintModule,
    MatTabsModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    MatExpansionModule,
    ScrollingModule,

    AppRoutingModule,

    FormsModule,
    MatSelectModule,

    MatSlideToggleModule,
    NgxDatatableModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgApexchartsModule,
    PerfectScrollbarModule,
    DndModule,
    FullCalendarModule,
    LeafletModule,
    NgxSpinnerModule,
    NgbProgressbarModule,
    NgbPopoverModule,

    HorizontaltopbarComponent,
    NavbarComponent,
    HorizontalnavbarComponent,
    FooterComponent,
    RightsidebarComponent,
    PagetitleComponent,
    HorizontalComponent,
    PageNavComponent,

    MatTextBoxComponent,
    MatDropDownComponent,
    MatBtnComponent
  ],
  providers:[
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
