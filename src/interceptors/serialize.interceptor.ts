import {UseInterceptors, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { plainToClass } from 'class-transformer'

export class SerailizeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Run something befor a request is handled
        // by the request handler
        console.log('Im running before the handler', context)
        return next.handle().pipe(
            map((data:any) => {
                // Run somehting before the response is sent out
                console.log("Im running before response is sent out", data)
            })
        )
    }
}