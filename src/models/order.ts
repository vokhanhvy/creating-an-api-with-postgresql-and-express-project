import db from "../database";

export type Order = {
  id: number;
  userId: number;
  total: number;
  createdAt?: Date;
};

export class OrderModel {
  async index(): Promise<Order[]> {
    const conn = await db.connect();
    const sql = "SELECT * FROM orders";
    const result = await conn.query(sql);
    conn.release();
    return result.rows;
  }

  async show(id: number): Promise<Order> {
    const conn = await db.connect();
    const sql = "SELECT * FROM orders WHERE id=$1";
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows[0];
  }

  async create(order: Order): Promise<Order> {
    const conn = await db.connect();
    const sql =
      "INSERT INTO orders (userId, total, createdAt) VALUES ($1, $2, $3) RETURNING *";
    const result = await conn.query(sql, [
      order.userId,
      order.total,
      order.createdAt,
    ]);
    conn.release();
    return result.rows[0];
  }

  async update(order: Order): Promise<Order> {
    const conn = await db.connect();
    const sql =
      "UPDATE orders SET userId=$1, total=$2, createdAt=$3 WHERE id=$4 RETURNING *";
    const result = await conn.query(sql, [
      order.userId,
      order.total,
      order.createdAt,
      order.id,
    ]);
    conn.release();
    return result.rows[0];
  }

  async delete(id: number): Promise<Order> {
    const conn = await db.connect();
    const sql = "DELETE FROM orders WHERE id=$1 RETURNING *";
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows[0];
  }
}
