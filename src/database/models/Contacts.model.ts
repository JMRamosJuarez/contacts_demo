export type tContactDbModel = {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
  readonly department: string;
};

export type tContactSeedModel = {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
  readonly department: 'Ventas' | 'Desarrollo' | 'Marketing' | 'Soporte';
};
