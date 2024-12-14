export class RegisterUserCommand {
  constructor(
    public email: string,
    public password: string,
    public username: string,
  ) {}
}
