#!/bin/bash

#Import de dependencias y configuraciones
configfile='./config/.env.cfg'
configfile_secured='/tmp/.env.cfg'
funciones_menu='./libs/funciones_menu.source'

#Inyeccion de las dependencias importadas
source $configfile
source $funciones_menu


#Config de las opciones del menu a trabajar
OPCIONES=(
   0 "Salir"
   1 "Limpiar cache de aplicacion y rutas"
   2 "Reestablecer permisos seguros (755:d|644:f)"
   3 "Obtener backup base de datos de la aplicación"
)
DET_OPCIONES=(
   "Salir"
   "Limpiar cache de aplicacion y rutas"
   "Reestablecer permisos seguros (755:d|644:f)"
   "Obtener backup base de datos de la aplicación"
)


while [ $(menu_seleccionar_opcion $OPCIONES) -ne 0 ]
do
   #ELECCION=$(menu_seleccionar_opcion $OPCIONES)
   echo $1

   #menu_elegir_opcion $ELECCION
   RESULTADO=$(menu_elegir_opcion $ELECCION)
   #menu_mostrar_resultados $RESULTADO
   echo $RESULTADO >> "$LOG_PATH/bash.log"
   pause 'Finalizado, presione enter para continuar...'


   IFS=';' read -ra RES <<< "$RESULTADO"
   for i in "${RES[@]}"; do
       # process "$i"
       echo $i
   done

done

clear


















