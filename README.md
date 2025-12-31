# Automatización de ETL para Reporte de Ventas

Este proyecto implementa un pipeline ETL (Extract, Transform, Load) automatizado utilizando Python. El objetivo es procesar datos crudos de ventas, limpiarlos, enriquecerlos y cargarlos en una base de datos lista para análisis.

## 🚀 Características
- **Extracción**: Ingesta de archivos CSV con datos de transacciones.
- **Transformación**:
    - Limpieza de valores nulos y duplicados.
    - Conversión de tipos de datos (fechas).
    - Cálculo de métricas derivadas (Total de Venta).
- **Carga**: Almacenamiento de datos procesados en una base de datos SQLite.
- **Validación**: Detección de registros inválidos y generación de logs.

## 🛠 Tecnologías
- **Python 3.9+**
- **Pandas**: Manipulación y análisis de datos.
- **SQLAlchemy/SQLite**: Almacenamiento persistente.
- **Logging**: Rastreo de ejecución.

## ⚙️ Cómo Ejecutar
1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   pip install -r requirements.txt
   ```
3. Ejecutar el pipeline:
   ```bash
   python etl.py
   ```
4. Verificar la base de datos `sales.db` generada.

## 📊 Estructura del Proyecto
```
etl-sales-pipeline/
├── data/               # Archivos de entrada (raw) y logs
├── etl.py              # Script principal
├── generate_data.py    # Script para generar datos de prueba
├── requirements.txt    # Dependencias
└── README.md           # Documentación
```
