import { Router } from "express";

export class BaseController {
  router: Router;
  constructor() {
    this.router = Router();
  }
}
