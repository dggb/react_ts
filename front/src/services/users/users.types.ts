export type User = {
  id: string;
  name: string;
  pwd: string;
  email: string;
};

export type UserData = {
  getUsers(): Promise<User>;
};
