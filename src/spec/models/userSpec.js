"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const userModel = new user_1.UserModel();
describe("User Model", () => {
    it("should have index method", () => {
        expect(userModel.index).toBeDefined();
    });
    it("should have show method", () => {
        expect(userModel.show).toBeDefined();
    });
    it("should have create method", () => {
        expect(userModel.create).toBeDefined();
    });
    it("should have update method", () => {
        expect(userModel.update).toBeDefined();
    });
    it("should have delete method", () => {
        expect(userModel.delete).toBeDefined();
    });
    it("create method should add a user", async () => {
        const result = await userModel.create({
            id: 1,
            username: "vy",
            password: "vy",
            email: "vy@gmail.com",
        });
        expect(result).toEqual({
            id: 1,
            username: "vy",
            password: "vy",
            email: "vy@gmail.com",
        });
    });
    it("index method should return list of users", async () => {
        const result = await userModel.index();
        expect(result).toEqual([
            {
                id: 1,
                username: "vy",
                password: "vy",
                email: "vy@gmail.com",
            },
        ]);
    });
    it("show method should return the user", async () => {
        const result = await userModel.show(1);
        expect(result).toEqual({
            id: 1,
            username: "vy",
            password: "vy",
            email: "vy@gmail.com",
        });
    });
    it("delete method should remove the user", async () => {
        await userModel.delete(1);
        const result = await userModel.index();
        expect(result).toEqual([]);
    });
});
