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

