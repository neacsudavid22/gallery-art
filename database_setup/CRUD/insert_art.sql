CREATE OR REPLACE PROCEDURE insert_art(
    p_title IN VARCHAR2,
    p_description IN CLOB,
    p_style IN VARCHAR2,
    p_image_blob IN BLOB,
    p_phash IN VARCHAR2,
    p_embedding IN CLOB
)
IS
BEGIN
    INSERT INTO art_gallery(title, description, style, image_blob, phash, embedding)
    VALUES (p_title, p_description, p_style, p_image_blob, p_phash, p_embedding);
    COMMIT;
END;
/
