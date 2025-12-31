# Usar una imagen base ligera de Python
FROM python:3.9-slim

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias e instalar
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código
COPY . .

# Crear directiorio para datos
RUN mkdir -p data

# Comando por defecto: Ejecutar todo el pipeline
CMD ["sh", "-c", "python generate_data.py && python etl.py && python visualize.py"]
