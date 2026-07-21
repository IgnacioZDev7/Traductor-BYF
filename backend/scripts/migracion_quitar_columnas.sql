-- Migración: eliminar columnas `estado` y `requiere_revision` de la tabla `frases`.
--
-- Motivo: eran columnas base sugeridas por ChatGPT. Los doctores de BYF ya
-- validaron todas las traducciones, por lo que ese metadato dejó de aportar.
--
-- Ejecutar una sola vez, con psql o pgAdmin, conectado a la base traductor_medico:
--   psql -U postgres -d traductor_medico -f backend/scripts/migracion_quitar_columnas.sql

ALTER TABLE frases DROP COLUMN IF EXISTS requiere_revision;
ALTER TABLE frases DROP COLUMN IF EXISTS estado;
