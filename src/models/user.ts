import db from "../database";
import bcrypt from "bcryptjs";
const saltRounds = 10;
export type User = {
  id: number;
  username: string;
  password: string;
  email: string;
};

export class UserModel {
  async index(): Promise<User[]> {
    const conn = await db.connect();
    const sql = "SELECT * FROM users";
    const result = await conn.query(sql);
    conn.release();
    return result.rows;
  }

  async show(id: number): Promise<User> {
    const conn = await db.connect();
    const sql = "SELECT * FROM users WHERE id=$1";
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows[0];
  }

  async create(user: User): Promise<User> {
    try {
      const conn = await db.connect();
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      const sql = `
        INSERT INTO users (username, password, email) 
        VALUES ($1, $2, $3) RETURNING *;
      `;
      const result = await conn.query(sql, [
        user.username,
        hashedPassword,
        user.email,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create user ${user.username}. Error: ${err}`);
    }
  }

  async update(user: User): Promise<User> {
    const conn = await db.connect();

    // Hash the password
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    const sql =
      "UPDATE users SET username=$1, password=$2, email=$3 WHERE id=$4 RETURNING *";
    const result = await conn.query(sql, [
      user.username,
      hashedPassword,
      user.email,
      user.id,
    ]);
    conn.release();
    return result.rows[0];
  }

  async comparePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async delete(id: number): Promise<User | null> {
    try {
      const conn = await db.connect();
      const sql = "DELETE FROM users WHERE id=($1) RETURNING *";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0] || null;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
