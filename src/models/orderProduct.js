"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductModel = void 0;
const database_1 = __importDefault(require("../database"));
class OrderProductModel {
    async addProduct(op) {
        try {
            const conn = await database_1.default.connect();
            const sql = `INSERT INTO order_products (order_id, product_id, quantity)
                   VALUES ($1, $2, $3) RETURNING *`;
            const result = await conn.query(sql, [
                op.order_id,
                op.product_id,
                op.quantity,
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not add product ${op.product_id} to order ${op.order_id}: ${err}`);
        }
    }
    async getProductsByOrder(order_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM order_products WHERE order_id = $1`;
            const result = await conn.query(sql, [order_id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get products for order ${order_id}: ${err}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = "DELETE FROM order_products WHERE id=($1) RETURNING *";
            const result = await conn.query(sql, [id]);
            const deletedOrderProduct = result.rows[0];
            conn.release();
            return deletedOrderProduct;
        }
        catch (err) {
            throw new Error(`Could not delete order product ${id}. Error: ${err}`);
        }
    }
}
exports.OrderProductModel = OrderProductModel;
