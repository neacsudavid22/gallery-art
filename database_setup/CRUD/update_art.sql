CREATE OR REPLACE PROCEDURE update_art(
    p_id IN NUMBER,
    p_title IN VARCHAR2,
    p_description IN CLOB,
    p_style IN VARCHAR2,
    p_image_blob IN BLOB,
    p_phash IN VARCHAR2,
    p_embedding IN CLOB
)
IS
BEGIN
    UPDATE art_gallery
    SET title = p_title,
        description = p_description,
        style = p_style,
        image_blob = p_image_blob,
        phash = p_phash,
        embedding = p_embedding
    WHERE id_art = p_id;
    COMMIT;
END;
/
