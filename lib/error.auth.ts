import { AuthError } from 'next-auth';

export default class InvalidCredentialsError extends AuthError {
  static type = 'Invalid Credentials';
}
//still going to refactor this util page so i can add more custom error classes
