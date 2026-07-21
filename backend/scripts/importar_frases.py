# -*- coding: utf-8 -*-
"""Importa frases desde un CSV (delimitado por `;`) a la tabla `frases`.

Idempotente: usa `merge`, así que inserta filas nuevas y actualiza las existentes
por `id` (se puede correr varias veces sin duplicar).

Uso (desde la raíz del repo):
    python backend/scripts/importar_frases.py docs/traducciones/frases_laboratorio_borrador.csv

Requiere el archivo `backend/.env` con las credenciales de PostgreSQL.
"""
import csv
import sys
from pathlib import Path

# Permitir importar el paquete `app` del backend.
BACKEND = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BACKEND))

from app.core.database import SessionLocal  # noqa: E402
from app.models.frase import Frase  # noqa: E402

# Encabezados descriptivos que aparecen en algunos CSV -> nombre real de columna.
ALIAS = {
    "texto_español": "texto_es",
    "texto_aymara": "texto_ay",
    "texto_quechua": "texto_qu",
    "seccion_origen": "seccion",
}
CAMPOS = ["id", "categoria", "subcategoria", "tipo", "texto_es",
          "texto_ay", "texto_qu", "seccion", "candidato_audio"]


def a_bool(valor) -> bool:
    return str(valor).strip().upper() in ("TRUE", "1", "SI", "SÍ", "T")


def importar(csv_path: Path) -> None:
    db = SessionLocal()
    procesadas = 0
    try:
        with csv_path.open(encoding="utf-8-sig", newline="") as f:
            reader = csv.DictReader(f, delimiter=";")
            for raw in reader:
                row = {ALIAS.get(k, k): v for k, v in raw.items()}
                if not row.get("id"):
                    continue
                datos = {campo: (row.get(campo) or None) for campo in CAMPOS}
                datos["candidato_audio"] = a_bool(row.get("candidato_audio"))
                db.merge(Frase(**datos))
                procesadas += 1
            db.commit()
        print(f"OK: {procesadas} frases importadas/actualizadas desde {csv_path.name}")
    except Exception as exc:  # noqa: BLE001
        db.rollback()
        print("ERROR: se revirtió toda la importación ->", exc)
        raise
    finally:
        db.close()


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python backend/scripts/importar_frases.py <ruta_csv>")
        sys.exit(1)
    ruta = Path(sys.argv[1])
    if not ruta.exists():
        print("No existe el archivo:", ruta)
        sys.exit(1)
    importar(ruta)
