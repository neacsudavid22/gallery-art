CREATE TABLE art_gallery (
    id_art       NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title        VARCHAR2(255) NOT NULL,
    author       VARCHAR2(255) NOT NULL,
    year         NUMBER CHECK (year >= 1000 AND year <= 2025),
    description  CLOB,
    style        VARCHAR2(50) CHECK (style IN ('Impressionism', 'Realism', 'Romanticism', 'Surrealism')),
    image_blob   BLOB,
    audio_blob  BLOB,
    upload_date  DATE DEFAULT SYSDATE
);