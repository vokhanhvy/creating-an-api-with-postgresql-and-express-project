"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_1 = __importDefault(require("../database"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saltRounds = 10;
class UserModel {
    async index() {
        const conn = await database_1.default.connect();
        const sql = "SELECT * FROM users";
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    }
    async show(id) {
        const conn = await database_1.default.connect();
        const sql = "SELECT * FROM users WHERE id=$1";
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
    }
    async create(user) {
        const conn = await database_1.default.connect();
        const hashedPassword = await bcryptjs_1.default.hash(user.password, saltRounds);
        const sql = "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *";
        const result = await conn.query(sql, [
            user.username,
            hashedPassword,
            user.email,
        ]);
        conn.release();
        return result.rows[0];
    }
    async update(user) {
        const conn = await database_1.default.connect();
        // Hash the password
        const hashedPassword = await bcryptjs_1.default.hash(user.password, saltRounds);
        const sql = "UPDATE users SET username=$1, password=$2, email=$3 WHERE id=$4 RETURNING *";
        const result = await conn.query(sql, [
            user.username,
            hashedPassword,
            user.email,
            user.id,
        ]);
        conn.release();
        return result.rows[0];
    }
    async comparePassword(plainPassword, hashedPassword) {
        return bcryptjs_1.default.compare(plainPassword, hashedPassword);
    }
    async delete(id) {
        const conn = await database_1.default.connect();
        const sql = "DELETE FROM users WHERE id=$1 RETURNING *";
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
    }
}
exports.UserModel = UserModel;
