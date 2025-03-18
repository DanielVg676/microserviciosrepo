FROM node:18

WORKDIR /app

# Corregimos la copia del package.json y package-lock.json
COPY package*.json . 

RUN npm install

COPY . .

EXPOSE 3003

CMD [ "node", "index.js" ]


# Para inicializar la creacion del contenedor se configura este archivo al mismo nivel que el package json de nuestro sistema, ademas se 
# mostrara como un contenedor apartado de lo demas