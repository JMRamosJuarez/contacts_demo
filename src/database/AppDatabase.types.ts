export type tDbRequest<Params> = {
  readonly query: string;
  readonly params: Params;
};

export interface IAppDbClient {
  execute<Params, Result>(request: tDbRequest<Params>): Promise<Result>;
}
