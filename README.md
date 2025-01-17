# LerMicroservice
Este projecto esta desarrollado con express y node.js, cuenta con una imagen la cual contiene postgreSQL por lo cual solo es necesario levantar el contenedor para poder interactuar con el microservicio



## Dependencias
Para ejecutar el projecto se deben instalar las dependencias

```bash
npm install
```

En el repositorio hay un archivo llamado .env.example renombrarlo a .env

## Ejecutar el proyecto

Una vez que todas las dependencias estén instaladas, puedes iniciar el servidor de desarrollo ejecutando:

```bash
docker-compose up --build
```

Tambien es posible la ejecucion del proyecto sin docker ejecutando el comando 
```bash
npm start
```

Para esto contar con postgreSQL y configurar los datos del .env 

Esto debería iniciar la aplicación en el servidor local. Por lo general, la aplicación estará disponible en http://localhost:3001/. y es la url que esta configurada en el front por favor no modificar el puerto


## Test unitarios
Para ejecurar los comando de pruebas unitarias ejecute el siguiente comando
```bash
npm run test
```

## Adicional 
Este proyecto cuenta con un folder de migraciones el cual cuenta con el codigo necesario para crear la tabla Users, adicionalmente si la tabla se encuentra vacia este tambien cuanta con el codigo para realizar inserciones en la tabla haciendo posible al cliente ver informacion ya que el servicio back solo cuenta con el siguiente endpoint GET  http://localhost:3001/api/data
