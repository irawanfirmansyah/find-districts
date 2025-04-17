# Find Districts Application

This repository contains a simple application designed to find district names. It is built using the following technologies:

- **Backend (BE):** Laravel v10
- **Frontend (FE):** React v19 + Vite 
- **Database:** MySQL v8

## Getting Started

To run this project in **DEV ENVIRONMENT**, ensure that Docker is installed on your machine. Then, execute the following command:

```bash
docker-compose up --build (add `-d` to run in detach mode)
```

when docker finishes put every containers in running state, you can open the app in: [localhost](http://localhost:3000).

Once you finish exploring the application, it is recommended to execute this command to shut down the app and clean up volumes:

```bash
docker-compose down -v
```

## Application Ports

Below are the list of application ports that will be used:

- **Backend (Laravel):** `8000`  
- **Frontend (React + Vite):** `3000`  
- **MySQL Database:** `3306`

Enjoy exploring district names with this application!  

## Acknowledgment

This application utilizes a copy of software from [Wilayah Administrasi Indonesia](https://github.com/guzfirdaus/Wilayah-Administrasi-Indonesia). We extend our gratitude to the contributors of this repository.