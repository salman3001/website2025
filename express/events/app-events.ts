import { EventEmitter } from "node:events";

export class AppEvents extends EventEmitter {}

export const appEvents = new AppEvents();
