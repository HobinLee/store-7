import {
  HttpStatus,
  Injectable,
  NestMiddleware,
  Next,
  Req,
  Res,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import messages from "./config/messages";
import properties from "./config/properties/properties";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const token = req.cookies[properties.auth.tokenKey];
      if (token) {
        const result = this.jwtService.verify(token)["userId"];
        if (!result) throw Error("token expired");
        req.body.userId = this.jwtService.decode(token)["userId"];
      }
      next();
    } catch (e) {
      res.clearCookie(properties.auth.tokenKey);
      res.status(HttpStatus.PRECONDITION_FAILED);
      res.send(messages.failed.EXPIRED_TOKEN);
    }
  }
}
