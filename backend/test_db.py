from app.core.database import engine
from sqlalchemy import text

try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        print("\n✅ ¡Conexión a PostgreSQL (traductor_medico) establecida exitosamente!")
except Exception as e:
    print(f"\n❌ Error al conectar a la base de datos: {e}")
