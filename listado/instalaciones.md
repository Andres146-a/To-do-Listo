
# Instalaciones 

## Pasos para instalar 

1. Instalar Node.js (incluye npm)
2. Instalar TypeScript 
3. Inicializar tu proyecto con npm init. 
4. Instalar Express como dependencia del proyecto. 
5. Configurar TypeScript en el proyecto.



## Node.js
### Se verifica si ya tiene instalado Node.js (incluye npm) 
```  
    node -v  en mi caso si lo tengo instalado.
    npm -v   ""
```
## TypeScript

### Se verifica si ya tiene instalado typescript 

``` 
tsc --version
``` 
### Caso contrario se instala typescript : 
``` 
npm install -g typescript
``` 
### Inicializar el proyecto de Node.js : 
``` 
npm init -y
``` 
### Instalar Express : 
``` 
npm install express
``` 
### Configurarr TypeScript en el proyecto : 
#### Crea un archivo tsconfig.json:
```
tsc --init
```
#### Instala los tipos de Express para TypeScript:
```
npm install @types/express --save-dev
```