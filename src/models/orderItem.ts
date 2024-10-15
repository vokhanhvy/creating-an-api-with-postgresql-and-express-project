import db from "../database";

export type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
};

export class OrderItemModel {
  async index(): Promise<OrderItem[]> {
    const conn = await db.connect();
    const sql = "SELECT * FROM order_items";
    const result = await conn.query(sql);
    conn.release();
    return result.rows;
  }

  async show(id: number): Promise<OrderItem | null> {
    try {
      const conn = await db.connect();
      const sql = `SELECT * FROM order_items WHERE id = $1`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0] || null;
    } catch (err) {
      throw new Error(`Could not get order item ${id}. Error: ${err}`);
    }
  }

  async create(o: OrderItem): Promise<OrderItem> {
    try {
      const conn = await db.connect();
      const sql = `INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *`;
      const result = await conn.query(sql, [
        o.orderId,
        o.productId,
        o.quantity,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create order item. Error: ${err}`);
    }
  }

  async update(orderItem: OrderItem): Promise<OrderItem> {
    const conn = await db.connect();
    const sql =
      "UPDATE order_items SET orderId=$1, productId=$2, quantity=$3 WHERE id=$4 RETURNING *";
    const result = await conn.query(sql, [
      orderItem.orderId,
      orderItem.productId,
      orderItem.quantity,
      orderItem.id,
    ]);
    conn.release();
    return result.rows[0];
  }

  async delete(id: number): Promise<OrderItem | null> {
    try {
      const conn = await db.connect();
      const sql = `DELETE FROM order_items WHERE id = $1 RETURNING *`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0] || null;
    } catch (err) {
      throw new Error(`Could not delete order item ${id}. Error: ${err}`);
    }
  }
}
