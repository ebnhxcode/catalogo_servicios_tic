#!/bin/bash
# Bash Menu Script
clear
echo '|··········+~############~+··········|'
echo '|··········+~ Minsal App ~+··········|'
echo '|··········+~############~+··········|'

echo 'v0.1'
echo
echo 'Seleccione una acción a realizar:'
echo

title="Select example"
prompt="Pick an option:"
opciones=(1 2 3 4)
det_opciones=("opcion 1" "opcion 2" "opcion 3" "opcion 4")

select op in "${opciones[@]}"
do
    echo "${det_opciones[$op]}"
    case $op in
        1)
            clear
            echo "Elegiste: ${det_opciones[$op]}"
            ;;

        2)
            clear
            echo "Elegiste: ${det_opciones[$op]}"
            ;;

        3)
            clear
            echo "Elegiste: ${det_opciones[$op]}"
            ;;

        4)
            clear
            break
            ;;
        *) echo "Opción inválida";;
    esac
done

while op=$(zenity --title="$title" --text="$prompt" --list \
                   --column="Opciones" "${opciones[@]}"); do

    case "$op" in
    "${opciones[0]}" ) zenity --info --text="You picked $op, option 1";;
    "${opciones[1]}" ) zenity --info --text="You picked $op, option 2";;
    "${opciones[2]}" ) zenity --info --text="You picked $op, option 3";;
    *) zenity --error --text="Invalid option. Try another one.";;
    esac

done

echo
echo
PS3='Seleccione una opcion: '
echo
echo