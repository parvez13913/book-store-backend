import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: IUser): Promise<IUser | null> => {
  const result = await User.create(payload);

  return result.toObject();
};

export const UserService = {
  createUser,
};
