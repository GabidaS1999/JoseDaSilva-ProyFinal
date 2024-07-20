# Usar una imagen base de Node.js
FROM node:18

# Crear y establecer el directorio de trabajo en el contenedor
WORKDIR /src

# Copiar el package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el resto del código de la aplicación al contenedor
COPY . .

# Exponer el puerto en el que la aplicación escuchará
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["node", "app.js"]
