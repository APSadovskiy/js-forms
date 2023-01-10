const mainForm = document.forms.main;
const mainFormInput_fot = mainForm.input_fot;
const mainFormInput_fss = mainForm.input_fss;

document.getElementById('input_fot').addEventListener('keydown'
,
(ev)=> {

	//TODO условие ввода в input
/*  	if(ev.key.length==1 && (ev.key<'0' || ev.key>'9' ))  if(ev.key != '.') if(ev.key != ',')  ev.preventDefault();
 	if(ev.key == '-')  ev.preventDefault();
	
 */
	}
) 

	document.getElementById('input_fot').oninput = e =>{
	if(mainFormInput_fot.value.split('.')[1].length>2||mainFormInput_fot.value.split(',')[1].length>2 ) {e.target.value=mainFormInput_fot.value.slice(0,-1);	}
} 


mainForm.oninput = e => {
	//TODO присвоение 0 при пустом input_fot
	//if (mainFormInput_fot.value === "") mainFormInput_fot.value = 0

	mainFormInput_fot.value=String(mainFormInput_fot.value).replace(',','.');
	mainForm.input_proch.value=String(mainForm.input_proch.value).replace(',','.');
	
	yearFOT= parseFloat(mainFormInput_fot.value)*12;
	
	const FSSpredel=1032000;
	const PFRpredel=1565000;
	yearFSS=0; 
	yearPFR=0;
	itogFSSPFR=0;

	itogFSSPFR=yearFOT/12;
	//--test--
	//console.log(typeof(parseFloat(mainFormInput_fot.value)), parseFloat(mainFormInput_fot.value));
	//console.log(typeof(itogFSSPFR), itogFSSPFR);
	//mainFormInput_fss.value=parseFloat(yearFOT).toFixed(2);
	//--------
	if(yearFOT>FSSpredel) {yearFSS=FSSpredel*0.029} else {yearFSS=yearFOT*0.029};
	if(yearFOT>PFRpredel) {yearPFR=PFRpredel*0.22+(yearFOT-PFRpredel)*0.1} else {yearPFR=yearFOT*0.22};
	itogFSSPFR=Number((yearFSS.toFixed(2)/12).toFixed(2))+Number((yearPFR.toFixed(2)/12).toFixed(2))+Number((yearFOT*0.051/12).toFixed(2))+Number((yearFOT*0.002/12).toFixed(2)); 
	mainFormInput_fss.value=parseFloat(itogFSSPFR).toFixed(2);
	
	mainForm.input_prym.value=(Number(mainFormInput_fot.value)+Number(mainFormInput_fss.value)+Number(mainForm.input_proch.value)).toFixed(2);
	mainForm.input_n.value=(mainForm.input_prym.value/5).toFixed(2);
	mainForm.input_cc.value= (Number(mainForm.input_prym.value)+Number(mainForm.input_n.value)).toFixed(2); 
	mainForm.input_5pr.value= (mainForm.input_cc.value/20).toFixed(2);
	mainForm.input_moth_noNDS.value=(Number(mainForm.input_cc.value)+Number(mainForm.input_5pr.value)).toFixed(2); 
	mainForm.input_moth_NDS.value= (mainForm.input_moth_noNDS.value*1.2).toFixed(2);
	mainForm.input_day_noNDS.value= (mainForm.input_moth_noNDS.value*12/248).toFixed(2);
	mainForm.input_day_NDS.value= (mainForm.input_moth_NDS.value*12/248).toFixed(2);
	mainForm.input_clock_noNDS.value= (mainForm.input_day_noNDS.value/8).toFixed(2);
	mainForm.input_clock_NDS.value= (mainForm.input_day_NDS.value/8).toFixed(2);

	document.getElementById('input_fot_cc_pr').innerHTML=(Number(mainFormInput_fot.value)/Number(mainForm.input_cc.value)*100).toFixed(2)+'%';

}

////////////////////////
///////// Настройки
////////////////////////
 
// количество снежинок, которое будет на экране одновременно.
let snowmax=40
 
// Цвета для снежинок. Для каждой конкретной снежинки цвет выбирается случайно из этого массива.
let snowcolor=new Array("#b9dff5","#7fc7ff","#7fb1ff","#7fc7ff","#b9dff5")
 
// Шрифт для снежинок
let snowtype=new Array("Times")
 
// Символ (*) и есть снежинка, в место нее можно вставить любой другой символ.
let snowletter="&#10052;"
 
// Скорость движения снежинок (от 0.3 до 2)
let sinkspeed=0.4
 
// Максимальный размер для снежинок
let snowmaxsize=40
 
// Минимальный размер для снежинок
let snowminsize=10
 
// Зона для снежинок
// 1 для всей страницы, 2 в левой части страницы
// 3 в центральной части, 4 в правой части страницы
let snowingzone=1
 
////////////////////////
///////// Конец настроек
////////////////////////
 
let snow=new Array();
let marginbottom;
let marginright;
let timer;
let i_snow=0;
let x_mv=new Array();
let crds=new Array();
let lftrght=new Array();
function randommaker(range) {
    rand=Math.floor(range*Math.random());
    return rand;
}
function initsnow() {
    marginbottom = document.documentElement.clientHeight+50
    marginright = document.body.clientWidth-15
    let snowsizerange=snowmaxsize-snowminsize
    for (i=0;i<=snowmax;i++) {
        crds[i] = 0;
        lftrght[i] = Math.random()*15;
        x_mv[i] = 0.03 + Math.random()/10;
        snow[i]=document.getElementById("s"+i)
        snow[i].style.fontFamily=snowtype[randommaker(snowtype.length)]
        snow[i].size=randommaker(snowsizerange)+snowminsize
        snow[i].style.fontSize=snow[i].size+'px';
        snow[i].style.color=snowcolor[randommaker(snowcolor.length)]
        snow[i].style.zIndex=1000
        snow[i].sink=sinkspeed*snow[i].size/5
        if (snowingzone==1) {snow[i].posx=randommaker(marginright-snow[i].size)}
        if (snowingzone==2) {snow[i].posx=randommaker(marginright/2-snow[i].size)}
        if (snowingzone==3) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/4}
        if (snowingzone==4) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/2}
        snow[i].posy=randommaker(2*marginbottom-marginbottom-2*snow[i].size)
        snow[i].style.left=snow[i].posx+'px';
        snow[i].style.top=snow[i].posy+'px';
    }
    movesnow()
}
function movesnow() {
    for (i=0;i<=snowmax;i++) {
        crds[i] += x_mv[i];
        snow[i].posy+=snow[i].sink
        snow[i].style.left=snow[i].posx+lftrght[i]*Math.sin(crds[i])+'px';
        snow[i].style.top=snow[i].posy+'px';
        
        if (snow[i].posy>=marginbottom-2*snow[i].size || parseInt(snow[i].style.left)>(marginright-3*lftrght[i])){
            if (snowingzone==1) {snow[i].posx=randommaker(marginright-snow[i].size)}
            if (snowingzone==2) {snow[i].posx=randommaker(marginright/2-snow[i].size)}
            if (snowingzone==3) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/4}
            if (snowingzone==4) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/2}
            snow[i].posy=0
        }
    }
    let timer=setTimeout("movesnow()",50)
}
 
for (i=0;i<=snowmax;i++) {
    document.body.insertAdjacentHTML("beforeend", "<span id='s"+i+"' style='pointer-events:none;user-select:none;position:fixed;top:-"+snowmaxsize+"'>"+snowletter+"</span>")
}
window.onload=initsnow   