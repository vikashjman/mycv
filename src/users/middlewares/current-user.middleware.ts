import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express"; // Import the Request type from express
import { UsersService } from "../users.service";
import { User } from "../users.entity";


declare global {
    namespace Express {
        interface Request {
            CurrentUser?: User;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(
        private usersService: UsersService
    ) { }
    async use(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.session || {};
        if (userId) {
            const user = await this.usersService.findOne(userId);
            req.CurrentUser = user;
        }

        next();
    }
}