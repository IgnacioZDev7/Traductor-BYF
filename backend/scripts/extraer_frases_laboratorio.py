# -*- coding: utf-8 -*-
"""Extrae los bloques de procedimientos de laboratorio de `traducciones.docx`
a un CSV borrador, alineando español/aymara/quechua viñeta por viñeta.

- Cada viñeta/instrucción = una frase (se respeta el documento, no se normaliza).
- Filas SIN traducción real (es == ay == quechua) se EXCLUYEN y se documentan.
- Filas con viñetas desparejas se marcan `REVISAR` para validación humana.

Uso: ejecutar desde la raíz del repo. Requiere `python-docx`.
"""
import csv
import re
from pathlib import Path

import docx

DOCX = Path("docs/traducciones/traducciones.docx")
OUT_CSV = Path("docs/traducciones/frases_laboratorio_borrador.csv")
OUT_DOC = Path("docs/traducciones/irregularidades-traduccion.md")
ID_START = 157  # las 156 frases actuales llegan hasta PHR-0156

# Índice de tabla en el docx -> subcategoría
LAB_TABLES = {
    13: "examen_orina_detecta",
    14: "muestra_orina_envase",
    15: "muestra_orina_procedimiento",
    16: "muestra_heces",
    17: "muestra_flujo_vaginal",
    18: "perfil_lipidico",
    19: "muestras_sangre",
    20: "biologia_molecular",
    21: "indicaciones_generales",
}


def clean(text: str) -> str:
    text = text.replace("(AYMARA)", "").replace("(QUECHUA)", "")
    return re.sub(r"\s+", " ", text).strip()


def norm(text: str) -> str:
    return clean(text).lower()


def extract():
    doc = docx.Document(str(DOCX))
    kept, sin_traduccion, revisar = [], [], []

    for ti, sub in LAB_TABLES.items():
        table = doc.tables[ti]
        ncol = len(table.columns)
        for row in table.rows:
            cells = [c.text.strip() for c in row.cells]
            # tablas de 4 columnas: la col 0 es una etiqueta (PRUEBA/PANEL)
            es, ay, qu = (cells[1], cells[2], cells[3]) if ncol >= 4 else (cells[0], cells[1], cells[2])
            if es.strip().upper() in ("ESPAÑOL", "ESPANOL") or not es.strip():
                continue

            es_lines = [x for x in es.split("\n") if x.strip()]
            ay_lines = [x for x in ay.split("\n") if x.strip()]
            qu_lines = [x for x in qu.split("\n") if x.strip()]

            if len(es_lines) == len(ay_lines) == len(qu_lines) >= 1:
                items = [
                    (clean(es_lines[i]), clean(ay_lines[i]), clean(qu_lines[i]), "ok")
                    for i in range(len(es_lines))
                ]
            else:
                estado = "REVISAR(%d-%d-%d)" % (len(es_lines), len(ay_lines), len(qu_lines))
                items = [(clean(es.replace("\n", " ")), clean(ay.replace("\n", " ")),
                          clean(qu.replace("\n", " ")), estado)]

            for e, a, q, estado in items:
                if norm(e) == norm(a) == norm(q):  # sin traducción real
                    sin_traduccion.append((sub, e))
                    continue
                tipo = "pregunta" if e.startswith("¿") else "instruccion"
                kept.append([sub, tipo, e, a, q, estado])
                if estado != "ok":
                    revisar.append((sub, e, estado))

    return kept, sin_traduccion, revisar


def write_csv(kept):
    OUT_CSV.parent.mkdir(parents=True, exist_ok=True)
    with OUT_CSV.open("w", encoding="utf-8", newline="") as f:
        w = csv.writer(f, delimiter=";")
        w.writerow(["id", "categoria", "subcategoria", "tipo", "texto_es",
                    "texto_ay", "texto_qu", "seccion", "candidato_audio", "estado_alineacion"])
        for i, (sub, tipo, e, a, q, estado) in enumerate(kept):
            w.writerow(["PHR-%04d" % (ID_START + i), "laboratorio", sub, tipo,
                        e, a, q, "laboratorio", "FALSE", estado])


def write_doc(sin_traduccion, revisar):
    with OUT_DOC.open("w", encoding="utf-8") as f:
        f.write("# Irregularidades de traducción — bloques de laboratorio\n\n")
        f.write("Respaldo generado desde `traducciones.docx`. Documenta dónde el documento "
                "fuente entregado por BYF tiene huecos o inconsistencias de traducción, "
                "para sustentar cualquier observación o reclamo.\n\n")

        f.write("## 1. Ítems SIN traducción (excluidos de la base)\n\n")
        f.write("El documento fuente NO tradujo estos ítems (español = aymara = quechua). "
                "Son nombres de exámenes de laboratorio. Se excluyen por no aportar traducción.\n\n")
        for sub, e in sin_traduccion:
            f.write("- **%s**: %s\n" % (sub, e))

        f.write("\n## 2. Filas con alineación dudosa (marcadas `REVISAR`)\n\n")
        f.write("El docx trae estas celdas con viñetas desparejas o columnas cruzadas. "
                "La correspondencia español/aymara/quechua debe confirmarla un hablante "
                "(la Dra.) antes de importar.\n\n")
        for sub, e, estado in revisar:
            f.write("- **%s** `[%s]`: %s\n" % (sub, estado, e[:90]))


if __name__ == "__main__":
    kept, sin_traduccion, revisar = extract()
    write_csv(kept)
    write_doc(sin_traduccion, revisar)
    print("CSV borrador:", OUT_CSV, "->", len(kept), "frases",
          "(PHR-%04d..PHR-%04d)" % (ID_START, ID_START + len(kept) - 1))
    print("Excluidas sin traducción:", len(sin_traduccion))
    print("Marcadas REVISAR:", len(revisar))
