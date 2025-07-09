# Evaluación Desarrollo de Aplicaciones

Bienvenido a la evaluación de **Desarrollo de Aplicaciones**. Este proyecto consiste en dos partes, un backend y un frontend.

El proyecto se presenta "as-is", sin comentarios ni garantías de funcionamiento. Antes de comenzar, tomese su tiempo para entender el proyecto, sus dependencias, la organización del código, y como está programado.

Una vez tenga un mapa mental del código considere los siguientes enunciados y comience a trabajar, generando o arreglando el código faltante, o contestando aquí las preguntas que sean conceptuales.

---

1. ¿Cuántas líneas de código estima que ocupará el archivo `./backend/models/mascota.ts` al generar la transpilación de TS a JS? Justique su respuesta

- Ninguna línea, porque cuando TypeScript transpila a JavaScript, los tipos y las interfaces no generan ningún código JS. Simplemente desaparecen porque existen solo para comprobación en tiempo de compilación.

---

2. Si intenta correr el proyecto de backend en modo desarrollo notará que el proyecto no levanta debido a un problema en el orden en el que se hacen las cosas. Encuentre el error y solucionelo para poder levantar este proyecto.

**Backend:**

- `npm install`
- Cambios en el `.env` → nombre y `MONGO_URI` estaban erróneos.
- Cambios en el controller → las líneas que están por fuera del controller (como la creación del repositorio) se ejecutan automáticamente al importar el módulo, incluso antes de que la conexión a Mongo esté lista, lo cual genera error. Por eso deben ir dentro del constructor, así se ejecutan cuando se crea el controller y no antes.

**Frontend:**

- `npm install`
- Cambios en el nombre del `.env`

---

3. Al levantar ambos proyectos y cargar la página e intentar borrar un elemento, el código no pareciera estar borrando de forma apropiada. Averigue el motivo y solucione el problema.

**Frontend:**

- Se eliminó el *handleBorrar* de `MascotasRow.tsx` junto con el *navigate* que no eran necesarios.
- Al botón *Borrar* se le agregó la llamada al prop onBorrar.

---

4. Al igual que antes, el programa falla al intentar editar un elemento. Averigue el motivo y solucione el problema.

**Backend (`mascotas.repository.ts`):**

- Cuando se usa `findOneAndUpdate()` en MongoDB, el documento que se pasa como actualización (`$set: data`) no puede incluir el campo `_id`, porque es inmutable.  
- Aunque solo se pase sin querer modificarlo, Mongo lo interpreta como una modificación y lanza un error.
- Se resolvió eliminando explícitamente el campo `_id` del objeto `data` antes de realizar la actualización.

---

5. En el frontend ya hay una base de código para agregar la funcionalidad de "adoptar una mascota". Adoptar una mascota significa cambiarle el estado de EN_ADOPCION a ADOPTADA. Complete el código de las formas que considere necesarias para soportar este comportamiento de forma completa.

Se necesita agregar un `handleAdoptar` para asignarlo al botón y que funcione correctamente.

**En `MascotasRow`:**

- Agregar una nueva prop `onAdoptar`.
- Cambiar el `onClick` del botón para que llame a `onAdoptar`.

**En `MascotasListPage`:**

- Crear el nuevo handler `handleAdoptar`.
- Pasarlo como prop al componente `MascotasTable`.

**En `MascotasTable`:**

- Agregar la prop `onAdoptarUno` y asignarla a cada fila correspondiente.
