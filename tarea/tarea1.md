# Preparación del entorno de desarrollo

Esta documentación describe los pasos necesarios para preparar el entorno de desarrollo utilizando:

* **WSL + Ubuntu**
* **Docker**
* **Python 3.14.7**
* **pyenv**
* **Entorno virtual de Python (`venv`)**
* **Jupyter Notebook**

---
## Requisitos previos
Antes de comenzar, asegúrate de contar con:
* Windows 10/11
* Permisos de administrador
* Conexión a Internet
* PowerShell
* WSL 
---

# 1. Instalación de Ubuntu mediante WSL
WSL permite ejecutar un entorno Linux directamente dentro de Windows.
### 1.1 Verificar las distribuciones disponibles

Abre **PowerShell como administrador** y ejecuta:

```powershell
wsl.exe --list --online
```
Este comando muestra las distribuciones de Linux disponibles para instalar.
En este caso utilizaremos **Ubuntu**.

### 1.2 Instalar Ubuntu
Ejecuta:
```powershell
wsl.exe --install -d Ubuntu
```
Una vez finalizada la instalación, es posible que Windows solicite reiniciar el equipo.

### 1.3 Iniciar Ubuntu
Puedes abrir **Ubuntu** desde el menú Inicio de Windows o iniciar WSL desde PowerShell con el siguiente comando:
```powershell
wsl
```
Una vez dentro de Ubuntu, ya podemos continuar con la configuración del entorno.
---

# 2. Instalación de Docker

Docker permite ejecutar aplicaciones y servicios dentro de contenedores, facilitando la creación de entornos consistentes y reproducibles.

## 2.1 Eliminar versiones anteriores

Dentro de Ubuntu, ejecuta:

```bash
sudo apt remove $(dpkg --get-selections docker.io docker-compose docker-compose-v2 docker-doc docker-buildx podman-docker containerd runc | cut -f1)
```

> Si algunos paquetes no están instalados, pueden aparecer mensajes indicando que no fueron encontrados. Esto no necesariamente significa que exista un problema.

---

## 2.2 Configurar el repositorio oficial de Docker

Actualizar los paquetes:

```bash
sudo apt update
```

Instalar los paquetes necesarios:

```bash
sudo apt install ca-certificates curl
```

Crear el directorio para las claves:

```bash
sudo install -m 0755 -d /etc/apt/keyrings
```

Agregar la clave GPG oficial de Docker:

```bash
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  -o /etc/apt/keyrings/docker.asc
```

Asignar permisos de lectura:

```bash
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

Agregar el repositorio oficial de Docker:

```bash
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF
```

Actualizar nuevamente los repositorios:

```bash
sudo apt update
```

---

## 2.3 Instalar Docker Engine

Instalar Docker y sus componentes:

```bash
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

---

## 2.4 Verificar la instalación

Comprobar el estado del servicio:

```bash
sudo systemctl status docker
```

También puedes verificar que Docker funcione correctamente ejecutando:

```bash
sudo docker run hello-world
```

Si la instalación fue correcta, Docker mostrará un mensaje de bienvenida indicando que el contenedor se ejecutó correctamente.

---

# 3. Configurar Docker para ejecutarlo sin `sudo`

Por defecto, Docker puede requerir permisos de administrador. Para poder utilizar el comando `docker` directamente con nuestro usuario, agregaremos el usuario al grupo `docker`.

Crear el grupo:

```bash
sudo groupadd docker
```

Agregar el usuario actual al grupo:

```bash
sudo usermod -aG docker $USER
```

Aplicar los cambios en la sesión actual:

```bash
newgrp docker
```

Verificar nuevamente que Docker funcione sin `sudo`:

```bash
docker run hello-world
```

Si el comando funciona correctamente, Docker ya puede utilizarse sin escribir `sudo`.

---

# 4. Instalación de Python mediante pyenv

Para administrar diferentes versiones de Python utilizaremos **pyenv**.

## 4.1 Instalar las dependencias necesarias

Ejecuta:

```bash
sudo apt install -y \
  make \
  build-essential \
  libssl-dev \
  zlib1g-dev \
  libbz2-dev \
  libreadline-dev \
  libsqlite3-dev \
  curl \
  llvm \
  libncursesw5-dev \
  xz-utils \
  tk-dev \
  libxml2-dev \
  libxmlsec1-dev \
  libffi-dev \
  liblzma-dev
```

---

## 4.2 Clonar pyenv

Clonar el repositorio de pyenv en nuestro directorio personal:

```bash
git clone https://github.com/pyenv/pyenv.git ~/.pyenv
```

Comprobar que el directorio se haya creado correctamente:

```bash
ls ~/.pyenv
```

---

## 4.3 Configurar pyenv

> **Nota:** Los siguientes comandos configuran pyenv para **Zsh**. Si tu Ubuntu utiliza Bash como shell predeterminado, será necesario configurar el archivo correspondiente (`~/.bashrc`) en lugar de `~/.zshrc`.

Agregar la configuración al archivo `.zshrc`:

```bash
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init - zsh)"' >> ~/.zshrc
```

Recargar la configuración:

```bash
source ~/.zshrc
```

Verificar la instalación:

```bash
pyenv --version
```

---

# 5. Instalar Python 3.14.7

Consultar las versiones disponibles de Python 3.14:

```bash
pyenv install --list | grep " 3.14"
```

Instalar Python 3.14.7:

```bash
pyenv install 3.14.7
```

Comprobar las versiones instaladas:

```bash
pyenv versions
```

Deberías observar una salida similar a:

```text
* system
  3.14.7
```

---

## 5.1 Establecer Python 3.14.7 como versión global

Ejecuta:

```bash
pyenv global 3.14.7
```

Actualizar los ejecutables de pyenv:

```bash
pyenv rehash
```

Verificar la versión de Python:

```bash
python --version
```

El resultado esperado es:

```text
Python 3.14.7
```

---

# 6. Crear el workspace

Crearemos un directorio donde se almacenarán los notebooks y archivos relacionados con el proyecto.

Crear el directorio:

```bash
mkdir -p ~/jupyter
```

Entrar al directorio:

```bash
cd ~/jupyter
```

Comprobar nuevamente la versión de Python:

```bash
python --version
```

Debe mostrar:

```text
Python 3.14.7
```

---

# 7. Crear un entorno virtual

Es recomendable utilizar un entorno virtual para mantener aisladas las dependencias del proyecto.

Crear el entorno virtual:

```bash
python -m venv .venv
```

Activar el entorno:

```bash
source .venv/bin/activate
```

Una vez activado, la terminal debería mostrar `(.venv)` al inicio de la línea.

Ejemplo:

```text
(.venv) usuario@ubuntu:~/jupyter$
```

---

# 8. Instalar Jupyter Notebook

Con el entorno virtual activado, actualizar `pip`:

```bash
python -m pip install --upgrade pip
```

Instalar Jupyter Notebook:

```bash
pip install notebook
```

Instalar el kernel de Python:

```bash
pip install ipykernel
```

---

# 9. Iniciar Jupyter Notebook

Para iniciar Jupyter Notebook, ejecuta:

```bash
jupyter notebook
```

Jupyter iniciará un servidor local y normalmente mostrará una URL similar a:

```text
http://localhost:8888/tree?token=...
```

Copia la URL mostrada en la terminal y ábrela en tu navegador.

---

# 10. Verificación final

Para comprobar que todo el entorno está configurado correctamente:

### Ubuntu / WSL

```bash
wsl --version
```

### Docker

```bash
docker --version
```

### Docker funcionando

```bash
docker run hello-world
```

### Python

```bash
python --version
```

Resultado esperado:

```text
Python 3.14.7
```

### Entorno virtual

La terminal debe mostrar:

```text
(.venv)
```

### Jupyter

```bash
jupyter --version
```

Finalmente:

```bash
jupyter notebook
```

Si Jupyter Notebook se abre correctamente en el navegador, el entorno está listo.

---


#  Resultado

Al finalizar esta configuración tendremos un entorno de desarrollo en el navegador:

![Entorno de desarrollo](img/Entorno.png)
Con esto, el entorno estará preparado para trabajar con **Python, Jupyter Notebook y Docker** desde Ubuntu mediante WSL.

