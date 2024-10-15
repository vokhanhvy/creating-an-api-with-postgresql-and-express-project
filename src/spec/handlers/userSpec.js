"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe("Users Endpoints", () => {
    it("return list of users", async () => {
        const res = await request.get("/users");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it("return a single user", async () => {
        const res = await request.get("/users/1");
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(1);
    });
    it("create a new user", async () => {
        const newUser = {
            username: "vy",
            password: "vy",
            email: "vy@gmail.com",
        };
        const res = await request.post("/users").send(newUser);
        expect(res.status).toBe(200);
        expect(res.body.username).toBe(newUser.username);
        expect(res.body.email).toBe(newUser.email);
    });
    it("update existing user", async () => {
        const updateUser = {
            username: "a",
            password: "b",
            email: "c@gmail.com",
        };
        const res = await request.put("/users/1").send(updateUser);
        expect(res.status).toBe(200);
        expect(res.body.username).toBe(updateUser.username);
        expect(res.body.email).toBe(updateUser.email);
    });
    it("delete existing user", async () => {
        const res = await request.delete("/users/1");
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(1);
    });
});
