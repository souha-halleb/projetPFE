import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthHeaderInterceptor } from "./auth-header";

export const HttpInterceptorProviders=[
    {provide:HTTP_INTERCEPTORS,useClass:AuthHeaderInterceptor,multi:true}
];