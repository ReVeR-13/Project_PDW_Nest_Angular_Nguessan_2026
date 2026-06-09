import * as bcrypt from 'bcrypt';
import { ulid } from 'ulid';

export const encryptPassword = async (plaintextPassword: string): Promise<string> =>
    await bcrypt.hash(
        plaintextPassword, 12
    );

export const comparePassword = async (plaintextPassword: string, hash: string): Promise<boolean> =>
    await bcrypt.compare(
        plaintextPassword,
        hash
    );
