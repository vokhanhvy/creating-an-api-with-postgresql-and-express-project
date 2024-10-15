import client from "../database";

export type OrderProduct = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderProductModel {
  async addProduct(op: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO order_products (order_id, product_id, quantity)
                   VALUES ($1, $2, $3) RETURNING *`;
      const result = await conn.query(sql, [
        op.order_id,
        op.product_id,
        op.quantity,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add product ${op.product_id} to order ${op.order_id}: ${err}`
      );
    }
  }

  async getProductsByOrder(order_id: number): Promise<OrderProduct[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM order_products WHERE order_id = $1`;
      const result = await conn.query(sql, [order_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products for order ${order_id}: ${err}`);
    }
  }

  async delete(id: number): Promise<OrderProduct | null> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM order_products WHERE id=($1) RETURNING *";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0] || null;
    } catch (err) {
      throw new Error(`Could not delete order product ${id}. Error: ${err}`);
    }
  }
  async updateProduct(op: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE order_products
                   SET quantity = $1
                   WHERE order_id = $2 AND product_id = $3
                   RETURNING *`;
      const result = await conn.query(sql, [
        op.quantity,
        op.order_id,
        op.product_id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update product ${op.product_id} in order ${op.order_id}: ${err}`
      );
    }
  }
}
