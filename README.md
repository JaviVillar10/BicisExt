# 🚴 BicisExt

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E)

**BicisExt** es una aplicación comunitaria diseñada para los apasionados del ciclismo en Extremadura. La plataforma permite a los usuarios diseñar y compartir sus propias rutas, unirse a las salidas creadas por otros ciclistas y fomentar un entorno seguro y de compañerismo a través de un sistema de historial y valoraciones personales.

## ✨ Características Principales
* **🗺️ Creación y Exploración de Rutas:** Diseña tus propios recorridos por Extremadura o explora el mapa para unirte a las rutas creadas por otros usuarios.
* **⭐ Sistema de Valoración:** Califica a los compañeros de ruta tras finalizar el recorrido para construir una comunidad basada en el respeto y las buenas prácticas.
* **📊 Historial Personalizado:** Registro detallado de todas las rutas en las que has participado, con estadísticas de rendimiento y kilómetros recorridos.
* **👥 Comunidad Activa:** Sistema de participación que permite ver quién asistirá a cada ruta y organizar grupos ciclistas fácilmente.
* **📱 Diseño Responsivo y Accesible:** Interfaz adaptada a dispositivos móviles para que puedas consultar o crear rutas desde cualquier lugar.

## 🛠️ Tecnologías
**Frontend:**
* **Core:** React (v18+) + Vite + JavaScript (ES6+).
* **Enrutamiento:** React Router DOM para una navegación SPA fluida.
* **Estilos:** Tailwind CSS (Enfoque Utility-First).
* **Mapas:** Integración de API de mapas (ej. Mapbox / Google Maps) para la visualización de rutas.

**Backend & Infraestructura (Serverless):**
* **Base de Datos:** PostgreSQL (Gestionado en Supabase).
* **Autenticación:** Supabase Auth para registro de usuarios seguro.
* **Despliegue:** Vercel (CI/CD) con red CDN global.

## 🗄️ Modelo de Datos
La arquitectura relacional en PostgreSQL garantiza la correcta gestión de los usuarios, rutas y valoraciones:

1. `usuarios`: Perfiles de ciclistas, estadísticas generales y credenciales.
2. `rutas`: Detalles de los recorridos (punto de encuentro, destino, dificultad, fecha y hora).
3. `participantes`: Tabla intermedia que vincula a los usuarios con las rutas a las que se han unido.
4. `valoraciones`: Registro de puntuaciones y comentarios dejados entre usuarios tras completar una ruta.

## 👤 Roles de Usuario
| Rol | Permisos |
| :--- | :--- |
| **Visitante Anónimo** | Navegación por la aplicación y visualización de rutas públicas sin posibilidad de unirse. |
| **Ciclista (Usuario)** | Capacidad para crear rutas, unirse a eventos de otros, valorar a compañeros y visualizar su historial personal. |
| **Administrador** | Moderación de la plataforma, gestión de rutas reportadas y control sobre las valoraciones indebidas. |

## 🖥️ Vistas Principales

| Vista | Descripción |
| :--- | :--- |
| **🏠 Landing Page** | Presentación de la comunidad BicisExt y rutas destacadas en Extremadura. |
| **🗺️ Explorador de Rutas** | Mapa interactivo y listado para buscar rutas disponibles por fecha y dificultad. |
| **➕ Crear Ruta** | Formulario para establecer los parámetros de una nueva salida ciclista. |
| **👤 Perfil y Valoraciones** | Panel personal con el historial de rutas completadas y las valoraciones recibidas. |



|  📅 Evolución del Proyecto (Cronología Completa)
Documentación detallada del avance semanal del proyecto.

| Fecha | Hito / Fase Realizada |
| :--- | :--- |
| **12-sep-2025** | Presentación de Asignatura y Proyecto. |
| **19-sep-2025** | Creación de Imagen Corporativa y concepto visual. |
| **26-sep-2025** | Elaboración de Contrato y Recogida de Necesidades. |
| **03-oct-2025** | Definición de Requisitos Funcionales y No Funcionales. |
| **10-oct-2025** | Desarrollo de Interfaces Gráficas y Prototipado UI/UX. |
| **17-oct-2025** | Desarrollo de la Estructura de la Base de Datos. |
| **24-oct-2025** | Definición del Modelo Relacional y Normalización. |
| **31-oct-2025** | Presentación de Interfaces y Base de Datos al cliente. |
| **07-nov-2025** | Elección y Justificación de Tecnologías (Stack). |
| **14-nov-2025** | Estructuración Inicial de Documentación y Arquitectura Base. |
| **21-nov-2025** | Definición de Puntos de los Manuales de Usuario y Técnico. |
| **05-dic-2025** | Desarrollo Inicial de Manuales (Fase de Abstracción). |
| **12-dic-2025** | Análisis Arquitectónico y Opciones de Despliegue. |
| **19-dic-2025** | Pruebas de Despliegue en Entorno Local. |
| **09-ene-2026** | Pruebas de Despliegue en Vercel (Producción). |
| **16-ene-2026** | Fase de Pruebas Extensivas (QA) y Corrección de Errores. |
| **23-ene-2026** | Revisión Final y Auditoría de Documentación. |
| **30-ene-2026** | Preparación para la Presentación y Defensa. |
| **06-feb-2026** | Implementación de Feedback y Accesibilidad Web (WCAG). |
| **13-feb-2026** | Optimización de Base de Datos y Revisión de Ciberseguridad. |
| **20-feb-2026** | Generación de Datos Simulados y Pruebas de Estrés. |
| **27-feb-2026** | Cierre de Documentación y Manual de Despliegue. |
| **05-mar-2026** | Congelación de Código (Code Freeze) y Versionado Semántico. |
| **12-mar-2026** | Preparación de la Defensa y Creación de Material Audiovisual. |
| **19-mar-2026** | Entrega Definitiva y Defensa del Proyecto. |
