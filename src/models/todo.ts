export type TodoType = {
  id: string;
  text: string;
  complete?: boolean;
};

export enum filter {
  all = "all",
  active = "active",
  completed = "completed",
}
