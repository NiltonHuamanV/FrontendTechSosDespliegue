import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JwtModule } from '@auth0/angular-jwt';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
export function tokenGetter(){
  return sessionStorage.getItem('token');
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideCharts(withDefaultRegisterables()),
    provideAnimationsAsync(), importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['backendtechsosdespliegue.onrender.com'],
          disallowedRoutes: ['https://backendtechsosdespliegue.onrender.com/login/forget'],
        },
      })
    )]
};
