# **Psyderalis/DEV002-md-links** 🔗

### Índice

 [1. Descripción](#1-descripción)

 [2. Instalación](#2-instalación)

 [3. Uso](#3-uso)

***

## **1. Descripción**
Este módulo busca en directorios y subdirectorios archivos en formato Markdown, luego los lee y analiza, para verificar el estado de los links que contengan y reportar algunas estadísticas. 

## **2. Instalación**

 1. Debes tener tu proyecto inicializado ([npm init]("https://docs.npmjs.com/cli/v9/commands/npm-init")).
 2. Ejecuta en la terminal:
 `npm install Psyderalis/DEV002-md-links`

## **3. Uso**

### **Ejecutable**
Desde la terminal ejecuta el comando:

`node cli.js <path-to-file> [options]`

- `<path-to-file>` : puede ser una ruta absoluta o relativa, hacia un archivo o carpeta.

**El comportamiento por defecto** -> Obtiene una matriz con información de los links.

- `[options]` : 

**--validate** -> Obtiene una matriz con información de los links y sus status.

**--stats** -> Obtiene links totales y links únicos.

**--validate --stats** -> Obtiene links totales, links únicos y links rotos.

## **Interfaz**

##### `mdLinks(path, options)`
Puede importarse con `require`.


#### - Argumentos
* `path`: Ruta **absoluta** o **relativa** al **archivo** o **directorio**.

* `options`: { validate : false } || { validate : true }

#### - Valor de retorno
Promesa.

Para `{ validate : false }` : Array de objetos, cada uno representa un link con su información respectiva.

Para `{ validate : true }` : Array de objetos, cada uno representa un link con su información respectiva y status a partir de consulta http.
