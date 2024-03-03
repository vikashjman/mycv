import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { UsersService } from "../users.service";
import { Observable, from } from "rxjs";
import { switchMap } from 'rxjs/operators';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private usersService: UsersService) { }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const { userId } = request.session || {};
        if (userId) {
            return from(this.usersService.findOne(userId)).pipe(
                switchMap(user => {
                    request.CurrentUser = user;
                    return next.handle();
                })
            );
        }
        return next.handle();
    }
}