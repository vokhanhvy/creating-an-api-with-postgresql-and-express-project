"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const database_1 = __importDefault(require("../database"));
class OrderModel {
    async index() {
        const conn = await database_1.default.connect();
        const sql = "SELECT * FROM orders";
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    }
    async show(id) {
        const conn = await database_1.default.connect();
        const sql = "SELECT * FROM orders WHERE id=$1";
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
    }
    async create(order) {
        const conn = await database_1.default.connect();
        const sql = "INSERT INTO orders (userId, total, createdAt) VALUES ($1, $2, $3) RETURNING *";
        const result = await conn.query(sql, [
            order.userId,
            order.total,
            order.createdAt,
        ]);
        conn.release();
        return result.rows[0];
    }
    async update(order) {
        const conn = await database_1.default.connect();
        const sql = "UPDATE orders SET userId=$1, total=$2, createdAt=$3 WHERE id=$4 RETURNING *";
        const result = await conn.query(sql, [
            order.userId,
            order.total,
            order.createdAt,
            order.id,
        ]);
        conn.release();
        return result.rows[0];
    }
    async delete(id) {
        const conn = await database_1.default.connect();
        const sql = "DELETE FROM orders WHERE id=$1 RETURNING *";
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
    }
}
exports.OrderModel = OrderModel;
