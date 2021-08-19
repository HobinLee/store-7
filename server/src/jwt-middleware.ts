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
      const token = req.cookies[properties.auth.tokenKey];
      req.body.userId = this.jwtService.decode(token)["userId"];
      console.log("user id: ", req.body.userId);
    } catch (e) {
      console.log("no token");
    } finally {
      next();
    }
  }
}
