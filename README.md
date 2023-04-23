# ceiot_dam-tp
CEIoT - TP Final - Desarrollo de Aplicaciones Multiplataforma


Pasos:

1. Levantar el docker con 'docker compose up'
2. Ir a la carpeta /src/backend y ejecutar 'npm install'
3. 



La aplicación puede hacaer lo siguiente:
* 1. Dar un listado de dispositivos.
2. Al entrar a algún dispositivo, brindar el último valor de medición por sensor en el gráfico.
* 3. Tener la opción dentro de la vista del dispositivo con sus medición, de poder abrir la electroválvula que le corresponde. 
    3.1. En el caso de que se abra o se cierre dicha electroválvula, se deberá insertar un registro en la tabla de Log_Riegos
    3.2. Si se cierra la válvula se realiza un insert sobre la tabla de mediciones para crear un nuevo registro con el nuevo valor.
4. Tener otra opción que permita ver todas las mediciones de ese sensor como una tabla.
5. Poder consultar el log de los riegos para una electroválvula.



Condiciones mínimas de la app:

● 2 Directivas estructurales (ngIf, ngFor)
    1. Se usó ngIf para controlar el botón que controla la apertura o el cierre de la válvula, dependiendo del estado actual de la misma.
    2. Se usó ngFor para obtener la lista de dispositivos.

● 1 directiva de atributo (custom)
    -

● 1 pipe custom
    -

● 1 servicio para conectar a la API
    - El servicio para conectar con la api se llama 'DispositivoService'.

● 1 Api en Express con comunicación a la base de datos


