---
description: >-
  Configurar una aplicación react desde cero, suele ser un dolor de cabeza. En
  esta guía seguiré los pasos necesarios para configurar una aplicación desde
  cero con webpack y babel.
---

# Configurar react desde cero con WebPack y Babel

Actualmente existen infinidad de proyectos que ofrecen un punto de partida para la configuración de una aplicación react. Realizar esta configuración desde cero es una tarea que puede llegar a ser complicada si no tiene los pasos claros. Por esta razón muchos desarrolladores utilizan generadores de aplicaciones para realizar esta tarea.

no de los generadores más utilizados es [Create react app](https://github.com/facebook/create-react-app) creado y mantenido por los desarrolladores de facebook.

Antes de iniciar con el tutorial, asegurate de tener instalado la última version de [NPM](https://www.npmjs.com/) y [NODEJS](https://nodejs.org/es/) si no la tienes, instala nodejs que ya trae integrado npm. Actualmente tengo instalado `node 10.1.0` y `npm 6.4.1`

### 1 - Directorio base de nuestra aplicación

Crear directorio del proyecto y acceder

```bash
mkdir react-desde-cero && cd $_
```

Inicializamos un proyecto de npm

```bash
npm init
```

Para evitar las preguntas del generardor de npm, utiliza:

```bash
npm init -y
```

```javascript
{
  "name": "react-webpack-babel",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Geordano Polanco (gpolanco.com)",
  "license": "MIT"
}
```

### 2 - Estructura de directorios

Utilizaremos la configuración de directorios típica de una aplicación react.

```bash
react-webpack-babel
├── package.json
└── src
   ├── index.html
   └── index.js
```

Creamos el directorio `src` además del `index.html` e `insdex.js`

En el archivo `index.html` utilizaremos un template básico para vincular el archivo `index.js.` Agregar la etiqueta `<div id="root"></div>` que utilizaremos más adelante en nuestra aplicación react.

Pega el siguiente código en el archivo `index.html`

```markup
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Config react app</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

Ya tenemos los archivos mínimos para iniciar la **configuración de una** _**aplicación react**_, ahora empezamos a agregar las dependencias necesarias

### 3 - Configurar webpack

**Instalación de dependencias**

```bash
npm install --save-dev webpack webpack-cli webpack-dev-server

# O lo mismo abreviado

npm i -D webpack webpack-cli webpack-dev-server
```

* [**webpack**](https://webpack.js.org/) El paquete principal de webpack que utilizaremos más adelante para el transpilado del código scss, jsx de la aplicación, actualmente el su versión `4.20.2`
* [**Webpack-dev-server - npm**](https://www.npmjs.com/package/webpack-dev-server) Este nos da la opción de ejecutar un servidor local en nuestro directorio. Además nos da la ventaja de ver los cambios realizados en tiempo real en el navegador. Actualmente en la versión `3.1.9`
* [W**ebpack-cli - npm**](https://www.npmjs.com/package/webpack-cli) Esta herramienta nos permite utilizar `webpack` en la linea de comando

Si comprobamos nuestro archivo `package.json`podemos notar que tenemos una nueva sección **devDependencies** donde tenemos los paquetes instalados anteriormente.

```javascript
"devDependencies": {
    "webpack": "^4.21.0",
    "webpack-cli": "^3.1.2",
    "webpack-dev-server": "^3.1.9"
}
```

Como puedes notar las dependencias instaladas están en su última versión, en la configuración de webpack **es importante la compatibilidad entre versiones**, con lo cual voy a fijar las versiones a las últimas actuales quitando este simbolo `^` de está forma las dependencias estarán en la versión indicada.

Esto lo hago por si alguien se descarga el código pasado unos meses, siga funcionando aunque esten disponibles nuevas versiones de estás dependencias. Recomiendo siempre utilizar las últimas version estables a la hora de configurar un proyecto inicial.

```javascript
"devDependencies": {
    "webpack": "^4.21.0",
    "webpack-cli": "^3.1.2",
    "webpack-dev-server": "^3.1.9"
}
```

Con las instalaciones anteriores, tenemos el directorio **node\_modules** donde se guardan todas las dependencias del proyecto y el archivo [**package-lock.json**](https://docs.npmjs.com/files/package-lock.json) utilizado por npm.

Actualmente esta es la estructura de directorios de la aplicación, después de instalar las dependencias de **webpack 4**

```bash
react-webpack-babel
├── node_modules
├── package-lock.json
├── package.json
└── src
   ├── index.html
   └── index.js
```

#### Configuración de webpack <a id="Configuraci%C3%B3n-de-webpack"></a>

Desde `webpack v4`no es necesario crear un archivo de configuración para su funcionamiento, pero, si quieres crear una configuración personalizada sólo de lo que necesitas, entonces, si es necesrio.

Actualmente tenemos instalado webpack y quiero ejecutar tanto **webpack** como **webpack-dev-server** para que notes su funcionamiento sin un archivo de configuración personalizado.

Para hacer esta prueba vamos agregar los siguientes comando en la sección `scripts` de nuestro archivo `package.json`

```javascript
"scripts": {
 "start": "webpack-dev-server --mode development --open",
 "build": "webpack --mode production"
},
```

**`npm run build`:** Al ejecutar este comando webpack utiliza su configuración predeterminada, compilará el archivo `src/index.js`, comprimiendolo en la carpeta `dist/main.js`.

**`npm start`:** Al ejecutar `npm start`, queremos que se visualize el archivo index.html localizado en la carpeta `src/index.html`pero puedes notar que nos muestra un listado de los archivos que existen en la carpeta principal del proyecto. Esto es debido a que webpack necesita un plugin adicional \([HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin) \) para procesar el HTML.

#### Configurando HTML Webpack plugin

```text
npm i --save-dev html-webpack-plugin
```

Creamos el archivo `webpack.config.js` 

> Webpack 4 establece por defecto la propiedad `entry: 'src/index.js'`  y `output: 'dist/main.js'` si tu estructura es diferente, puede modificar este funcionamiento desde el archivo de configuración.

Por ahora sólo agregamos la configuración para HTML webpack plugin.

```javascript
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");


// Webpack configuration
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html'
    })
  ]
};
```

Añade algún contenido en tu archivo index.html y ejecuta el comando npm start, podrás notar que webpack ya reconoce el HTML.

Por otro lado, si ejecutas el comando npm run build, webpack genera el directorio dist con el archivo `index.html` y la vinculación del archivo `index.js`

#### Configuración personalizada de webpack

Esta muy bien la configuración predeterminada, pero yo quiero modificar los siguientes puntos.

1. El archivo `index.html` quiero que este en `public/index.html` y no en `src`, ya que, este directorio sólo deben estar alojados los archivos .jsx de nuestra aplicación. 
2. Renombrar el archivo de salida a `main.bundle-[hash].js` más un hash auto generado, en vez de index.js. Esto lo hacemos sobre escribiendo la configuración output de webpack. 
3. Establecer el modo a development basado en la variable de entorno `process.env.NODE_ENV` de nodejs, de esta forma no tengo que agregarlo en el `package.json`

Este será el resultado las modificaciones anteriores.

```javascript
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname,'dist'),
    filename: 'main.bundle-[hash].js'
  },
  
 mode: process.env.NODE_ENV || 'development',
  
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname,'public','index.html'),
      filename: 'index.html'
    })
  ]
};
```

Puntos importantes del archivo `webpack.config.js`

1. **Entry**: Entrada de referencia para webpack, **por defecto en webpack 4** `src/index.js`
2. **Output**: Punto de salida **por defecto en webpack 4** `dist/index.js` , en nuestro caso `dist/main.bundle-[hash].js`
3. **mode**: Indica el modo en que se está ejecutando nuestra aplicación, con esto webpack sabe como compilar nuestro archivos basandose en en el modo `development` o `production` esto se puede configurar utilizando las variables de entorno de nodejs, en nuestro caso lo dejamos en modo `developer` si no existe una variable de entorno.
4. **resolve** Esto nos da la facilidad de poder utilizar importaciones con rutas relativas en ves de rutas absolutas, indicando los directorios donde buscar dichas importaciones a webpack, por ahora no lo voy a utilizar.
5. **devServer** configuración del servidor de desarrollo, lpuedes ver todas las opciones disponibles en la [documentacion de webpack dev server](https://webpack.js.org/configuration/dev-server/#devserver)

