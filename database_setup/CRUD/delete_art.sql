CREATE OR REPLACE PROCEDURE delete_art(
    p_id IN NUMBER
)
IS
BEGIN
    DELETE FROM art_gallery WHERE id_art = p_id;
    COMMIT;
END;
/
