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
    audio_blob: { type: 'blob', nullable: true },
    upload_date: { type: 'date', default: () => 'SYSDATE' },
  }
});
