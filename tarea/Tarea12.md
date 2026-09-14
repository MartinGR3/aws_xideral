# Base de Datos Librería

## Descripción

Esta Tarea consiste en la creación y manipulación de una base de datos llamada **`libreria`**, utilizando **MySQL**.

Se creó una tabla llamada **`libros_martin`** para almacenar información de diferentes libros y posteriormente se realizaron diferentes consultas SQL para practicar operaciones de selección, filtrado, ordenamiento, agrupación, búsqueda y actualización de datos.

---

# Objetivo

El objetivo de esta actividad es practicar los conceptos básicos de SQL:

* Creación de tablas.
* Llaves primarias y autoincrementales.
* Inserción de registros.
* Consultas `SELECT`.
* Filtrado mediante `WHERE`.
* Búsquedas con `LIKE`.
* Ordenamiento con `ORDER BY`.
* Funciones de agregación como `AVG()` y `COUNT()`.
* Agrupación mediante `GROUP BY`.
* Actualización de registros mediante `UPDATE`.

---

##  Base de datos

La base de datos utilizada es:

```sql
USE libreria;
```

---

## 📋 Estructura de la tabla

La tabla creada es **`libros_martin`**.

| Campo             | Tipo         | Descripción                        |
| ----------------- | ------------ | ---------------------------------- |
| `libro_id`        | INT          | Identificador único del libro      |
| `titulo`          | VARCHAR(200) | Título del libro                   |
| `autor`           | VARCHAR(150) | Autor del libro                    |
| `genero`          | VARCHAR(100) | Género literario                   |
| `ano_publicacion` | INT          | Año de publicación                 |
| `numero_paginas`  | INT          | Número de páginas                  |
| `calificacion`    | DECIMAL(3,1) | Calificación del libro             |
| `disponible`      | BOOLEAN      | Indica si el libro está disponible |

`libro_id` funciona como **llave primaria** y utiliza `AUTO_INCREMENT`, por lo que su valor se genera automáticamente.

---

##  Datos insertados

Se agregaron **10 libros** de diferentes géneros y años de publicación:

| Libro                              | Autor                    | Género          |  Año | Páginas | Calificación | Disponible |
| ---------------------------------- | ------------------------ | --------------- | ---: | ------: | -----------: | ---------- |
| Cien años de soledad               | Gabriel García Márquez   | Realismo mágico | 1967 |     417 |          9.5 | Sí         |
| 1984                               | George Orwell            | Ciencia ficción | 1949 |     328 |          9.0 | Sí         |
| El principito                      | Antoine de Saint-Exupéry | Fantasía        | 1943 |      96 |          9.2 | Sí         |
| Harry Potter y la piedra filosofal | J.K. Rowling             | Fantasía        | 1997 |     309 |          9.4 | No         |
| El código Da Vinci                 | Dan Brown                | Misterio        | 2003 |     656 |          8.5 | Sí         |
| Los juegos del hambre              | Suzanne Collins          | Distopía        | 2008 |     374 |          8.7 | Sí         |
| Don Quijote de la Mancha           | Miguel de Cervantes      | Clásico         | 1605 |     863 |          9.3 | No         |
| It                                 | Stephen King             | Terror          | 1986 |    1138 |          8.6 | Sí         |
| Sapiens                            | Yuval Noah Harari        | Historia        | 2011 |     496 |          8.8 | Sí         |
| El Hobbit                          | J.R.R. Tolkien           | Fantasía        | 1937 |     310 |          9.1 | No         |

---

# Consultas realizadas

### 1. Mostrar todos los libros

```sql
SELECT * FROM libros_martin;
```

Permite visualizar todos los registros y columnas de la tabla.

---

### 2. Mostrar título, autor y género

```sql
SELECT titulo, autor, genero
FROM libros_martin;
```

Muestra únicamente la información solicitada.

---

### 3. Mostrar libros disponibles

```sql
SELECT *
FROM libros_martin
WHERE disponible = TRUE;
```

Filtra los libros que actualmente están disponibles.

---

### 4. Buscar libros de un género específico

En este caso se buscaron libros de **Fantasía**:

```sql
SELECT *
FROM libros_martin
WHERE genero = 'Fantasía';
```

---

### 5. Mostrar libros publicados después del año 2000

```sql
SELECT *
FROM libros_martin
WHERE ano_publicacion > 2000;
```

Permite encontrar libros publicados a partir del año 2001.

---

### 6. Mostrar libros con calificación mayor a 8

```sql
SELECT *
FROM libros_martin
WHERE calificacion > 8;
```

Muestra los libros que tienen una calificación superior a 8.

---

### 7. Ordenar libros del más reciente al más antiguo

```sql
SELECT *
FROM libros_martin
ORDER BY ano_publicacion DESC;
```

`DESC` ordena los años de manera descendente.

---

### 8. Mostrar el libro con mayor calificación

```sql
SELECT *
FROM libros_martin
ORDER BY calificacion DESC
LIMIT 1;
```

Ordena los libros por calificación y muestra únicamente el primero.

---

### 9. Calcular el promedio de páginas

```sql
SELECT AVG(numero_paginas) AS promedio_paginas
FROM libros_martin;
```

Utiliza la función `AVG()` para calcular el promedio de páginas de todos los libros.

---

### 10. Contar libros por género

```sql
SELECT genero, COUNT(*) AS cantidad_libros
FROM libros_martin
GROUP BY genero;
```

Agrupa los libros por género y cuenta cuántos existen en cada uno.

---

### 11. Buscar libros utilizando `LIKE`

Se buscaron títulos que contienen la palabra **"El"**:

```sql
SELECT *
FROM libros_martin
WHERE titulo LIKE '%El%';
```

El símbolo `%` permite encontrar la palabra aunque existan otros caracteres antes o después.

---

### 12. Cambiar un libro de disponible a no disponible

Se actualizó el estado del libro **Sapiens**:

```sql
UPDATE libros_martin
SET disponible = FALSE
WHERE titulo = 'Sapiens';
```

Esta consulta modifica el valor de `disponible` de `TRUE` a `FALSE`.

---

## Tecnologías utilizadas

* **MySQL**
* **SQL**
* **DBeaver**
* **Git / GitHub**

---

## Conclusión

Esta actividad me permitió reforzar mis conocimientos de SQL mediante la creación y manipulación de una base de datos. Practiqué diferentes operaciones, como mostrar, filtrar, buscar, ordenar, agrupar, contar, calcular promedios y actualizar registros. 
