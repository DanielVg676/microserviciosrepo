# En docker la configuracion de mi dockerfiles es diferente, ya que no es lo mismo que en Node
# Aqui es tener cuidado con la version que estaremos usando, asi que al tiro

# Usamos esta version de alpine por que nuestros contenedores estan basados en linuz y esta es la version
# que es compatible con 

# Despues configuramos el siguiente comando en la raiz del esb service para comenzar
#      "mvn clean package"

# Tambien cambiamos la dependencia del plugin en el .pom
# Si da mal el comando anteriror, error de manifest es por que falto configurar el plugin

# <plugin>
#                 <groupId>org.springframework.boot</groupId>
#             <artifactId>spring-boot-maven-plugin</artifactId>
#             </plugin>

# Terminamops configurando el servicio, es decir, lo empaquetamos con este comando:
    # docker build -t esb-service:0.0.1 .

#Usar una imagen base de nuestro java
FROM openjdk:8-jdk-alpine

#Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

#Copiar el target de la app
COPY target/*.jar app.jar

#Exponer el puerto en el que corre el servicio
EXPOSE 8001

CMD [ "java", "-jar", "app.jar" ]


# Para inicializar la creacion del contenedor se configura este archivo al mismo nivel que el package json de nuestro sistema, ademas se 
# mostrara como un contenedor apartado de lo demas