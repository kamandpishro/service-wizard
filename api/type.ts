export default interface IApiErrorResponse {
  success?: false;
  code?: string;
  message?: string;
  errrors?: Record<string, string[]>;
}
