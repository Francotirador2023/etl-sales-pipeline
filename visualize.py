import sqlite3
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Configuración de estilo
sns.set_theme(style="whitegrid")
output_dir = 'data/plots'
os.makedirs(output_dir, exist_ok=True)

def generate_plots():
    print("Generando visualizaciones...")
    
    try:
        db_path = 'data/sales.db'
        if not os.path.exists(db_path):
            raise FileNotFoundError(f"No se encontró la base de datos {db_path}. Ejecuta etl.py primero.")
            
        conn = sqlite3.connect(db_path)
        df = pd.read_sql_query("SELECT * FROM sales_clean", conn)
        conn.close()
        
        if df.empty:
            print("Base de datos vacía. No se pueden generar gráficos.")
            return

        # 1. Ventas Totales por Región
        plt.figure(figsize=(10, 6))
        region_sales = df.groupby('region')['total_amount'].sum().sort_values(ascending=False).reset_index()
        sns.barplot(data=region_sales, x='region', y='total_amount', palette='viridis')
        plt.title('Ventas Totales por Región')
        plt.ylabel('Monto Total ($)')
        plt.xlabel('Región')
        plt.savefig(f'{output_dir}/ventas_por_region.png')
        plt.close()
        print(f"Gráfico generado: {output_dir}/ventas_por_region.png")

        # 2. Top 5 Productos más Vendidos (Cantidad)
        plt.figure(figsize=(10, 6))
        top_products = df.groupby('product')['quantity'].sum().sort_values(ascending=False).head(5).reset_index()
        sns.barplot(data=top_products, y='product', x='quantity', hue='product', palette='magma')
        plt.title('Top 5 Productos más Vendidos (Unidades)')
        plt.ylabel('Producto')
        plt.xlabel('Cantidad Vendida')
        plt.savefig(f'{output_dir}/top_productos.png')
        plt.close()
        print(f"Gráfico generado: {output_dir}/top_productos.png")

        # 3. Evolución de Ventas (Mensual)
        plt.figure(figsize=(12, 6))
        df['date'] = pd.to_datetime(df['date'])
        monthly_sales = df.set_index('date').resample('ME')['total_amount'].sum().reset_index() # Updated from 'M' to 'ME' for future compatibility
        sns.lineplot(data=monthly_sales, x='date', y='total_amount', marker='o', linewidth=2.5)
        plt.title('Evolución Mensual de Ventas')
        plt.ylabel('Ventas ($)')
        plt.xlabel('Fecha')
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.savefig(f'{output_dir}/evolucion_ventas.png')
        plt.close()
        print(f"Gráfico generado: {output_dir}/evolucion_ventas.png")
        
        print("Visualización completada exitosamente.")

    except Exception as e:
        print(f"Error generando gráficos: {e}")

if __name__ == "__main__":
    generate_plots()
