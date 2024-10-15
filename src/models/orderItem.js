"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemModel = void 0;
const database_1 = __importDefault(require("../database"));
class OrderItemModel {
    async index() {
        const conn = await database_1.default.connect();
        const sql = "SELECT * FROM order_items";
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    }
    async show(id) {
        const conn = await database_1.default.connect();
        const sql = "SELECT * FROM order_items WHERE id=$1";
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
    }
    async create(orderItem) {
        const conn = await database_1.default.connect();
        const sql = "INSERT INTO order_items (orderId, productId, quantity) VALUES ($1, $2, $3) RETURNING *";
        const result = await conn.query(sql, [
            orderItem.orderId,
            orderItem.productId,
            orderItem.quantity,
        ]);
        conn.release();
        return result.rows[0];
    }
    async update(orderItem) {
        const conn = await database_1.default.connect();
        const sql = "UPDATE order_items SET orderId=$1, productId=$2, quantity=$3 WHERE id=$4 RETURNING *";
        const result = await conn.query(sql, [
            orderItem.orderId,
            orderItem.productId,
            orderItem.quantity,
            orderItem.id,
        ]);
        conn.release();
        return result.rows[0];
    }
    async delete(id) {
        const conn = await database_1.default.connect();
        const sql = "DELETE FROM order_items WHERE id=$1 RETURNING *";
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
    }
}
exports.OrderItemModel = OrderItemModel;
