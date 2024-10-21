export class PostgressError extends Error {
  constructor(message: string, dbError: any) {
    super(message);
    console.error(dbError);
  }
}
