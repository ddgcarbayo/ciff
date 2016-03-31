var vizState={
	'year' : '2015',
	'filtro': 'mas_votados',
	'party': '',
	'prov': '',
	'zoom': 'spain',
	'geo': 'muni',
	'tRank':'',
	'flagCambio':'',
	'clickAC': false,
	'sinCambio': false,
	'noQuitesVelo': false
};

var d20d={
	'mas_votados':{
		'2011': null,
		'2015': null
	},
	'mas_votados2f':{
		'2011': null,
		'2015': null
	},
	'distr':{
		'2011': {},
		'2015': {}
	},
	'caidas':{},
	'subidas':{}
};


var otrosColor='#333333';
// name, name11, color, color11, distr, soloEn, solo15
var partidos={
	'3316': {name:'PP', color:'#2a91d5', distr: true},
	'3484': {name:'PSOE', color:'#e32d42', distr: true},
	'4850': {name:'IU-UP', name11:'IU', color:'#2e613d', distr: true},
	'4475': {name:'UPyD', color:' #c83a8f', distr: true},
	'4991': {name:'DL', name11:'CiU', color:'#282d69', distr: true, soloEn:['08','17','25','43']},
	'5063': {name:'ERC',color:'#fcb743', distr: true, soloEn:['08','17','25','43']},
	'1528': {name:'EH Bildu', name11:'Amaiur', color:'#bfcd28', distr: false, soloEn:['01','20','48']},
	'1533': {name:'PNV', color:'#35d226', distr: true, soloEn:['01','20','48']},
	'1079': {name:"C's", color:'#eb6615', distr: true, solo15:true},
	'3736': {name:'Podemos', color:'#641766', distr: true, solo15:true},
	
	'2744': {name:'PACMA', color:'#A7BF0F', distr: false},
	'4720': {name:'GBAI', color:'#E68272', distr: false},
	'5026': {name:'NÓS', name11:'BNG', color:'#d6edfb', distr: false},
	'4744': {name:'CC', color:'#feea36', distr: false},
	'4233': {name:'UNIO', color:otrosColor, distr: false},
	'4688': {name:'VOX', color:otrosColor, distr: false},
	'060': {name:'FAC', color:otrosColor, distr: false},
	'132': {name:'PRC', color:otrosColor, distr: false},
	'4911': {name:'Recortes 0', color:otrosColor, distr: false},
	'2816': {name:'PCPE', color:otrosColor, distr: false},
	'5011': {name:'AV', color:otrosColor, distr: false},
	'4976': {name:'MÉS', color:otrosColor, distr: false},
	'4223': {name:'Unió', color:otrosColor, distr: false},
	'1471': {name:'EB', color:otrosColor, distr: false},
	'1412': {name:'EL PI', color:otrosColor, distr: false},
	'3985': {name:'SAIn', color:otrosColor, distr: false},
	'4896': {name:'EU-eX', color:otrosColor, distr: false}
	/*'': {name:'', color:otrosColor, distr: false},
	'': {name:'', color:otrosColor, distr: false},
	'': {name:'', color:otrosColor, distr: false},
	'': {name:'', color:otrosColor, distr: false},
	'': {name:'', color:otrosColor, distr: false},
	'': {name:'', color:otrosColor, distr: false},
	'': {name:'', color:otrosColor, distr: false},
	'': {name:'', color:otrosColor, distr: false},
	'': {name:'', color:otrosColor, distr: false},
	'': {name:'', color:otrosColor, distr: false}*/
	
};

var provComCodes=[
	//CCAA, PROV
	[ '08','1' ],
	[ '10','3' ],
	[ '01','4' ],
	[ '16','1' ],
	[ '03','33' ],
	[ '07','5' ],
	[ '11','6' ],
	[ '04','7' ],
	[ '09','8' ],
	[ '16','48' ],
	[ '07','9' ],
	[ '11','10' ],
	[ '01','11' ],
	[ '06','39' ],
	[ '10','12' ],
	[ '08','13' ],
	[ '01','14' ],
	[ '12','15' ],
	[ '08','16' ],
	[ '16','20' ],
	[ '09','17' ],
	[ '01','18' ],
	[ '08','19' ],
	[ '01','21' ],
	[ '02','22' ],
	[ '01','23' ],
	[ '07','24' ],
	[ '09','25' ],
	[ '12','27' ],
	[ '13','28' ],
	[ '01','29' ],
	[ '14','30' ],
	[ '15','31' ],
	[ '12','32' ],
	[ '07','34' ],
	[ '05','35' ],
	[ '12','36' ],
	[ '17','26' ],
	[ '07','37' ],
	[ '05','38' ],
	[ '07','40' ],
	[ '01','41' ],
	[ '07','42' ],
	[ '09','43' ],
	[ '02','44' ],
	[ '08','45' ],
	[ '10','46' ],
	[ '07','47' ],
	[ '07','49' ],
	[ '02','50' ],
	[ '18','51' ],
	[ '19','52' ]
];

//var gd1=null, gd2=null;
var features, projection, projection2;
var centroSpain=[-2.4854312769,39.658829659];
var spainProvs;
var width = 700, height = 580;
var numProvs=provs.length;
var nRank=10;
var hoverEl=0;
var ini=true;
var animando=false;
var lugarOutColor='#F0F0F0';
var caidasColor='#4a7a7e';
var subidasColor='#4a7a7e';
var ffie;
var tablet=true;

$( window ).load(function(){
	var md = new MobileDetect(window.navigator.userAgent);
	if(md.tablet()==null){
		$('body').addClass('tabletNot');
		tablet=false;
	}
	
	ffie= (navigator.sayswho.indexOf('irefox')!=-1 || navigator.sayswho.indexOf('IE')!=-1) ? true : false;
	
	gimmeData();
	//initViz();
});

function initViz(){
	
	cargaCosicas();
	
	iniEventos();
	
	cargaRanking();
	
	controlFiltrosByParty();
	
	partiesControl();
	
	showContent();
}

function cargaCosicas(){
	cargaAutoComplete();
	
	cargaMapa();
	
	cargaSelects();
}

function cargaAutoComplete(){
	 var aCompData=[];
	 for (var k in munis) {
        if (munis.hasOwnProperty(k)) {
           aCompData.push({value:munis[k][0], data:k});
        }
	 }
	$('#inputMunis').autocomplete({
		lookup: aCompData,
		minChars: 3,
		lookupLimit: 10,
		appendTo: '#searchMunis',
		triggerSelectOnValidInput: false,
		autoSelectFirst: true,
		onSelect: function (s) {
			vizState.clickAC=true;
			
			if(vizState.geo=='muni'){
				$('svg #muni_'+s.data).d3Click();
			}else{
				$('svg #path_prov_'+muniToProvId(s.data)).d3Click();
				setTimeout(function(){
					$('svg #muni_'+s.data).d3Click();
				}, 500);
			}
			//$('svg #muni_'+s.data).d3Click();
			$('#inputMunis').val('');
		}
	});
}

function cargaMapa(){
	projection = d3.geo.mercator()
		.scale(17396)
		.center(centroSpain)
		.translate([width/2,height/2])
	
	projection2 = d3.geo.mercator()
		.scale(17396)
		.center([-20.185431276999918,34.65882965938125]) //projection center
		.translate([width/2,height/4]) //translate to center the map in view

	//Generate paths based on projection
	var path = d3.geo.path()
		.projection(projection);
		
	var path2 = d3.geo.path()
		.projection(projection2);

	//Create an SVG
	var svg = d3.select("#dataviz").append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr('id','spMap');

	features = svg.append("g")
		//.attr("class","features")
		.attr("class","features justDataElems")
		.attr('transform',"translate(1)scale(1)");
	
	/*var zoom = d3.behavior.zoom()
		.scaleExtent([1, 10])
		.on("zoom",zoomed);*/

	/*svg.call(zoom)
	// Para desactivar el dragging
		.on("mousedown.zoom", null)
		.on("touchstart.zoom", null)
		.on("touchmove.zoom", null)
		.on("touchend.zoom", null);*/
	

	  //Create a path for each map feature in the data
	  features
	    //.append('g').attr('class','peninsula')
		.selectAll("path.peninsula")
		.data(topojson.feature(gd1,gd1.objects.peninsula).features)
		.enter()
		.append("path")
		.attr("d",path)
		.attr('stroke','white')
		.attr('stroke-width','0.2px')
		.attr('class',clasePathMuni)
		//.attr('stroke-linejoin',"round")
		.attr('id',function(d){
			return 'muni_'+d.properties.name;
		})
		.attr('fill',fillPathMuni)
		.on('mouseover', hovered)
		.on('mouseout',unHovered)
		.on('mousedown', clicked);
	  
	  features.selectAll("path.canarias")
		.data(topojson.feature(gd2,gd2.objects.canarias).features)
		.enter()
		.append("path")
		.attr("d",path2)
		.attr('class',clasePathMuni)
		.attr('stroke','white')
		.attr('stroke-width','0.2px')
		.attr('id',clasePathMuni)
		.attr('fill',fillPathMuni)
		.on('mouseover',hovered)
		.on('mouseout',unHovered)
		.on("click", clicked);
	
	
	// Sacar los munis ceuta y melilla y meter sus provpaths
	d3.select('#spMap #muni_51001').attr('d',provPaths['51']['path']);
	d3.select('#spMap #muni_52001').attr('d',provPaths['52']['path']);

	spainProvs=features.append('g')
		.attr("class","g_provs");
		
	for(var p=0; p<provs.length; p++){
		spainProvs.append('path')
			.attr('d',provPaths[iProvToId(p)]['path'])
			.attr('id','path_prov_'+iProvToId(p))
			.attr('class','provPath')
			.attr('fill','transparent')
			.attr('stroke','white')
			.attr('stroke-width','1.2px')
			.on('mouseover',hoveredProv)
			.on('mouseout',unHovered)
			.on('mousedown',clickedProv);
	}
		
	for(var i=0; i<3;i++){
		spainProvs.append('path')
			.attr('d',provPaths['helpElem'+i]['path'])
			.attr('fill', (i==0) ? 'transparent' : '#878787')
			.attr('stroke','#878787')
			.attr('stroke-width', '0.5px')
			.attr('class','helpElem sinEvents');
	}
	
	getProvsZooms();
	
	function clasePathMuni(d,i){
		var val=parseInt(parseInt(d.properties.name) /1000)-1;
		if( val < numProvs) return 'muniPath muniProv'+muniToProvId(d.properties.name);
		return 'muniPath sinEvents';
	}
	
	function hovered(d){
		if(animando==false){
			if(vizState.geo=='muni' || (vizState.geo=='prov' && vizState.zoom=='prov')){
				// if(muniToProv(d.properties.name)!='53' )
				if( munis[d.properties.name] ){
					hoverEl++;
					
					var mttip=ttipLugar(d.properties.name);
					$('#batamantip p.name').html(mttip.pname);
					$('#batamantip p.mv').html(mttip.pmv);
					$('#batamantip p.mv2').html(mttip.pmv2);
					
					if($('#batamantip').is('visible')==false){
						setTimeout(function(){ 
							if(hoverEl>0)
								$('#batamantip').fadeIn(200);
						},120);
					}
				}
			}
		}
	}
	
	function hoveredProv(){
		if(animando==false){
			var prov=d3.select(this).attr('id').replace('path_prov_','');
			var provNum=parseInt(prov)-1;
			if(vizState.zoom=='prov'){
				hoverEl++;

				$('#batamantip p.name').html( provs[provNum][0] );
				$('#batamantip p.mv').html('Pulse para ver ampliado');
				$('#batamantip p.mv2').html('');
				
				if($('#batamantip').is('visible')==false){
					setTimeout(function(){ 
						if(hoverEl>0)
							$('#batamantip').fadeIn(200);
					},120);
				}
			}else if(vizState.zoom='spain'){
				hoverEl++;
				
				var pttip=ttipLugar(prov);
				$('#batamantip p.name').html(pttip.pname);
				$('#batamantip p.mv').html(pttip.pmv);
				$('#batamantip p.mv2').html(pttip.pmv2);

				
				if($('#batamantip').is('visible')==false){
					setTimeout(function(){ 
						if(hoverEl>0)
							$('#batamantip').fadeIn(200);
					},120);
				}
			}
		}
	}
	
	function unHovered(){
		hoverEl--;
		if(hoverEl<0) hoverEl=0;
		setTimeout(function(){ 
			if(hoverEl<1)
				$('#batamantip').fadeOut(200);
		},120);
	}
	
	function clicked(d){
		if(d3.event.button!=2){
			
			forceHideTooltip();
			d3.event.preventDefault(); 
			var prov=muniToProvId(d.properties.name);
			
			d3.select('path.muniPath.muniSel').classed('muniSel',false);
			d3.select('path#muni_'+d.properties.name).classed('muniSel',true);
			
			if(prov!='51' && prov!='52' ){
				if(ffie){
					features.attr("transform", "translate(" + provPaths[prov]['centroZoom'] + ")scale(" + provPaths[prov]['escalaZoom'] + ")");
					spainProvs.selectAll("path.provPath").style("stroke-width", 0.6 +"px" );
				}else{
					features.transition().duration(500)
					  .attr("transform", "translate(" + provPaths[prov]['centroZoom'] + ")scale(" + provPaths[prov]['escalaZoom'] + ")");
					 
					spainProvs.transition().duration(500)
						.selectAll("path.provPath").style("stroke-width", 0.6 +"px" );
				}
				
				d3.select('#path_prov_'+prov).classed('diluida',false);
				d3.select('#path_prov_'+prov).classed('provSel',true);
				d3.selectAll('path.provPath:not(#path_prov_'+prov+')')
					.classed('diluida',true);
				
				if(vizState.zoom=='spain' || !$('#backToSpain').is(':visible')) 
					$('#backToSpain').fadeIn(500);
				
				$('#nombreProvincia .name').html( provs[parseInt(prov)-1][0] );
				if(!$('#nombreProvincia').is(':visible'))
					$('#nombreProvincia').fadeIn(500);
			}
			
			vizState.zoom='prov';
			vizState.prov=prov;
			cargaClickTtip(d.properties.name);
			cargaRanking();
			partiesControl();
		}
	}
	
	function clickedProv(){
		if(d3.event.button!=2){
			forceHideTooltip();
			if( $('#clickTtip').is(':visible') ) $('#clickTtip').hide();
			d3.event.preventDefault();
			var prov=d3.select(this).attr('id').replace('path_prov_','');
			vizState.prov=prov;
			
			if(vizState.zoom=='prov'){
				if(prov!='51' && prov!='52' ){
					animando=true;
					d3.selectAll('#dataviz svg path.muniPath.zoomProv').classed('zoomProv',false);
					d3.selectAll('#dataviz svg path.muniSel').classed('muniSel',false);
					d3.selectAll('#dataviz svg path.provPath.provSel').classed('provSel',false);
					
					if( vizState.geo=='prov'){
						d3.select('#dataviz svg#spMap').classed('zoomProv',true);
						d3.selectAll('#dataviz svg path.muniProv'+prov).classed('zoomProv',true);
					}else{
						d3.selectAll('#dataviz svg#spMap').classed('zoomProv',false);
					}
					
					
					if(ffie){
						features.attr("transform", "translate(" + provPaths[prov]['centroZoom'] + ")scale(" + provPaths[prov]['escalaZoom'] + ")");
						spainProvs.transition().duration(500).selectAll("path.provPath").style("stroke-width", 0.6 +"px" );
					}else{
						features.transition().duration(500)
						  .attr("transform", "translate(" + provPaths[prov]['centroZoom'] + ")scale(" + provPaths[prov]['escalaZoom'] + ")");

						spainProvs.transition().duration(500)
							.selectAll("path.provPath").style("stroke-width", 0.6 +"px" );
					}
						
					d3.select('#path_prov_'+prov).classed('diluida',false);
					
					d3.select(this).classed('provSel',true);
					d3.selectAll('path.provPath:not(#path_prov_'+prov+')')
						.classed('diluida',true);
						
					$('#nombreProvincia .name').html( provs[parseInt(prov)-1][0] );
					if(!$('#nombreProvincia').is(':visible'))
						$('#nombreProvincia').fadeIn(500);
						
					if(vizState.zoom=='spain' || !$('#backToSpain').is(':visible')) $('#backToSpain').fadeIn(500);
				}
				
				cargaClickTtip(prov);
				cargaRanking();
				setTimeout(function(){ animando=false; }, 500);
			}else{
				d3.select('path.provPath.provOutSel').classed('provOutSel',false);
				d3.select(this).classed('provOutSel',true);
				cargaClickTtip(prov);
			}
			
			//vizState.prov=prov;
			partiesControl();
		}
		
	}
}

function fillPathMuni(d,i){
	if( vizState.filtro.indexOf('mas_votados' )!=-1){
		var val=d20d['mas_votados'][vizState.year]['info_map']['muni'][d.properties.name];
		var pVal;
		if(vizState.party==''){
			if(val){
				pVal=(vizState.filtro.indexOf('2f')!=-1) ? val[2] : val[0];
				d3.select(this).classed('dataElem',true);
				return getColorPartido( pVal );
			}
			d3.select(this).classed('dataElem',false);
			return lugarOutColor;
		}else{
			pVal=( val && vizState.filtro.indexOf('2f')!=-1) ? val[2] : ((val) ? val[0] : false);
			if(val && vizState.party==pVal){
				if(partidos[ pVal ]){
					d3.select(this).classed('dataElem',true);
					return getColorPartido(pVal);
				}
				d3.select(this).classed('dataElem',false);
				return lugarOutColor;
			}
			d3.select(this).classed('dataElem',false);
			return lugarOutColor;
		}
	}else if(vizState.filtro=='distr'){
		if(d20d['distr'][vizState.party]['info_map']['muni'][d.properties.name]){
			d3.select(this).classed('dataElem',true);
			return getColorPartido(vizState.party);
		}
		d3.select(this).classed('dataElem',false);
		return 'white';	
	}else{
		if(d20d['distr'][vizState.party]['info_map']['muni'][d.properties.name] && d20d['distr'][vizState.party]['info_map']['muni'][d.properties.name][2]){
			if((vizState.filtro=='caidas') && d20d['distr'][vizState.party]['info_map']['muni'][d.properties.name][2] < 0 ){
				d3.select(this).classed('dataElem', true);
				return caidasColor;
			}
			if((vizState.filtro=='subidas') && d20d['distr'][vizState.party]['info_map']['muni'][d.properties.name][2] > 0 ){
				d3.select(this).classed('dataElem', true);
				return subidasColor;
			}
			d3.select(this).classed('dataElem',false);
			return lugarOutColor;
		}
		d3.select(this).classed('dataElem',false);
		return lugarOutColor;
	}
}

function fillOpacityMuni(d){
	if(vizState.filtro=='distr'){
		if(d20d['distr'][ vizState.party ]['info_map']['muni'][d.properties.name]){
			var yearVal= (vizState.year=='2015') ? 0 : 1;
			return roundTwo(parseFloat(d20d['distr'][ vizState.party ]['info_map']['muni'][d.properties.name][yearVal])/d20d['distr'][vizState.party].maxPar.muni);
		}
		return 0;
		
	}else if(vizState.filtro.indexOf('mas_votados')!=-1){
		return 1;
	}else{
		if(d20d['distr'][vizState.party]['info_map']['muni'][d.properties.name] && d20d['distr'][vizState.party]['info_map']['muni'][d.properties.name][2]){
			if((vizState.filtro=='caidas') && d20d['distr'][vizState.party]['info_map']['muni'][d.properties.name][2] < 0 )
				return roundTwo( Math.abs( d20d['distr'][vizState.party]['info_map']['muni'][d.properties.name][2] / d20d['caidas'][vizState.party]['maxPar']['muni']));
			if((vizState.filtro=='subidas') && d20d['distr'][vizState.party]['info_map']['muni'][d.properties.name][2] > 0 )
				return roundTwo( Math.abs( d20d['distr'][vizState.party]['info_map']['muni'][d.properties.name][2] / d20d['subidas'][vizState.party]['maxPar']['muni']));
			return 0;
		}
		return 0;
	}
	
}

function fillPathProv(){
	var prov=d3.select(this).attr('id').replace('path_prov_','');
	if(vizState.filtro.indexOf('mas_votados')!=-1){
		var pVal;
		var val=d20d['mas_votados'][ vizState.year ]['info_map'][vizState.geo][prov];
		if(vizState.party==''){
			if(val){
				pVal=(vizState.filtro.indexOf('2f')!=-1) ? val[2] : val[0];
				d3.select(this).classed('dataElem', true);
				return getColorPartido( pVal);
			}
			d3.select(this).classed('dataElem', false);
			return lugarOutColor;
		}else{
			pVal=(val && vizState.filtro.indexOf('2f')!=-1) ? val[2] : ((val) ? val[0] : false);
			if(val && vizState.party==pVal){
				if(partidos[ pVal ]){
					d3.select(this).classed('dataElem', true);
					return getColorPartido(pVal);
				}
				d3.select(this).classed('dataElem', false);
				return lugarOutColor;
			}
			d3.select(this).classed('dataElem', false);
			return lugarOutColor;
		}
	}else if(vizState.filtro=='distr'){
		if(d20d['distr'][vizState.party]['info_map']['prov'][prov]){
			d3.select(this).classed('dataElem', true);
			return getColorPartido(vizState.party);
		}
		d3.select(this).classed('dataElem', false);
		return 'white';
	}else{
		if(d20d['distr'][vizState.party]['info_map']['prov'][prov] && d20d['distr'][vizState.party]['info_map']['prov'][prov][2]){
			if((vizState.filtro=='caidas') && d20d['distr'][vizState.party]['info_map']['prov'][prov][2] < 0 ){
				d3.select(this).classed('dataElem', true);
				return caidasColor;
			}
			if((vizState.filtro=='subidas') && d20d['distr'][vizState.party]['info_map']['prov'][prov][2] > 0 ){
				d3.select(this).classed('dataElem', true);
				return subidasColor;
			}
			d3.select(this).classed('dataElem', false);
			return lugarOutColor;
		}
		d3.select(this).classed('dataElem', false);
		return lugarOutColor;
	}
}

function fillOpacityProv(){
	prov=d3.select(this).attr('id').replace('path_prov_','');
	if(vizState.filtro=='distr'){
		if(d20d['distr'][ vizState.party ]['info_map']['prov'][prov]){
			var yearVal= (vizState.year=='2015') ? 0 : 1;
			return roundTwo(parseFloat(d20d['distr'][ vizState.party ]['info_map']['prov'][prov][yearVal])/d20d['distr'][vizState.party].maxPar.prov);
		}
		return 0;
	}else if(vizState.filtro.indexOf('mas_votados')!=-1){
		return 1;
	}else{
		if(d20d['distr'][vizState.party]['info_map']['prov'][prov] && d20d['distr'][vizState.party]['info_map']['prov'][prov][2]){
			if((vizState.filtro=='caidas') && d20d['distr'][vizState.party]['info_map']['prov'][prov][2] < 0 )
				return roundTwo( Math.abs( d20d['distr'][vizState.party]['info_map']['prov'][prov][2] / d20d['caidas'][vizState.party]['maxPar']['prov']));
			if((vizState.filtro=='subidas') && d20d['distr'][vizState.party]['info_map']['prov'][prov][2] > 0 )
				return roundTwo( Math.abs( d20d['distr'][vizState.party]['info_map']['prov'][prov][2] / d20d['subidas'][vizState.party]['maxPar']['prov']));
			return 0;
		}
		return 0;
	}
}

function forceHideTooltip(){
	hoverEl=0;
	setTimeout(function(){ 
		if(hoverEl<1)
			$('#batamantip').fadeOut(200);
	},0);
}

function ttipLugar(l){
	var ttip={'pname':'', 'pmv':'','pmv2':'','hab':''};
	
	if(l.length!=2){
		var m=l;
		ttip.hab=toSpanishDots(munis[m][1])+' habitantes';
		if(vizState.filtro.indexOf('mas_votados')==-1){
			var nom= getNomPartido(vizState.party);
			ttip.pname = nom+' en '+ munis[m][0] +' ('+muniToProv(m)+')';
			var dataTtip=d20d['distr'][vizState.party]['info_map']['muni'][m] || null;
			if( dataTtip && dataTtip[0] ){
				if(vizState.filtro=='distr'){
					if(partidos[vizState.party].solo15){
						ttip.pmv='Votos en 2015: '+dataTtip[0].replace('.',',') +'%';
					}else if(vizState.year=='2015'){
						if(parseInt(dataTtip[0])==-1){
							ttip.pmv='Sin datos en 2015';
						}else{
							ttip.pmv='Votos en 2015: '+dataTtip[0].replace('.',',') +'%';
						}
						if(parseInt(dataTtip[1])==-1){
							ttip.pmv2='Sin datos en 2011';	
						}else{
							ttip.pmv2='Votos en 2011: '+dataTtip[1].replace('.',',') +'%';	
						}
					}else{
						if(parseInt(dataTtip[1])==-1){
							ttip.pmv='Sin datos en 2011';	
						}else{
							ttip.pmv='Votos en 2011: '+dataTtip[1].replace('.',',') +'%';
						}
						
						if(parseInt(dataTtip[0])==-1){
							ttip.pmv2='Sin datos en 2015';
						}else{
							ttip.pmv2='Votos en 2015: '+dataTtip[0].replace('.',',') +'%';
						}
					}	
				}else{
					if(vizState.filtro=='caidas'){
						if(dataTtip[2] < 0){
							ttip.pmv='Votos en 2015: '+dataTtip[0].replace('.',',') +'%';
							ttip.pmv2='Pierde '+spanishFloat(Math.abs(dataTtip[2])) +' puntos';	
						}else{
							debugger;
							ttip.pmv='Votos en 2015: '+dataTtip[0].replace('.',',') +'%';
							ttip.pmv2='No baja respecto a 2011';	
						}
					}else{
						if(dataTtip[2] > 0){
							ttip.pmv='Votos en 2015: '+dataTtip[0].replace('.',',') +'%';
							ttip.pmv2='Gana '+spanishFloat(Math.abs(dataTtip[2])) +' puntos';	
						}else{
							ttip.pmv='Votos en 2015: '+dataTtip[0].replace('.',',') +'%';
							ttip.pmv2='No sube respecto a 2011';
						}
					}
				}
			}else{
				if(vizState.filtro=='caidas' || vizState.filtro=='subidas'){
					ttip.pmv= 'No' + ((vizState.filtro=='caidas') ? 'baja ' : 'mejora')+ 'respecto a 2011';
				}else{
					ttip.pmv='Sin datos para el filtro seleccionado';
				}
			}
		}else{
			var dataTtip=d20d['mas_votados'][vizState.year]['info_map']['muni'][m] || null;
			ttip.pname = munis[m][0] +' ('+muniToProv(m)+')';
			if( dataTtip && dataTtip[0]){
				var nom1 = getNomPartido(dataTtip[0]);
				var nom2 = getNomPartido(dataTtip[2]);
				if(vizState.filtro=='mas_votados'){
					ttip.pmv = '1ª fuerza: '+nom1+' ('+ dataTtip[1].replace('.',',') +'%)';
					ttip.pmv2 = '2ª fuerza: '+nom2+' ('+ dataTtip[3].replace('.',',') +'%)';	
				}else{
					ttip.pmv2 = '1ª fuerza: '+nom1+' ('+ dataTtip[1].replace('.',',') +'%)';
					ttip.pmv = '2ª fuerza: '+nom2+' ('+ dataTtip[3].replace('.',',') +'%)';	
				}
			}else{
				ttip.pmv='Sin datos para el filtro seleccionado';
			}
		}
	}else{
		var prov=l;
		var provNum=parseInt(prov)-1;
		ttip.hab=toSpanishDots(provs[provNum][1])+' habitantes';
		if(vizState.filtro.indexOf('mas_votados')==-1){
			var nom= getNomPartido(vizState.party);
			ttip.pname= nom+' en '+ provs[provNum][0] +':';
			var dataTtip=d20d['distr'][vizState.party]['info_map']['prov'][prov] || null;
			if( dataTtip && dataTtip[0]){
				if(vizState.filtro=='distr'){
					if(partidos[vizState.party].solo15){
						ttip.pmv=dataTtip[0].replace('.',',') +'% de votos en 2015';
					}else if(vizState.year=='2015'){
						ttip.pmv=dataTtip[0].replace('.',',') +'% de votos en 2015';
						ttip.pmv2=dataTtip[1].replace('.',',') +'% de votos en 2011';	
					}else{
						ttip.pmv=dataTtip[1].replace('.',',') +'% de votos en 2011';
						ttip.pmv2=dataTtip[0].replace('.',',') +'% de votos en 2015';
					}
				}else{
					if(vizState.filtro=='caidas'){
						if(dataTtip[2] < 0){
							ttip.pmv='Votos en 2015: '+(''+dataTtip[0]).replace('.',',') +'%';
							ttip.pmv2='Pierde '+spanishFloat(Math.abs(dataTtip[2])) +' puntos';	
						}else{
							debugger;
							ttip.pmv='Votos en 2015: '+(''+dataTtip[0]).replace('.',',') +'%';
							ttip.pmv2='No baja respecto a 2011';	
						}
					}else{
						if(dataTtip[2] > 0){
							ttip.pmv='Votos en 2015: '+(''+dataTtip[0]).replace('.',',') +'%';
							ttip.pmv2='Gana '+spanishFloat(Math.abs(dataTtip[2])) +' puntos';	
						}else{
							ttip.pmv='Votos en 2015: '+(''+dataTtip[0]).replace('.',',') +'%';
							ttip.pmv2='No sube respecto a 2011';
						}
					}
				}
			}else{
				if(vizState.filtro=='caidas' || vizState.filtro=='subidas'){
					ttip.pmv= 'No' + ((vizState.filtro=='caidas') ? 'baja ' : 'mejora')+ 'respecto a 2011';
				}else{
					ttip.pmv='Sin datos para el filtro seleccionado';
				}
			}
		}else{
			var dataTtip=d20d['mas_votados'][vizState.year]['info_map']['prov'][prov] || null;
			ttip.pname = provs[provNum][0];
			if( dataTtip && dataTtip[0]){
				var nom1 = getNomPartido(dataTtip[0]);
				var nom2 = getNomPartido(dataTtip[2]);
				if(vizState.filtro=='mas_votados'){
					ttip.pmv = '1ª fuerza: '+nom1+' ('+ dataTtip[1].replace('.',',') +'%)';
					ttip.pmv2 = '2ª fuerza: '+nom2+' ('+ dataTtip[3].replace('.',',') +'%)';	
				}else{
					ttip.pmv2 = '1ª fuerza: '+nom1+' ('+ dataTtip[1].replace('.',',') +'%)';
					ttip.pmv = '2ª fuerza: '+nom2+' ('+ dataTtip[3].replace('.',',') +'%)';	
				}
			}else{
				ttip.pmv='Sin datos para el filtro seleccionado';
			}
		}
	}
	
	return ttip;
}

function cargaClickTtip(m){
	m=''+m;
	$('#clickTtip').hide();
	
	var mt=ttipLugar(m);
	if((m).length==2){
		var mhref='http://www.elmundo.es/elecciones/elecciones-generales/resultados/congreso/2015/'+ comCode(m) +'/'+m+'/p99.html';
		
	}else{
		var mProv=muniToProvId(m);
		var onlyM=(m).substr(2);
		var mhref='http://www.elmundo.es/elecciones/elecciones-generales/resultados/congreso/2015/'+ comCode(mProv) +'/'+mProv+'/p'+onlyM+'.html';
	}
	
	$('#clickTtip h3').html( (m.length!=2) ? 'Municipio seleccionado' : 'Provincia seleccionada');
	$('#clickTtip div.txt').html('<p class="name">'+mt.pname+'</p><p class="hab">'+mt.hab+'</p><p>'+mt.pmv+'</p><p>'+mt.pmv2+'</p><p class="enlaceRes"><a target="_blank" href="'+mhref+'">Ver resultados completos</a></p>');
	
	$('#clickTtip').show();
	if( $('#info').hasClass('conCajaLugar') == false)   $('#info').addClass('conCajaLugar');
}

function lugarSeleccionadoOff(){
	if( $('#info').hasClass('conCajaLugar')  ){
		if(vizState.zoom=='prov'){
			d3.select('#spMap path.muniSel').classed('muniSel',false);
			d3.select('#spMap path.provOutSel').classed('provOutSel',false);
			cargaClickTtip(vizState.prov);
		}else{
			$('#info').removeClass('conCajaLugar');
			d3.select('#spMap path.muniSel').classed('muniSel',false);
			d3.select('#spMap path.provOutSel').classed('provOutSel',false);
			$('#clickTtip').hide();
		}
	}
	
}

function backToSpainZoom(){	
	var centro=projection(centroSpain);
	centro[0]=width/2 -centro[0];
	centro[1]=height/2 - centro[1];
	
	if(ffie){
		features.attr("transform", "translate(" + centro + ")scale(" + 1 + ")");
	}else{
		features.transition().duration(500)
			.attr("transform", "translate(" + centro + ")scale(" + 1 + ")");
	}
	
	d3.selectAll('path.provPath').classed('diluida',false);
	d3.selectAll('#dataviz .zoomProv').classed('zoomProv',false);
	d3.selectAll('#dataviz svg path.muniSel').classed('muniSel',false);
	d3.selectAll('#dataviz svg path.provPath.provSel').classed('provSel',false);
	d3.selectAll('#dataviz svg path.provPath.provOutSel').classed('provOutSel',false);
	

	$('#nombreProvincia').fadeOut(500);
	$('#backToSpain').fadeOut(500);
	vizState.zoom='spain';
	vizState.prov='';
	
	cargaRanking();	
	partiesControl();
	
	if( $('#clickTtip').is(':visible') ) 
		$('#clickTtip').hide();
	
	forceHideTooltip();
	if( $('#info').hasClass('conCajaLugar'))   $('#info').removeClass('conCajaLugar');
}

function cargaSelects(){
	customSelect({
		idSel: 'filterOptions',
		bPoblado: true
	});
	
	iniPartidos();
	
	customSelect({
		idSel: 'partyOptions',
		bPoblado: true
		/*oData: {
			oVar: partidos,
			bColor: true
		}*/
	});
	
	$('#partyOptionsCont .select-options li').each(function(){
		if( partidos[$(this).attr('rel')] )
			$(this).addClass( 'p' + $(this).attr('rel') );
	})
	
	customSelect({
		idSel: 'renderOptions',
		bPoblado: true
	});
	
	customSelect({
		idSel: 'yearOptions',
		bPoblado: true
	});
	
}

function customSelect(oParams){
	var optionsSelect=[];
	var htmlCustomSelect='<option value="-1" selected>Todas</option>';
	
	if(oParams.oDosValoresFiltro){
		htmlCustomSelect+='<option value="0">'+oParams.oDosValoresFiltro.sValorUnico+'</option>';
		htmlCustomSelect+='<option value="-2">'+oParams.oDosValoresFiltro.sOtrosValores+'</option>';
	}else if(oParams.oData){
		if(oParams.oData.oVar){
			for (var k in oParams.oData.oVar){
				// falta el binclude
				if (oParams.oData.oVar.hasOwnProperty(k)) {
					htmlCustomSelect+='<option value="'+k+'">'+oParams.oData.oVar[k].name+'</option>';	
				}
			}
		}else{
			// Suponemos que existe oElems
			for (var k in oParams.oData.oElems){
				if (oParams.oData.oElems.hasOwnProperty(k)) {
					htmlCustomSelect+='<option value="'+k+'">'+oParams.oData.oElems[k]+'</option>';	
				}
			}
			
		}
	}else if(!oParams.bPoblado){
		var optionSinDatos=false;
		for(var k=0;k<vizData.length;k++){
			if( vizData[k][oParams.colSel]!="¿?" && optionsSelect.indexOf(vizData[k][oParams.colSel])==-1 ){
				if(vizData[k][oParams.colSel]!='No hay datos'){
					optionsSelect.push(vizData[k][oParams.colSel]);
				}else{
					optionSinDatos=true;
				}
			}
		}
		
		optionsSelect.sort(function (a,b){
			return b - a;
		});

		if(optionSinDatos)
			optionsSelect.push('No hay datos');
		
		if(optionsSelect.length!=0)
			for(var k=0;k<optionsSelect.length; k++){
				htmlCustomSelect+='<option value="'+k+'">'+optionsSelect[k]+'</option>';
			}
	}
	
	if(!oParams.bPoblado)
		$('select#'+oParams.idSel).html(htmlCustomSelect);
	

	$('select#'+oParams.idSel).each(function(){
		var $this = $(this), numberOfOptions = $(this).children('option').length;
	  
		$this.addClass('select-hidden');
		$this.wrap('<div class="select"></div>');
		$this.after('<div class="select-styled"></div>');

		var $styledSelect = $this.next('div.select-styled');
		$styledSelect.text($this.children('option').eq(0).text());
	  
		var $list = $('<ul />', {
			'class': 'select-options'
		}).insertAfter($styledSelect);
	  
		for (var i = 0; i < numberOfOptions; i++) {
			$('<li />', {
				text: $this.children('option').eq(i).text(),
				rel: $this.children('option').eq(i).val()
			}).appendTo($list);
		}
	  
		var $listItems = $list.children('li');
	  
		$styledSelect.click(function(e) {
			e.stopPropagation();
			if( $(this).hasClass('disabled')==false ){
				if($(this).hasClass('active')){
					$styledSelect.removeClass('active');
					$list.hide();
				}else{
					$('div.select-styled.active').each(function(){
						$(this).removeClass('active').next('ul.select-options').hide();
					});
					$(this).toggleClass('active').next('ul.select-options').toggle();
				}
			}
		});
	  
		$listItems.click(function(e) {
			e.stopPropagation();
			$styledSelect.text($(this).text()).removeClass('active');
			$this.val($(this).attr('rel'));
			
			switch(oParams.idSel.replace('Options','')){
				case 'filter': cambioFiltro($this.val()); break;
				case 'party': cambioParty($this.val()); break;
				case 'render': cambioGeo($this.val()); break;
				case 'year': cambioYear($this.val()); break;
			}
			
			$list.hide();
		});
	  
		$(document).click(function() {
			$styledSelect.removeClass('active');
			$list.hide();
		});
	});
}

function iniPartidos(){
	var rank=d20d[vizState.filtro][vizState.year]['info_rank'][vizState.geo];
	var j=0;
	for(var i=0; i< rank.length; i++){
		if(partidos[rank[i][0]]){
			partidos[rank[i][0]].iSort=j;
			j++;
		}
	}
	
	var sortable=[];
	for (var k in partidos){
		if(partidos[k]['iSort']!=null){
			sortable.push([k, partidos[k].name, partidos[k].iSort]);
		}else{
			sortable.push([k, partidos[k].name, j+1]);
			j++;
		}
	}

	sortable.sort(function(a,b){
		return a[2] - b[2];
	});
	
	// Creamos el select, ordenado
	var htmlParties='<option value="-1" selected>Todas</option>';
	for(var i=0; i<sortable.length;i++){
		htmlParties+='<option value="'+sortable[i][0]+'" >'+sortable[i][1]+'</option>';
	}
		
	$('#partyOptions').html(htmlParties);
}

function gimmeData(oParams){
	if(!ini) $('body').addClass('waitingData');
	var loTenemos=false;
	
	if(vizState.filtro=='distr'){
		if(d20d[vizState.filtro][vizState.party]!=null )
			loTenemos=true;
	}else if(d20d[vizState.filtro][vizState.year]){
		loTenemos=true
	}
	
	if(!loTenemos){
		var urlData;
		// Para la subida
		//urlData='js/json/'+ ( 
		urlData= 'http://estaticos.elmundo.es/elmundo/2015/graficos/datos/dic/s2/mapa20d/mapaTopoDesktop/js/json/'+ ( 
			(vizState.filtro.indexOf('mas_votados')!=-1) ? 
				'mas_votados_'+vizState.year : 
				'cand_' +vizState.party)
			+ '.json';

		if (document.getElementById("datosJson")) {
			document.getElementsByTagName("head")[0].removeChild(document.getElementById("datosJson"));
		}
		var h = document.createElement("script");
		h.id = "datosJson";
		h.src = urlData;
		document.getElementsByTagName("head")[0].appendChild(h);
	}else{
		setTimeout(function(){ aplicaFiltrosMapa();},300);
	}
}

function procesaDatos(d){
	var djson=JSON.parse(d);
	if(vizState.filtro.indexOf('mas_votados')!=-1){
		d20d['mas_votados'][vizState.year]=djson['mas_votados'];
		d20d['mas_votados2f'][vizState.year]=djson['mas_votados2f'];
	}else{
		d20d['distr'][vizState.party]={}
		d20d['distr'][vizState.party]= djson['distr'];
		
		if( partidos[vizState.party].solo15 ){
			d20d[vizState.filtro][vizState.party].maxPar={
				'muni': parseFloat(d20d[vizState.filtro][vizState.party]['info_rank']['2015']['muni'][0][1]),
				'prov': parseFloat(d20d[vizState.filtro][vizState.party]['info_rank']['2015']['prov'][0][1])
			};
			
		}else{
			d20d['caidas'][vizState.party]=djson['caidas'];
			d20d['subidas'][vizState.party]=djson['subidas'];
			
			d20d['distr'][vizState.party].maxPar={
				'muni': Math.max(
					parseFloat(d20d['distr'][vizState.party]['info_rank']['2015']['muni'][0][1]),
					parseFloat(d20d['distr'][vizState.party]['info_rank']['2011']['muni'][0][1])
				),
				'prov': Math.max(
					parseFloat(d20d['distr'][vizState.party]['info_rank']['2015']['prov'][0][1]),
					parseFloat(d20d['distr'][vizState.party]['info_rank']['2011']['prov'][0][1])
				)
			};
			
			d20d['caidas'][vizState.party].maxPar={'muni':null, 'prov':null};
			d20d['subidas'][vizState.party].maxPar={'muni':null, 'prov':null};
			
			if( d20d['caidas'][vizState.party]['info_rank']['muni'][0]  )
				d20d['caidas'][vizState.party].maxPar['muni']= parseFloat(d20d['caidas'][vizState.party]['info_rank']['muni'][0][1]);
			
			if( d20d['caidas'][vizState.party]['info_rank']['prov'][0] )
				d20d['caidas'][vizState.party].maxPar['prov']=parseFloat(d20d['caidas'][vizState.party]['info_rank']['prov'][0][1]);

			
			if(d20d['subidas'][vizState.party]['info_rank']['muni'][0])
				d20d['subidas'][vizState.party].maxPar['muni']=parseFloat(d20d['subidas'][vizState.party]['info_rank']['muni'][0][1]);
		
			if(d20d['subidas'][vizState.party]['info_rank']['prov'][0])
				d20d['subidas'][vizState.party].maxPar['prov']=parseFloat(d20d['subidas'][vizState.party]['info_rank']['prov'][0][1]);

		}
	}
	
	if(ini){
		ini=false;
		initViz();
	}else{
		setTimeout(function(){ aplicaFiltrosMapa();},300);
	}
	
}

function cambioFiltro(f){
	vizState.filtro=f;
	if(vizState.sinCambio){
		vizState.sinCambio=false;
	}else{
		//partiesControl();
		gimmeData();
	}
}

function cambioParty(f){
	vizState.party= ((f=='-1') ? '' : f);
	asignaColorSelect(f);
	
	if(vizState.sinCambio){
		vizState.sinCambio=false;
	}else{
		gimmeData();
	}
}

function asignaColorSelect(p){
	var c=$('#controles .line #partyOptionsCont .select-styled').attr('class');
	var aC=c.split(' ');
	for(var i=0; i<aC.length; i++){
		if(aC[i].indexOf('p')==0)
			$('#controles .line #partyOptionsCont .select-styled').removeClass(aC[i]);
	}
	
	if (p!='')
		$('#controles .line #partyOptionsCont .select-styled').addClass('p'+p);
}

function cambioGeo(f){
	vizState.geo=f;
	if(vizState.sinCambio){
		vizState.sinCambio=false;
	}else{
		$('body').addClass('waitingData');
		partiesControl();
		
		if(f=='muni'){
			$('#searchMunis').show();
			//setTimeout( function(){
				//vizState.prov='';
				d3.selectAll('#dataviz path.muniPath').classed('fuera',false);
				d3.select('#dataviz svg#spMap').classed('viendoProvs',false);
				d3.select('#spMap .provOutSel').classed('provOutSel',false);
				// OJO: Necesario si no se renderizan munis siempre al cambiar de filtro
				d3.selectAll('#dataviz path.muniPath')
					.attr('fill',fillPathMuni)
					.attr('fill-opacity',fillOpacityMuni)
					.attr('stroke','white');
				
				d3.selectAll('#dataviz path.provPath')
					.attr('fill','transparent');
				
			//},300);
		}else{
			$('#searchMunis').hide();
			d3.selectAll('#dataviz path.provPath')
				.attr('fill',fillPathProv)
				.attr('fill-opacity',fillOpacityProv);
				
			d3.selectAll('#dataviz path.muniPath')
				.attr('fill','transparent')
				.attr('stroke','transparent')
				.classed('fuera',true);
			
			d3.select('#dataviz svg#spMap').classed('viendoProvs',true);
		}
		
		backToSpainZoom();
		if(vizState.noQuitesVelo){
			vizState.noQuitesVelo=false;
		}else{
			setTimeout(function(){ $('body').removeClass('waitingData'); },300);
		}
	}
}

function cambioYear(f){
	vizState.year=f;
	vizState.flagCambio='year';
	if(vizState.sinCambio){
		vizState.sinCambio=false;
	}else{
		gimmeData();
	}
}

function controlFiltrosByParty(){
	if( vizState.party=='' ){
		// forzamos solo dos primeros filtros
		$('#filterOptionsCont .select-options li[rel=mas_votados]').css('display','inline-block');
		$('#filterOptionsCont .select-options li[rel=mas_votados2f]').css('display','inline-block');
		$('#filterOptionsCont .select-options li[rel=distr]').css('display','none');
		$('#filterOptionsCont .select-options li[rel=caidas]').css('display','none');
		$('#filterOptionsCont .select-options li[rel=subidas]').css('display','none');
		
		// forzamos los dos años
		$('#yearOptionsCont .select-options li[rel=2011]').css('display','inline-block');
		$('#yearOptionsCont .select-options li[rel=2015]').css('display','inline-block');
	}else{
		if(partidos[vizState.party].distr==false){
			$('#filterOptionsCont .select-options li[rel=distr]').css('display','none');
			$('#filterOptionsCont .select-options li[rel=caidas]').css('display','none');
			$('#filterOptionsCont .select-options li[rel=subidas]').css('display','none');
			
			if(partidos[vizState.party].solo15){
				$('#yearOptionsCont .select-options li[rel=2011]').css('display','none');
			}else{
				$('#yearOptionsCont .select-options li[rel=2011]').css('display','inline-block');
			}
		}else{
			
			$('#filterOptionsCont .select-options li[rel=distr]').css('display','inline-block');
			
			if(partidos[vizState.party].solo15){
				$('#filterOptionsCont .select-options li[rel=caidas]').css('display','none');
				$('#filterOptionsCont .select-options li[rel=subidas]').css('display','none');
				$('#yearOptionsCont .select-options li[rel=2011]').css('display','none');
			}else{
				$('#filterOptionsCont .select-options li[rel=caidas]').css('display','inline-block');
				$('#filterOptionsCont .select-options li[rel=subidas]').css('display','inline-block');
				$('#yearOptionsCont .select-options li[rel=2011]').css('display','inline-block');
			}
		}
	}
}

function partiesControl(oParams){
	if(vizState.filtro.indexOf('mas_votados')!=-1){
		// Forzamos todos si se pide por oParams
		if(oParams && oParams.forceTodos){
			vizState.party='';
			vizState.sinCambio=true;
			$('#partyOptionsCont .select-options li[rel=-1]').click();
		}
		
		if( $('#partyOptionsCont .select-options li[rel=-1]').css('display')=='none' )
			$('#partyOptionsCont .select-options li[rel=-1]').css('display','inline-block');
		
		if(!oParams || oParams.ini){
			if( $('#partyOptionsCont .select-options li[rel=-1]').css('display')=='none' )
					$('#partyOptionsCont .select-options li[rel=-1]').css('display','inline-block');
			if(vizState.prov==''){
				for (var k in partidos){
					var enc=doubleArrayIndexOf(d20d[vizState.filtro][vizState.year]['info_rank'][vizState.geo], k, 0);
					if( enc!=-1 && $('#partyOptionsCont .select-options li[rel='+k+']').css('display')=='none' ){
						$('#partyOptionsCont .select-options li[rel='+k+']').css('display','inline-block');
					}else if( enc==-1 &&  $('#partyOptionsCont .select-options li[rel='+k+']').css('display')=='inline-block'){
						$('#partyOptionsCont .select-options li[rel='+k+']').css('display','none');
					}
				}
			}else{
				for (var k in partidos){
					var enc=doubleArrayIndexOf(d20d[vizState.filtro][vizState.year]['info_rank']['prov_'+vizState.prov], k, 0);
					if( enc!=-1 && $('#partyOptionsCont .select-options li[rel='+k+']').css('display')=='none' ){
						$('#partyOptionsCont .select-options li[rel='+k+']').css('display','inline-block');
					}else if( enc==-1 &&  $('#partyOptionsCont .select-options li[rel='+k+']').css('display')=='inline-block'){
						$('#partyOptionsCont .select-options li[rel='+k+']').css('display','none');
					}
				}
			}
		}
	}else if(vizState.filtro=='distr'){
		if(vizState.party=='' || !partidos[vizState.party].distr){
			vizState.party='3316';
			vizState.sinCambio=true;
			$('#partyOptionsCont .select-options li[rel='+vizState.party+']').click();
		}
		
		for (var k in partidos){
			if (!partidos[k].distr){
				if( $('#partyOptionsCont .select-options li[rel='+k+']').css('display')=='inline-block' )
					$('#partyOptionsCont .select-options li[rel='+k+']').css('display','none');
			}else{
				if( vizState.prov!=''){
					if( partidos[k].soloEn && partidos[k].soloEn.indexOf(vizState.prov)==-1 ){
						if( $('#partyOptionsCont .select-options li[rel='+k+']').css('display')=='inline-block' )
							$('#partyOptionsCont .select-options li[rel='+k+']').css('display','none');	
					}else{
						if( $('#partyOptionsCont .select-options li[rel='+k+']').css('display')=='none' )
							$('#partyOptionsCont .select-options li[rel='+k+']').css('display','inline-block');	
					}
				}else{
					if( $('#partyOptionsCont .select-options li[rel='+k+']').css('display')=='none' )
						$('#partyOptionsCont .select-options li[rel='+k+']').css('display','inline-block');	
				}
			}
		}
	}else{
		for (var k in partidos){
			if (partidos[k].solo15 || !partidos[k].distr){
				if( $('#partyOptionsCont .select-options li[rel='+k+']').css('display')=='inline-block' )
					$('#partyOptionsCont .select-options li[rel='+k+']').css('display','none');
			}else{
				if( vizState.prov!=''){
					if( partidos[k].soloEn && partidos[k].soloEn.indexOf(vizState.prov)==-1 ){
						if( $('#partyOptionsCont .select-options li[rel='+k+']').css('display')=='inline-block' )
							$('#partyOptionsCont .select-options li[rel='+k+']').css('display','none');	
					}else{
						if( $('#partyOptionsCont .select-options li[rel='+k+']').css('display')=='none' )
							$('#partyOptionsCont .select-options li[rel='+k+']').css('display','inline-block');	
					}
				}else{
					if( $('#partyOptionsCont .select-options li[rel='+k+']').css('display')=='none' )
						$('#partyOptionsCont .select-options li[rel='+k+']').css('display','inline-block');	
				}
			}
		}
	}
	
	if(vizState.filtro=='caidas' || vizState.filtro=='subidas'){
		$('#yearOptionsCont').addClass('filtroDisabled');
		$('#yearOptionsCont .select-styled').addClass('disabled');
	}else{
		$('#yearOptionsCont').removeClass('filtroDisabled');
		$('#yearOptionsCont .select-styled').removeClass('disabled');
	}
	
	if(vizState.year=='2011'){
		for (var k in partidos){
			if(partidos[k].solo15){
				if( $('#partyOptionsCont .select-options li[rel='+k+']').css('display','inline-block') )
					$('#partyOptionsCont .select-options li[rel='+k+']').css('display','none')
			}
		}
	}
	
	
	
	checkLeyenda();
}

function aplicaFiltrosMapa(){
	partiesControl();
	
	if(vizState.flagCambio=='year'){
		for (var k in partidos){
			$('#partyOptionsCont .select-options li[rel='+k+']').text(getNomPartido(k));
		}
		vizState.flagCambio='';
	}
	
	if(vizState.filtro.indexOf('mas_votados')!=-1){
		//vizState.party='';
		if( vizState.geo=='muni' ){
			d3.selectAll('#dataviz path.muniPath')
				.attr('fill',fillPathMuni)
				.attr('fill-opacity',1);
		}else{
			d3.selectAll('#dataviz path.provPath')
				.attr('fill',fillPathProv)
				.attr('fill-opacity',1);
				
			/*if(!tablet){
				d3.selectAll('#dataviz path.muniPath')
					.attr('fill',fillPathMuni)
					.attr('fill-opacity',1);
			}*/
		}
	}else{
		// Esto es para distribución
		//var maxPar;
		//maxPar=parseFloat(d20d[vizState.filtro][vizState.year][vizState.party]['info_rank'][vizState.geo][0][1]);
		
		if( vizState.geo=='muni' ){
			d3.selectAll('#dataviz path.muniPath')
				.attr('fill',fillPathMuni)
				.attr('fill-opacity',fillOpacityMuni);
		}else if(vizState.geo=='prov'){
			d3.selectAll('#dataviz path.provPath')
				.attr('fill',fillPathProv)
				.attr('fill-opacity',fillOpacityProv);
			
			/*if(!tablet){
				d3.selectAll('#dataviz path.muniPath')
					.attr('fill',fillPathMuni)
					.attr('fill-opacity',fillOpacityMuni);
			}*/
		}
	}
	
	// TODO: Ojo, ver si esto se puede aplicar en partiesControl()
	if(vizState.filtro.indexOf('mas_votados')!=-1){
		if( $('#partyOptionsCont .select-options li[rel=-1]').css('display')=='none' ){
			$('#partyOptionsCont .select-options li[rel=-1]').css('display','inline-block');
		}
	}else{
		if( $('#partyOptionsCont .select-options li[rel=-1]').css('display')=='inline-block' ){
			$('#partyOptionsCont .select-options li[rel=-1]').css('display','none');
		}
	}
	
	controlFiltrosByParty();
	cargaRanking();
	checkLeyenda();
	lugarSeleccionadoOff();
	
	$('body').removeClass('waitingData');
}

function iniEventos(){
	
	// Close del clickTtip
	/*$('#clickTtip .buttClose .closeCont').html(svgCloseCode());
	$('#clickTtip .buttClose').click(function(){
		d3.select('#spMap .muniPath.muniSel').classed('muniSel',false);
		$('#clickTtip').fadeOut(300);
	});*/
	
	$('#reload_viz span.icono').html(svgReloadCode());
	$('#reload_viz').click(function(){
		
		if(vizState.year!='2015'){
			vizState.sinCambio=true;
			$('#yearOptionsCont .select-options li[rel=2015]').click();
		}
		
		if(vizState.filtro!='mas_votados'){
			vizState.sinCambio=true;
			$('#filterOptionsCont .select-options li[rel=mas_votados]').click();
		}
		
		partiesControl({forceTodos:true});
		
		//vizState.year='2015';	
		//vizState.filtro='mas_votados';
		//vizState.geo='muni';
		vizState.party='';
		vizState.prov='';
		if(vizState.zoom!='spain'){
			backToSpainZoom();
		}
		
		vizState.tRank='';
		//vizState.flagCambio='';
		vizState.clickAC=false;
		vizState.sinCambio=false;
		
		partiesControl();
		
		if(vizState.geo!='muni'){
			vizState.noQuitesVelo=true;
			$('#renderOptionsCont .select-options li[rel=muni]').click();
			setTimeout(function(){ gimmeData(); },500);
		}else{
			gimmeData();
		}
	});
	
	// Batamantip position event
	$(".tabletNot #dataviz").mousemove(function(e){
		var offS=$(this).offset();
		var relX = e.pageX - offS.left;
		var relY = e.pageY - offS.top;

		if(relX < 70) relX=70;
		if(relX > 570) relX=570;
		if(relY < 100){
			if(relY >80){
				relY=200;
			}else{
				relY=200-(80-relY);
			}
		}

		$('#batamantip').css({top:''+((relY)-86)+'px',left:''+(relX-60)+'px'});
	});
	
	// Zoom back nivel nacional
	$('#backToSpain').on('click',function(){
		backToSpainZoom();
	});
	
	// Botones orden rank
	$('#tipoRanking span').on('click',function(){
		if($(this).hasClass('rank_activo')==false){
			var tRankAct=$(this).attr('id').replace('tipoRanking','');
			var tRank = (tRankAct=='Down') ? '_down' : '' ;
			
			vizState.tRank=tRank;
			$('#tipoRanking .rank_activo').removeClass('rank_activo');
			$(this).addClass('rank_activo');
			
			cargaRanking();
		}
	});
}

function cargaRanking(){
	var htmlRanking='';
	var htmlh2= (vizState.prov=='') ? 'España' : 'Provincia de '+ provs[ parseInt(vizState.prov)-1 ][0];
		
	var htmlh3Info;
	if(vizState.filtro=='distr'){
		htmlh3Info='';
	}else if(vizState.filtro.indexOf('mas_votados')!=-1){
		htmlh3Info=((vizState.geo=='muni' || (vizState.zoom=='prov')) ? 'Municipios' : 'Provincias')  +
			' en ' + ((vizState.geo=='muni' || (vizState.zoom=='prov')) ? 'los' : 'las') +' que cada candidatura es ' + ((vizState.filtro=='mas_votados') ? 'primera' : 'segunda') +' fuerza';
	}else{
		htmlh3Info=((vizState.geo=='muni' || (vizState.zoom=='prov')) ? 'Municipios' : 'Provincias')  +
			' donde más ' + ((vizState.filtro=='caidas') ? ' baja' : ' sube') + ' respecto a 2011 (en puntos porcentuales)';
	}
	
	if(vizState.filtro=='distr'){
		$('#tipoRanking').show();
	}else{
		$('#tipoRanking').hide();
	}
		
	var classElems;
	if(vizState.filtro.indexOf('mas_votados')!=-1){
		classElems='iParty';
	}else if(vizState.geo=='muni' || vizState.zoom=='prov'){
		classElems='iMuni';
	}else{
		classElems='iProv';
	}
		
	if(vizState.filtro.indexOf('mas_votados')!=-1){
		var htmlh3='<span class="t1">Candidatura</span><span class="t2"> Nº</span>';
		
		if(vizState.zoom=='prov'){
			var rankElem=d20d[vizState.filtro][vizState.year]['info_rank']['prov_'+vizState.prov];
		}else{
			var rankElem=d20d[vizState.filtro][vizState.year]['info_rank'][vizState.geo];
		}
		for (var i=0; i<rankElem.length; i++){
			var nom= getNomPartido(rankElem[i][0]);
			var color= getColorPartido(rankElem[i][0]);
			var sClassId=' class="'+classElems+'" id="'+classElems+'_'+rankElem[i][0]+'" ';
			htmlRanking+='<li '+sClassId+'><span class="color_p" style="background-color:'+color+';"></span><span class="txt_p">'+ nom +'</span><span class="data_p">'+spanishFloat(rankElem[i][1])+'</span></li>';			
		}
		
	}else if(vizState.filtro=='distr'){
		var htmlh3='<span class="t1">'+ ((vizState.geo=='muni' || vizState.zoom=='prov') ? 'Municipio' : 'Provincia') +'</span><span class="t2">Porcentaje de votos</span>';
		htmlh3Info=htmlh3;
		var rankElem;

		if(vizState.zoom=='prov'){
			rankElem=d20d[vizState.filtro][vizState.party]['info_rank'][vizState.year]['prov_'+vizState.prov+vizState.tRank];
		}else{
			rankElem=d20d[vizState.filtro][vizState.party]['info_rank'][vizState.year][vizState.geo+vizState.tRank];	
		}

		for(var i=0; i<rankElem.length; i++){
			var nom;
			var sClassId=' class="'+classElems+'" id="'+classElems+'_'+rankElem[i][0]+'" ';
			if(vizState.zoom=='prov'){
				nom=(munis[rankElem[i][0]]) ? munis[rankElem[i][0]][0] : 'Desc' ;
			}else if(vizState.geo=='muni'){
				nom=(munis[rankElem[i][0]]) ? (munis[rankElem[i][0]][0] + ' ('+muniToProv(rankElem[i][0])+')' ) : 'Desc' ;
			}else{
				nom=provs[ parseInt(rankElem[i][0]) - 1 ][0];
			}
			htmlRanking+='<li '+sClassId+'><span class="txt_p">'+ nom +'</span><span class="data_p">'+rankElem[i][1].replace('.',',')+'%</span></li>';			
		}
	}else{
		var htmlh3='<span class="t1">'+ ((vizState.geo=='muni' || vizState.zoom=='prov') ? 'Municipio' : 'Provincia') +'</span><span class="t2">Porcentaje de votos</span>';
		var rankElem;

		if(vizState.zoom=='prov'){
			// TODO: Cuando tengamos ranks provinciales
			rankElem=d20d[vizState.filtro][vizState.party]['info_rank']['prov_'+vizState.prov];
		}else{
			rankElem=d20d[vizState.filtro][vizState.party]['info_rank'][vizState.geo];	
		}
		
		if(rankElem && rankElem[0]){
			for(var i=0; i<rankElem.length; i++){
				var nom;
				var sClassId=' class="'+classElems+'" id="'+classElems+'_'+rankElem[i][0]+'" ';
				if(vizState.zoom=='prov'){
					nom=(munis[''+rankElem[i][0]]) ? munis[''+rankElem[i][0]][0] : 'Desc' ;
				}else if(vizState.geo=='muni'){
					nom=(munis[''+rankElem[i][0]]) ? (munis[''+rankElem[i][0]][0] + ' ('+muniToProv(''+rankElem[i][0])+')' ) : 'Desc' ;
				}else{
					nom=provs[ parseInt(rankElem[i][0]) - 1 ][0];
				}
				htmlRanking+='<li '+sClassId+'><span class="txt_p">'+ nom +'</span><span class="data_p">'+(''+rankElem[i][1]).replace('.',',')+'</span></li>';			
			}
		}else{
			htmlRanking+='No '+( (vizState.filtro=='caidas') ? 'baja' : 'mejora' )+' en ningún'+( (vizState.geo=='prov') ? 'a provincia' : ' municipio con más de 500 electores' );
		}
	}
	
	$('#ranking h2 #titulo_rank').html(htmlh2);
	//('#ranking h3 #info_rank').html(htmlh3Info);
	$('#ranking h3.header').html(htmlh3Info);
	$('#ranking ul').html(htmlRanking);
	
	$('#info #ranking li.'+classElems).off().click(function(){
		if( !$(this).hasClass('iParty') ){
			var idElem=$(this).attr('id').replace(classElems+'_','');
			if(classElems=='iMuni'){
				$('#spMap .muniPath#muni_'+idElem).d3Click();
			}else if(classElems=='iProv'){
				$('#spMap .provPath#path_prov_'+idElem).d3Click();
			}else{
				$('#partyOptionsCont .select-options li[rel='+idElem+']').click();
			}
		}
	})
}

function checkLeyenda(){
	if(d20d[vizState.filtro][vizState.party]){
		if( d20d[vizState.filtro][vizState.party].maxPar[vizState.geo] ){
			$('#dataviz .gradiente_max').text( spanishFloat(d20d[vizState.filtro][vizState.party].maxPar[vizState.geo])+ ((vizState.filtro=='distr') ? '%' : '') );
			if(vizState.filtro=='distr'){
				$('#dataviz .gradiente_titulo span').text('Porcentaje de voto');
			}else{
				$('#dataviz .gradiente_titulo span').text('Puntos porcentuales');
			}
		}else{
			$('#dataviz .gradiente_titulo span').text('' );
			$('#dataviz .gradiente_max').text('0');
			return 0;
		}
	}
	
	if(vizState.filtro.indexOf('mas_votados')!=-1){
		if( $('#dataviz .caja_gradiente').is(':visible') )
			$('#dataviz .caja_gradiente').hide();
	}else{
		if(vizState.filtro=='distr'){
			$('#dataviz .caja_gradiente .gradiente').attr('class','gradiente gradiente_'+vizState.party);
		}else{
			$('#dataviz .caja_gradiente .gradiente').attr('class','gradiente gradiente_'+vizState.filtro);
		}
		
		if( !$('#dataviz .caja_gradiente').is(':visible') )
			$('#dataviz .caja_gradiente').show();
	}
}

function getNomPartido(iPar){
	return ((partidos[iPar]) ? 
		((vizState.year=='2011' && partidos[iPar]['name11']) ? 
			partidos[iPar].name11 : 
			partidos[iPar].name) 
		: '-' );
}

function getColorPartido(iPar){
	return ((partidos[iPar]) ? 
		((vizState.year=='2011' && partidos[iPar]['color11']) ? 
			partidos[iPar].color11 : 
			partidos[iPar].color) 
		: 'black' );
}

function showContent(){
		setTimeout(function() {
		$('#pre').fadeOut(500);
		$('#container').animate({opacity:1},500);
	}, 300);
}

// utilidades básicas
function muniToProv(m){
	return provs[ parseInt(m.substr(0,2)) - 1 ][0];
}

function muniToProvId(m){
	return  m.substr(0,2);
}

function iProvToId(iProv){
	return (iProv+1 >9) ? ''+(iProv+1) : '0'+(iProv+1);
}

function comCode(p){
	for(var i=0;i<provComCodes.length;i++){
		if( parseInt(provComCodes[i][1])  == parseInt(p))
			return provComCodes[i][0];
	}
	return '';
}




function getProvsZooms(){
	for(l=0;l<provs.length;l++){
		var prov=iProvToId(l);
		if(provPaths[prov]){
			var p=d3.select( 'path#path_prov_'+prov ).node();
			var pBBox=p.getBBox();
			var escalaZoom= .85 / Math.max( pBBox.width / width, pBBox.height / height );
			var centro=[pBBox.x + pBBox.width/2, pBBox.y + pBBox.height/2];
			centro[0]=width/2 -centro[0]*escalaZoom;
			centro[1]=height/2 - centro[1]*escalaZoom;
			provPaths[prov]['escalaZoom']=escalaZoom;
			provPaths[prov]['centroZoom']=centro;
		}
	}
}

// Math
function toFloat(n){
	return parseFloat((''+n).replace(',','.'));
}

// Mejora: pasarle como parámetro el número de decimales que queremos
function roundTwo(n){
	return Math.round(n * 100) / 100;
}

function roundThree(n){
	return Math.round(n * 1000) / 1000;
}

function spanishFloat(f){
	var str=''+f;
	str=str.replace('.',',');
	var coma=str.indexOf(',');
	if(coma != -1){
			var ent,dec;
			ent=toSpanishDots(str.substr(0,coma));
			dec=str.substr(coma);
			return ""+ent+dec;
	}else{
			return toSpanishDots(str);
	}
}

function toSpanishDots(num){
	var number = ''+num;
	var result = '';
	while( number.length > 3 ){
		result = '.' + number.substr(number.length - 3) + result;
		number = number.substring(0, number.length - 3);
	}
	result = number + result;
	return result;
}

jQuery.fn.d3Click = function () {
  this.each(function (i, e) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    e.dispatchEvent(evt);
  });
};

function svgCloseCode(){
	return '<svg version="1.1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 25 25" enable-background="new 0 0 25 25" xml:space="preserve"> <metadata> <sfw xmlns="&ns_sfw;"> <slices></slices> <sliceSourceBounds width="20" height="20" x="585.275" y="-430.945" bottomLeftOrigin="true"></sliceSourceBounds> </sfw> </metadata> <g> <g> <path fill="#FFFFFF" d="M18.792,22.5l3.709-3.706c0,0-6.301-5.911-6.301-6.301c0-0.381,6.301-6.289,6.301-6.289L18.792,2.5 c0,0-5.775,6.294-6.305,6.294C11.976,8.792,6.2,2.5,6.2,2.5L2.5,6.202c0,0,6.291,5.868,6.291,6.292 C8.796,12.928,2.5,18.794,2.5,18.794l3.695,3.704c0,0,5.874-6.296,6.291-6.294C12.921,16.203,18.792,22.5,18.792,22.5z"/> </g> </g> </svg>';
}

function svgReloadCode(){
	return '<svg version="1.1"  xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve"><metadata><sfw  xmlns="&ns_sfw;"><slices></slices><sliceSourceBounds  height="17.198" width="16.847" bottomLeftOrigin="true" x="411.708" y="-306.721"></sliceSourceBounds><optimizationSettings><targetSettings  fileFormat="PNG24Format" targetSettingsID="0"><PNG24Format  transparency="true" interlaced="false" matteColor="#FFFFFF" noMatteColor="false" filtered="false"></PNG24Format></targetSettings></optimizationSettings></sfw></metadata><g><path fill="#87868a" d="M15.104,6.403c0.009,0,0.012,0,0.014,0c0.005,0,0.005,0,0.005,0s0,0,0.002,0s0.004,0,0.007,0 s0.002,0,0.002,0s0,0,0.002,0c0.016-0.002,0.024-0.002,0.038-0.002c2.224,0,4.387,0.884,5.986,2.433l1.76-1.784 c0.085-0.082,0.215-0.11,0.319-0.063c0.107,0.044,0.185,0.149,0.185,0.27l-0.293,6.091h-5.726c-0.002,0-0.009,0-0.012,0 c-0.164,0-0.295-0.131-0.295-0.295c0-0.106,0.057-0.202,0.146-0.256l1.735-1.755c-1.031-0.994-2.375-1.54-3.846-1.54 c-3.007,0.019-5.457,2.484-5.457,5.536c0.025,2.993,2.463,5.425,5.501,5.447c1.979-0.107,3.848-1.284,4.739-3.231l2.801,1.335l0,0 c-1.93,3.728-4.966,5.302-8.23,4.967c-4.391-0.349-7.882-4.031-7.911-8.557C6.578,10.293,10.4,6.443,15.104,6.403z"/></g></svg>';
}

function sinTildes(s) {
    var translate_re = /[àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ]/g;
    var translate = 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY';
    return (s.replace(translate_re, function(match){
        return translate.substr(translate_re.source.indexOf(match)-1, 1); })
    );
}

function sinSS(c){
	return c.replace(/\s/g,'');
}

function sinSSP(c){
	return c.replace(/(\s|\.)/g,'');
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function doubleArrayIndexOf(myArray, searchTerm, property){
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}

navigator.sayswho= (function(){
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();

function generaCB(){
	var cb={
		'caidas':{
			'info_map': {
				'muni' : {},
				'prov' : {}
			}
		},
		'subidas':{
			'info_map': {
				'muni' : {},
				'prov' : {}
			}
		}
	};
	
	var v1,v2,vf;
	var maxBajMuni=0;
	var maxSubeMuni=0;
	var maxBajProv=0;
	var maxSubeProv=0;
	for(var k in d20d['distr'][vizState.party].info_map.muni){
		var v1=parseFloat(d20d['distr'][vizState.party].info_map.muni[k][0]);
		var v2=parseFloat(d20d['distr'][vizState.party].info_map.muni[k][1]);
		var vf=roundTwo(v1-v2);
		if(vf<0){
			cb.caidas.info_map.muni[k]=vf;
			if( vf < maxBajMuni ) maxBajMuni=vf;
		}else if(vf>0){
			cb.subidas.info_map.muni[k]=vf;
			if( vf > maxSubeMuni ) maxSubeMuni=vf;
		}	
	}
	cb.caidas.info_map.muni.max=maxBajMuni;
	cb.subidas.info_map.muni.max=maxSubeMuni;
	
	for(var k in d20d['distr'][vizState.party].info_map.prov){
		var v1=parseFloat(d20d['distr'][vizState.party].info_map.prov[k][0]);
		var v2=parseFloat(d20d['distr'][vizState.party].info_map.prov[k][1]);
		var vf=roundTwo(v1-v2);
		if(vf<0){
			cb.caidas.info_map.prov[k]=vf;
			if( vf < maxBajProv ) maxBajProv=vf;
		}else if(vf>0){
			cb.subidas.info_map.prov[k]=vf;
			if( vf > maxSubeProv ) maxBajProv=vf;
		}
	}
	
	cb.caidas.info_map.prov.max=maxBajMuni;
	cb.subidas.info_map.prov.max=maxSubeMuni;
	
	return cb;
}
