import { authenticationService, IUser, Response, ConfigService, comparePassword, hashPassword } from "../../../../../../domain/dist/index.js";
import { UserModel } from "../../../models/user-model.js";
import jwt from "jsonwebtoken";

export class AuthenticationService implements authenticationService {

    async findAll(): Promise<Response<IUser[]>> {
        try {
            const users = await UserModel.find().lean();
            return { success: true, data: users as IUser[] };
        } catch (error) {
            return { success: false, error: "Error fetching users" };
        }
    }

    async findById(id: string): Promise<Response<IUser>> {
        try {
            const user = await UserModel.findById(id).lean();
            if (!user) return { success: false, error: "User not found" };
            return { success: true, data: user as IUser };
        } catch (error) {
            return { success: false, error: "Error fetching user" };
        }
    }

    async findUserByEmail(email: string): Promise<Response<IUser>> {
        try {
            const user = await UserModel.findOne({ email }).lean();
            if (!user) return { success: false, error: "User not found" };
            return { success: true, data: user as IUser };
        } catch (error) {
            return { success: false, error: "Error searching user by email" };
        }
    }

    async create(dataUser: Omit<IUser, "id">): Promise<Response<IUser>> {
        try {
            const newUser = await UserModel.create(dataUser);
            return { success: true, data: newUser.toObject() as IUser };
        } catch (error) {
            return { success: false, error: "Error creating user" };
        }
    }

    async validEmail(email: string): Promise<Response<boolean>> {
        const exReg = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        const valid = exReg.test(email);
        if (!valid) return { success: false, error: "Invalid email" };
        return { success: true, data: true };
    }

    async validPassword(password: string, userPassword: string): Promise<Response<boolean>> {
        const valid = await comparePassword(password, userPassword)
        if (!valid) {
            return { success: false, error: "Invalid password" };
        }
        return { success: true, data: true };
    }

    async hashPassword(password: string): Promise<Response<string>> {
        const hashed = await hashPassword(password)
        if (!hashed) return { success: false, error: 'Unexpected error in hash password' }
        return { success: true, data: hashed }
    }

    async generateTokenUser(
        dataUser: Omit<IUser, "password">,
        configService: ConfigService
    ): Promise<Response<string>> {
        try {
            const secretResult = await configService.getSecretKeyJWT();
            if (!secretResult.success)
                return { success: false, error: secretResult.error };

            const token = jwt.sign(dataUser, secretResult.data, { expiresIn: "1h" });
            return { success: true, data: token };
        } catch (error) {
            return { success: false, error: "Error generating token" };
        }
    }



    async editOne(id: string, payload: Partial<IUser>): Promise<Response<IUser>> {
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(id, payload, { new: true }).lean();
            if (!updatedUser) return { success: false, error: "User not found" };
            return { success: true, data: updatedUser as IUser };
        } catch (error) {
            return { success: false, error: "Error editing user" };
        }
    }

    async deleteOne(id: string): Promise<Response<void>> {
        try {
            const deleted = await UserModel.findByIdAndDelete(id).lean();
            if (!deleted) return { success: false, error: "User not found" };
            return { success: true, data: undefined };
        } catch (error) {
            return { success: false, error: "Error deleting user" };
        }
    }
}
