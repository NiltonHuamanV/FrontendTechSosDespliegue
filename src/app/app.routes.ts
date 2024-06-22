import { Routes } from '@angular/router';
import { DistrictComponent } from './components/district/district.component';
import { CreaeditadistrictComponent } from './components/district/creaeditadistrict/creaeditadistrict.component';
import { MarcaComponent } from './components/marca/marca.component';
import { CreaeditamarcaComponent } from './components/marca/creaeditamarca/creaeditamarca.component';
import { ModeloComponent } from './components/modelo/modelo.component';
import { CreaeditamodeloComponent } from './components/modelo/creaeditamodelo/creaeditamodelo.component';
import { DispositivoComponent } from './components/dispositivo/dispositivo.component';
import { CreaeditadispositivoComponent } from './components/dispositivo/creaeditadispositivo/creaeditadispositivo.component';
import { ReparacionComponent } from './components/reparacion/reparacion.component';
import { TallerComponent } from './components/taller/taller.component';
import { CreaeditatallerComponent } from './components/taller/creaeditataller/creaeditataller.component';
import { CreaeditacomentarioComponent } from './components/comentario/creaeditacomentario/creaeditacomentario.component';
import { ComentarioComponent } from './components/comentario/comentario.component';
import { DispositivotallerComponent } from './components/dispositivotaller/dispositivotaller.component';
import { CreaeditadispositivotallerComponent } from './components/dispositivotaller/creaeditadispositivotaller/creaeditadispositivotaller.component';
import { CreaeditareparacionComponent } from './components/reparacion/creaeditareparacion/creaeditareparacion.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { segGuard } from './guard/seguridad.guard';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ReportsComponent } from './components/reports/reports.component';
import { Report02Component } from './components/reports/report02/report02.component';
import { Report03Component } from './components/reports/report03/report03.component';
import { Report04Component } from './components/reports/report04/report04.component';
import { Report05Component } from './components/reports/report05/report05.component';
import { Report06Component } from './components/reports/report06/report06.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
    },
    {
        path:'',
        component: LandingPageComponent

    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path:"district", component: DistrictComponent,
        children:[
            {
                path:'insertardistrict', component:CreaeditadistrictComponent
            }
        ],
        canActivate: [segGuard],
    },
    {
        path:"marca", component: MarcaComponent,
        children:[
            {
                path:'insertarmarca', component: CreaeditamarcaComponent
            }
        ],
        canActivate: [segGuard],
    },

    {
        path:"modelo", component: ModeloComponent,
        children:[
            {
                path:'insertarmodelo', component:CreaeditamodeloComponent
            },
            {
                path:'ediciones/:id', component:CreaeditamodeloComponent
            }
        ],
        canActivate: [segGuard],
    },
    {
        path:"dispositivo", component: DispositivoComponent,
        children:[
            {
                path:'insertardispositivo', component:CreaeditadispositivoComponent,
            },
            {
                path:'ediciones/:id', component:CreaeditadispositivoComponent
            }
        ],
        canActivate: [segGuard],
    },
    {
        path:"reparacion", component: ReparacionComponent,
        children:[
            {
                path:'insertarreparacion', component: CreaeditareparacionComponent,
            },
            {
                path: 'ediciones/:id', component: CreaeditareparacionComponent,
            }
        ],
        canActivate: [segGuard],
    },

    {
        path:"taller", component: TallerComponent,
        children:[
            {
                path:'insertartaller', component:CreaeditatallerComponent
            },
            { path: 'ediciones/:id', component:CreaeditatallerComponent },

        ],
        canActivate: [segGuard],
    },
    {
        path:"dispositivotaller", component: DispositivotallerComponent,
        children:[
            {
                path:'insertardispositivotaller', component: CreaeditadispositivotallerComponent
            },
            {
                path:'ediciones/:id', component: CreaeditadispositivotallerComponent
            }
        ],
        canActivate: [segGuard],
    },

    {
      path:"comentarios", component: ComentarioComponent,
      children:[
          {
              path:'insertarcomentario', component:CreaeditacomentarioComponent
          },
          { path: 'ediciones/:id', component:CreaeditacomentarioComponent },
      ],
      canActivate: [segGuard],
    },

    {
        path:"reportes", component: ReportsComponent,
        children: [
            { path: 'reporte02', component: Report02Component },
            { path: 'reporte03', component: Report03Component },
            { path: 'reporte04', component: Report04Component },
            { path: 'reporte05', component: Report05Component },
            { path: 'reporte06', component: Report06Component },
        ],
        canActivate: [segGuard],
    },
    {
        path: 'homes',
        component: HomeComponent,
        canActivate: [segGuard],
    },
];
