// entities/Art.js
import { EntitySchema } from 'typeorm';

export const ArtSchema = new EntitySchema({
  name: 'Art',
  tableName: 'art_gallery',
  columns: {
    id_art: { primary: true, type: 'number', generated: true },
    title: { type: 'varchar', length: 255 },
    author: { type: 'varchar', length: 255 },
    year: { type: 'number', nullable: true },
    description: { type: 'clob', nullable: true },
    style: { type: 'varchar', length: 50 },
    image_blob: { type: 'blob', nullable: true },
    signature: { type: 'varchar', length: 16, nullable: true },
    embedding: { type: 'clob', nullable: true },
    upload_date: { type: 'date', default: () => 'SYSDATE' },
  }
});
