import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { kMaxLength } from "buffer";


export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.CurrentUser;
    }
)