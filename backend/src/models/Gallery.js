const db = require('../config/database');

class Gallery {
  // Get all gallery images
  static async getAll() {
    try {
      const rows = await db.query(
        'SELECT * FROM gallery WHERE is_active = TRUE ORDER BY display_order ASC, created_at DESC'
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get all images (admin - including inactive)
  static async getAllAdmin() {
    try {
      const rows = await db.query(
        'SELECT * FROM gallery ORDER BY display_order ASC, created_at DESC'
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get single image by ID
  static async getById(id) {
    try {
      const rows = await db.query('SELECT * FROM gallery WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Create new gallery image
  static async create(data) {
    try {
      const {
        image_path,
        title_est,
        title_eng,
        title_rus,
        description_est,
        description_eng,
        description_rus,
        display_order,
        is_active
      } = data;

      const result = await db.query(
        `INSERT INTO gallery 
        (image_path, title_est, title_eng, title_rus, description_est, description_eng, description_rus, display_order, is_active) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          image_path,
          title_est || null,
          title_eng || null,
          title_rus || null,
          description_est || null,
          description_eng || null,
          description_rus || null,
          display_order || 0,
          is_active !== undefined ? is_active : true
        ]
      );

      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Update gallery image
  static async update(id, data) {
    try {
      const {
        title_est,
        title_eng,
        title_rus,
        description_est,
        description_eng,
        description_rus,
        display_order,
        is_active
      } = data;

      await db.query(
        `UPDATE gallery 
        SET title_est = ?, title_eng = ?, title_rus = ?, 
            description_est = ?, description_eng = ?, description_rus = ?,
            display_order = ?, is_active = ?
        WHERE id = ?`,
        [
          title_est,
          title_eng,
          title_rus,
          description_est,
          description_eng,
          description_rus,
          display_order,
          is_active,
          id
        ]
      );

      return true;
    } catch (error) {
      throw error;
    }
  }

  // Delete gallery image
  static async delete(id) {
    try {
      await db.query('DELETE FROM gallery WHERE id = ?', [id]);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Gallery;
