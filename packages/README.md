# Paquetes compartidos

Los paquetes contienen código utilizado por más de un consumidor real. Mantén este directorio deliberadamente pequeño.

Candidato inicial:
- contracts/: esquemas Zod y tipos de transporte compartidos entre web y API.

No muevas código a un paquete compartido solo porque podría reutilizarse en teoría. Evita paquetes genéricos utils y evita exponer modelos de persistencia del backend al frontend.
