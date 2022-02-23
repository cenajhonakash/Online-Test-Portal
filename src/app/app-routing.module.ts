import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { SearchComponent } from './pages/admin/search/search.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoryComponent } from './pages/admin/view-category/view-category.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { ViewQuizComponent } from './pages/admin/view-quiz/view-quiz.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadCategoryComponent } from './pages/user/load-category/load-category.component';
import { LoadQuizOfCategoryComponent } from './pages/user/load-quiz-of-category/load-quiz-of-category.component';
import { SearchFunctionComponent } from './pages/user/search-function/search-function.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/security/admin.guard';
import { UserGuard } from './services/security/user.guard';

const routes: Routes = [
  {
    path:'signup',
    component:SignupComponent,
    pathMatch: 'full'
  },
  {
    path:'',
    component:HomeComponent,
    pathMatch: 'full'
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch: 'full'
  },
  {
    path:'admin',
    component:AdminDashboardComponent,
    //pathMatch:'full',
    canActivate:[AdminGuard],
    children:[
      
      {
        path:'profile',
        component:ProfileComponent,
       // pathMatch: 'full'
      },
      {
        path:'',
        component:AdminHomeComponent,
       // pathMatch: 'full'AdminHomeComponent
      },
      {
        path:'categories',
        component:ViewCategoryComponent,
       // pathMatch: 'full' ViewCategoryComponent
      },
      {
        path:'add-categories',
        component:AddCategoryComponent,
       // pathMatch: 'full'AddCategoryComponent
      },
      {
        path:'quizzes',
        component:ViewQuizComponent,
       // pathMatch: 'full'ViewQuizComponent
      },
      {
        path:'add-quiz',
        component:AddQuizComponent,
       // pathMatch: 'full' AddQuizComponent
      },
      {
        path:'quiz/:qid',
        component:UpdateQuizComponent,
       // pathMatch: 'full' AddQuizComponent
      },
      {
        path:'viewQuestions/:qid/:title',
        component:ViewQuestionsComponent,
       // pathMatch: 'full' AddQuestionComponent
      },
      {
        path:'add-question/:qid/:title',
        component:AddQuestionComponent,
       // pathMatch: 'full' AddQuestionComponent
      },
      {
        path:'update-question/:qid/:title/:questionId',
        component:UpdateQuestionComponent,
       // pathMatch: 'full' AddQuizComponent
      },
      {
        path:'search',
        component:SearchComponent,
       // pathMatch: 'full' AddQuizComponent
      },
      {
        path:'update-profile/:userID',
        component:UpdateProfileComponent,
       // pathMatch: 'full'
      },
      {
        path:'reset_password/:check/:userID',
        component:UpdateProfileComponent,
       // pathMatch: 'full'
      },
      {
       path:'set/:title/:cid',
       component:LoadQuizOfCategoryComponent,
       // pathMatch: 'full' AddQuestionComponent
      },
      {
        path:'thank-you/:amount/:payment',
        component:ThankYouComponent,
       // pathMatch: 'full'
      },
      {
        path:'fetchPayment_details/:userID',
        component:PaymentComponent,
       // pathMatch: 'full'
      },
      {
        path:'reset_password/:check/:userID',
        component:UpdateProfileComponent,
       // pathMatch: 'full'
      }
    ]
  },
  {
    path:'user',
    component:UserDashboardComponent,   
    canActivate:[UserGuard],
    children:[
      {
        path:'',
        component:LoadCategoryComponent,
       // pathMatch: 'full' AddQuestionComponent
      },
      {
       path:'set/:title/:cid',
       component:LoadQuizOfCategoryComponent,
       // pathMatch: 'full' AddQuestionComponent
      },
      {
        path:'search',
        component:SearchFunctionComponent,
       // pathMatch: 'full' AddQuestionComponent
      },
      {
        path:'instructions/:qid',
        component:InstructionsComponent,
       // pathMatch: 'full' AddQuestionComponent
      },
      {
        path:'profile',
        component:ProfileComponent,
       // pathMatch: 'full'
      },
      {
        path:'update-profile/:userID',
        component:UpdateProfileComponent,
       // pathMatch: 'full'
      },
      {
        path:'thank-you/:amount/:payment',
        component:ThankYouComponent,
       // pathMatch: 'full'
      },
      {
        path:'fetchPayment_details/:userID',
        component:PaymentComponent,
       // pathMatch: 'full'
      },
      {
        path:'reset_password/:check/:userID',
        component:UpdateProfileComponent,
       // pathMatch: 'full'
      }
    ]
  },
  {
    path:'start-test/:qid',
    component:StartQuizComponent,
    canActivate:[UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
