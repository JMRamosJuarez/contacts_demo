export type tAppModalData<T = {}> = {
  readonly visible: boolean;
  readonly content?: T;
};

export type tAppModalVisibility<T = {}> = {
  readonly key: string;
  readonly data: tAppModalData<T>;
};
