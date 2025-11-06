CREATE OR REPLACE PROCEDURE get_art(
    p_id IN NUMBER,
    p_title OUT VARCHAR2,
    p_description OUT CLOB,
    p_style OUT VARCHAR2,
    p_image_blob OUT BLOB,
    p_phash OUT VARCHAR2,
    p_embedding OUT CLOB
)
IS
BEGIN
    SELECT title, description, style, image_blob, phash, embedding
    INTO p_title, p_description, p_style, p_image_blob, p_phash, p_embedding
    FROM art_gallery
    WHERE id_art = p_id;
END;
/
