# discord-bot-admin
## bot de discord para la famafia

## Setup del proyecto
### Descargar Node
#### Descargar NVM (Recomendado)
Para Linux/Unix correr el siguiente cUrl:

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

Luego actualizamos node con el siguiente comando

    nvm install node


#### Descargar con .tar.gz
- Descargar [nodejs](https://nodejs.org/en)


Para Windows:
- Descargar [nodejs](https://nodejs.org/en)

### Instalar Paquetes
Instalaremos las dependencias del proyecto con `npm install`

## Correr el Bot
### Registrar comandos
Cuando se agrega un comando, primero debe de ser registrado en Discord corriendo el usando deploy-commands. Si no se corre, los comandos no seran agregados.
Comando para ejecutar el registro es:

    node deploy-commands.js
### Correr el bot
Para corre el bot se debe ejecutar lo siguiente y dejar corriendo:

    npm run start

## Documentacion
Un bot de discord para el servidor de discord de la famafia, usando [discord.js](https://discord.js.org/docs/packages/core/1.0.1)

### Paquetes
- `discord.js` : Interaccion con la API discord
- `dotenv` : Interaccion con archivos .env 
