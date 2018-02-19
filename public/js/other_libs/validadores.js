// JavaScript Document
// JavaScript Document
/* FUNCIONES DE VALIDACIÓN PARA USO EN FORMULARIOS */

/*
 * Función usada para aceptar la pulsación de teclas numéricas solamente en un campo de texto HTML.
 * Trabaja bien en: Mozilla Firefox, IE6, IE8, Safari
 * Forma de uso:
 * <input type="text" onKeyPress="return accept_numberss(event)" />
 */
function accept_numbers(e)
{
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla==8) return true; //Tecla de retroceso (para poder borrar)
	patron = /[0-9]/;
	te = String.fromCharCode(tecla);
	return patron.test(te); 
}
/*
 * Función usada para aceptar la pulsación de teclas numéricas solamente en un campo de texto HTML.
 * Trabaja bien en: Mozilla Firefox, IE6, IE8, Safari
 * Forma de uso:
 * <input type="text" onKeyPress="return accept_numberss(event)" />
 */

function accept_alphanumeric(e)
{
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla==8) return true; //Tecla de retroceso (para poder borrar)
	patron = /[a-zA-Z0-9]/;
	te = String.fromCharCode(tecla);
	return patron.test(te); 
}

function accept_alphanumeric_rut(e)
{
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla==8) return true; //Tecla de retroceso (para poder borrar)
	patron = /[a-zA-Z0-9]/;
	te = String.fromCharCode(tecla);
	return patron.test(te); 
}
/*
 * Función usada para validar que un string corresponda a un e-mail.
 * Retorna verdadero si el e-mail es válido de lo contrario retornará falso.
 */


function validate_email( mailStr )
{
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( mailStr ))
	{
		return (true);
	}
	else 
	{
		return (false);
	}
}

/* OTRAS FUNCIONES DE VALIDACIÓN QUE SE PODRÍAN MODIFICAR PARA SER ADAPTADAS A OTROS USOS */
function accept_empresa(e)
{
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla==8) return true; //Tecla de retroceso (para poder borrar)
	patron = /[a-zA-Z0-9.\s-]/;
	te = String.fromCharCode(tecla);
	return patron.test(te); 
}
function accept_names(e)
{
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla==8) return true; //Tecla de retroceso (para poder borrar)
	patron = /[a-zA-Z\s]/;
	te = String.fromCharCode(tecla);
	return patron.test(te); 
}
function accept_numberss(e)
{
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla==8) return true; //Tecla de retroceso (para poder borrar)
	patron = /[0-9]/;
	te = String.fromCharCode(tecla);
	return patron.test(te); 
}
function accept_login(e)
{
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla==8) return true; //Tecla de retroceso (para poder borrar)
	patron = /[a-zA-Z0-9-]/;
	te = String.fromCharCode(tecla);
	return patron.test(te); 
}
function accept_password(e)
{
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla==8) return true; //Tecla de retroceso (para poder borrar)
	patron = /[a-zA-Z0-9-._]/;
	te = String.fromCharCode(tecla);
	return patron.test(te); 
}
// ACEPTA SOLO NÚMEROS EN: Mozilla Firefox, IE6, IE8, Safari


function accept_numbers(e)
{
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla==8) return true; //Tecla de retroceso (para poder borrar)
	patron = /[0-9]/;
	te = String.fromCharCode(tecla);
	return patron.test(te);
	
}

function accept_ideas(e)
{
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla==8) return true; //Tecla de retroceso (para poder borrar)
	patron = /[a-zA-Z0-9.\s_?¿ñÑáéíóúÁÉÍÓÚ.,=)(%\$\!¡\#-]/;
	te = String.fromCharCode(tecla);
	return patron.test(te); 
}

function accept_texto_limpio(e)
{
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla==8) return true; //Tecla de retroceso (para poder borrar)
	patron = /[a-zA-Z0-9.\s_?¿ñÑáéíóúÁÉÍÓÚ.,=)(%\$\!¡\#-]/;
	te = String.fromCharCode(tecla);
	return patron.test(te); 
}


//RULLOVER

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

<!--   // Array ofmonth Names

function time(){
var monthNames = new Array( "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Sept.","Oct.","Nov.","Dic.");
var dia = new Array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado");
var now = new Date();
thisYear = now.getYear();
if(thisYear < 1900) {thisYear += 1900}; // corrections if Y2K display problem
//time=dia[now.getDay()] + " " + now.getDate() + " de " + monthNames[now.getMonth()] + " de " + thisYear
time=dia[now.getDay()] + " " + now.getDate() + " " + monthNames[now.getMonth()] + " " + thisYear
return time;
}
// -->
 


/*

VALIDACION DE RUT (Para RUTs de campo completo. Ej. 15630786-k)
FORMA DE USO: 

if ( !Rut( id_emprendedor ) )
{
	formAlert("Por favor escriba un Rut v\u00e1lido", "rut_pasaporte")
	return;
}
*/			
function revisarDigito( dvr )
{	
	dv = dvr + ""	
	if ( dv != '0' && dv != '1' && dv != '2' && dv != '3' && dv != '4' && dv != '5' && dv != '6' && dv != '7' && dv != '8' && dv != '9' && dv != 'k'  && dv != 'K')	
	{		
		return false;	
	}	
	return true;
}

function revisarDigito2( crut,trut )
{	
	largo = crut.length;	
	if ( largo < 2 )	
	{			
		return false;	
	}	
	if ( largo > 2 )		
		rut = crut.substring(0, largo - 1);	
	else
	
	var array_rut
	array_rut = trut.split("-","2");
	var rut = array_rut[0];
	var dv = array_rut[1];

/*
	rut = crut.charAt(0);	
	dv = crut.charAt(largo-1);	
*/
	revisarDigito( dv );	

	if ( rut == null || dv == null )
		return 0	

	var dvr = '0'	
	suma = 0	
	mul  = 2	

	for (i= rut.length -1 ; i >= 0; i--)	
	{	
		suma = suma + rut.charAt(i) * mul		
		if (mul == 7)			
			mul = 2		
		else    			
			mul++	
	}	
	res = suma % 11	
	if (res==1)		
		dvr = 'k'	
	else if (res==0)		
		dvr = '0'	
	else	
	{		
		dvi = 11-res		
		dvr = dvi + ""	
	}
	if ( dvr != dv.toLowerCase() )	
	{			
		return false	
	}

	return true
}

function Rut(texto)
{	
	var txtRUT=texto
	var tmpstr = "";	
	for ( i=0; i < texto.length ; i++ )		
		if ( texto.charAt(i) != ' ' && texto.charAt(i) != '.' && texto.charAt(i) != '-' )
			tmpstr = tmpstr + texto.charAt(i);	
	texto = tmpstr;	
	largo = texto.length;	

	if ( largo < 2 )	
	{		
		return false;	
	}	

	for (i=0; i < largo ; i++ )	
	{			
		if ( texto.charAt(i) !="0" && texto.charAt(i) != "1" && texto.charAt(i) !="2" && texto.charAt(i) != "3" && texto.charAt(i) != "4" && texto.charAt(i) !="5" && texto.charAt(i) != "6" && texto.charAt(i) != "7" && texto.charAt(i) !="8" && texto.charAt(i) != "9" && texto.charAt(i) !="k" && texto.charAt(i) != "K" )
 		{				
			return false;		
		}	
	}	

	var invertido = "";	
	for ( i=(largo-1),j=0; i>=0; i--,j++ )		
		invertido = invertido + texto.charAt(i);	
	var dtexto = "";	
	dtexto = dtexto + invertido.charAt(0);	
	dtexto = dtexto + '-';	
	cnt = 0;	

	for ( i=1,j=2; i<largo; i++,j++ )	
	{		
		//alert("i=[" + i + "] j=[" + j +"]" );		
		if ( cnt == 3 )		
		{			
			dtexto = dtexto + '.';			
			j++;			
			dtexto = dtexto + invertido.charAt(i);			
			cnt = 1;		
		}		
		else		
		{				
			dtexto = dtexto + invertido.charAt(i);			
			cnt++;		
		}	
	}	

	invertido = "";	
	for ( i=(dtexto.length-1),j=0; i>=0; i--,j++ )		
		invertido = invertido + dtexto.charAt(i);		

	if ( revisarDigito2(texto,txtRUT) )		
		return true;	

	return false;
}


