import { db } from '../utils/database';
import { RowDataPacket } from 'mysql2';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserRow extends RowDataPacket {
  id: number;
  email: string;
  password: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export class UserModel {
  static async findByEmail(email: string): Promise<User | null> {
    try {
      const [rows] = await db.execute<UserRow[]>(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  static async findById(id: number): Promise<User | null> {
    try {
      const [rows] = await db.execute<UserRow[]>(
        'SELECT * FROM users WHERE id = ?',
        [id]
      );
      
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  }

  static async create(userData: { email: string; password: string; name: string }): Promise<number> {
    try {
      const [result] = await db.execute(
        'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
        [userData.email, userData.password, userData.name]
      );
      
      return (result as any).insertId;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
}
