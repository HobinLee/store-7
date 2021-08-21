import { Injectable, NestMiddleware, Next, Req, Res } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import properties from "./config/properties/properties";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction
  ): any {
    try {
      console.log(req.path);
      const token = req.cookies[properties.auth.tokenKey];
      if (token) {
        req.body.userId = this.jwtService.verifyAsync(token)["userId"];
      }
    } catch (e) {
      res.clearCookie(properties.auth.tokenKey);
      console.log("no token");
    } finally {
      next();
    }
  }
}
