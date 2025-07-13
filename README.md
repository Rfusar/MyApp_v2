![MyBadge](https://img.shields.io/badge/Version-0.0.5-purple)


<details>
<summary>Backend</summary>

For the documentation [Click here](Backend/README.md)

For the repository of the docker image [Click here](https://hub.docker.com/repository/docker/rfusaro12276/backend/general)
</details>

<details>
<summary>Frontend</summary>

For the documentation [Click here](Frontend/README.md)

For the repository of the docker image [Click here](https://hub.docker.com/repository/docker/rfusaro12276/backend/general)
</details>

## MyB2B Local
```bash
git clone git@github.com:Rfusar/MyApp_v2.git
```


## MyB2B Docker

You can use this file for calling the correct image

```yaml
version: '3.9'

services:
  db:
    image: mongo:8.0.5-rc1-noble
    container_name: mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongodb-data:/data/db
    networks:
      - app-network

  backend:
    image: rfusaro12276/backend
    ports:
      - "8080:8080"
    depends_on:
      - db
    networks:
      - app-network

  frontend:
    image: rfusaro12276/frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    networks:
      - app-network

volumes:
  mongodb-data:

networks:
  app-network:
    driver: bridge
```
