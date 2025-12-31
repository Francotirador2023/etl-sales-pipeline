import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

def generate_sales_data(num_rows=1000):
    print("Generando datos de prueba...")
    
    # 1. Generar fechas
    start_date = datetime(2024, 1, 1)
    dates = [start_date + timedelta(days=random.randint(0, 365)) for _ in range(num_rows)]
    
    # 2. Productos y Precios
    products = {
        'Laptop': 1200.00,
        'Mouse': 25.50,
        'Teclado': 45.00,
        'Monitor': 300.00,
        'USB': 10.00,
        'Headset': 80.00
    }
    
    product_list = list(products.keys())
    data = []
    
    for date in dates:
        product_name = random.choice(product_list)
        price = products[product_name]
        
        # Introducir algo de aleatoriedad/ruido en los precios
        if random.random() < 0.05:
            price = None # Precio faltante
            
        quantity = random.randint(1, 10)
        
        # Introducir errores en cantidades
        if random.random() < 0.02:
            quantity = -1 * quantity # Cantidad negativa (error)
            
        row = {
            'transaction_id': str(random.randint(10000, 99999)),
            'date': date.strftime('%Y-%m-%d'),
            'product': product_name,
            'price': price,
            'quantity': quantity,
            'region': random.choice(['Norte', 'Sur', 'Este', 'Oeste'])
        }
        
        # Introducir duplicados
        if random.random() < 0.05:
            data.append(row)
            
        data.append(row)

    df = pd.DataFrame(data)
    
    # Guardar CSV sucio
    output_path = 'data/raw_sales.csv'
    df.to_csv(output_path, index=False)
    print(f"Archivo generado: {output_path} ({len(df)} registros)")

if __name__ == "__main__":
    generate_sales_data()
