import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { JwtService } from "./core/auth/services/jwt.service";
import { UserService } from "./core/auth/services/user.service";
// import { apiInterceptor } from "./core/interceptors/api.interceptor";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { tokenInterceptor } from "./core/interceptors/token.interceptor";
import { errorInterceptor } from "./core/interceptors/error.interceptor";
import { EMPTY } from "rxjs";
import { provideAuth, getAuth } from "@angular/fire/auth";

export function initAuth(jwtService: JwtService, userService: UserService) {
  return () => (jwtService.getToken() ? userService.getCurrentUser() : EMPTY);
}

const firebaseConfig = {
  apiKey: "AIzaSyDLBo7vivXE82WtgYqfq4gndt_MELUR2vo",
  authDomain: "angular-conduit-3426c.firebaseapp.com",
  databaseURL: "https://angular-conduit-3426c-default-rtdb.firebaseio.com",
  projectId: "angular-conduit-3426c",
  storageBucket: "angular-conduit-3426c.firebasestorage.app",
  messagingSenderId: "723981541061",
  appId: "1:723981541061:web:8a4f7cb473e9c2b3659aac",
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor, errorInterceptor])),
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initAuth,
    //   deps: [JwtService, UserService],
    //   multi: true,
    // },
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
};
