import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { autheInterceptorProvider } from './services/security/auth.interceptor';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewCategoryComponent } from './pages/admin/view-category/view-category.component';
import { ViewQuizComponent } from './pages/admin/view-quiz/view-quiz.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import {MatSelectModule} from '@angular/material/select';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
//import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
 //import { EditorModule } from '@tinymce/tinymce-angular';
 import {SidebarComponent as UserSidebar} from './pages/user/sidebar/sidebar.component';
import { LoadCategoryComponent } from './pages/user/load-category/load-category.component';
import { LoadQuizOfCategoryComponent } from './pages/user/load-quiz-of-category/load-quiz-of-category.component';
import { SearchFunctionComponent } from './pages/user/search-function/search-function.component';
import {MatTableModule} from '@angular/material/table';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from "ngx-ui-loader";
import { SearchComponent } from './pages/admin/search/search.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './pages/payment/payment.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    AdminHomeComponent,
    AddCategoryComponent,
    ViewCategoryComponent,
    ViewQuizComponent,
    AddQuizComponent,
    UpdateQuizComponent,
    ViewQuestionsComponent,
    AddQuestionComponent,
    UserSidebar,
    LoadCategoryComponent,
    LoadQuizOfCategoryComponent,
    SearchFunctionComponent,
    InstructionsComponent,
    StartQuizComponent,
    UpdateQuestionComponent,
    SearchComponent,
    UpdateProfileComponent,
    PaymentComponent,
    ThankYouComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatTableModule,
    BackButtonDisableModule.forRoot({preserveScrollPosition:true}),
   //BackButtonDisableModule.forRoot({preserveScrollPosition:true}),
   CKEditorModule,
   MatProgressSpinnerModule,
   NgxUiLoaderModule,
   NgxUiLoaderHttpModule.forRoot({showForeground:true}),
   MatExpansionModule,
   MatMenuModule,
  MatFileUploadModule,
   ReactiveFormsModule,
   MatPaginatorModule
  ],
  providers: [autheInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
