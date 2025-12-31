import pandas as pd
import sqlite3
import logging
from datetime import datetime
import os

# Configuración de Logging
logging.basicConfig(
    filename='data/etl_process.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def run_etl():
    print("Iniciando proceso ETL...")
    logging.info("ETL Started")
    
    # --- 1. EXTRACT ---
    try:
        input_file = 'data/raw_sales.csv'
        if not os.path.exists(input_file):
            raise FileNotFoundError(f"No se encontró el archivo {input_file}")
            
        df = pd.read_csv(input_file)
        logging.info(f"Data extracted successfully. Rows: {len(df)}")
        print(f"Datos extraídos: {len(df)} filas")
        
    except Exception as e:
        logging.error(f"Error extracting data: {e}")
        return

    # --- 2. TRANSFORM ---
    try:
        initial_count = len(df)
        
        # a. Eliminar duplicados
        df = df.drop_duplicates()
        print(f"Duplicados eliminados: {initial_count - len(df)}")
        logging.info(f"Removed {initial_count - len(df)} duplicates")
        
        # b. Manejo de Nulos (Precios)
        # Rellenar precios nulos con el promedio de ese producto
        df['price'] = df.groupby('product')['price'].transform(lambda x: x.fillna(x.mean()))
        
        # c. Validar Cantidades (Eliminar negativos)
        df = df[df['quantity'] > 0]
        
        # d. Convertir Fechas
        df['date'] = pd.to_datetime(df['date'])
        
        # e. Enriquecimiento: Calcular Total
        df['total_amount'] = df['quantity'] * df['price']
        
        logging.info("Transformation completed successfully")
        print("Transformación completada.")
        
    except Exception as e:
        logging.error(f"Error transforming data: {e}")
        return

    # --- 3. LOAD ---
    try:
        db_path = 'data/sales.db'
        conn = sqlite3.connect(db_path)
        
        # Guardar en tabla 'sales_clean'
        df.to_sql('sales_clean', conn, if_exists='replace', index=False)
        
        conn.close()
        logging.info(f"Data loaded to SQLite: {db_path}")
        print(f"Datos cargados exitosamente en {db_path}")
        
    except Exception as e:
        logging.error(f"Error loading data: {e}")
        return
        
    print("ETL Finalizado con Éxito.")

if __name__ == "__main__":
    run_etl()
