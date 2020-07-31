var MARKET = [];

var STAFF = {};

var MARKET_SHARE = [];

var INVESTOR = {2022:5};		

var CREDIT = { 2035:{'percent':10, 'period':5, 'count':100000000} };

var PROFIT = {};


var START_YEAR = 2020;
var CURRENT_YEAR = 2020;

window.onload = function(){
    for (mar_id in MARKET){
        add_market_card(mar_id);
        MARKET_SHARE.push([]);
    }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getlast(dict){
    var dict_values = Object.values(dict);
    var dict_keys = Object.keys(dict);
    var current_year = CURRENT_YEAR;   
    if(dict_values.length == 0){
        return 0 ;
    }

    if (dict[current_year] !== undefined) {
        current_value = dict[current_year];

    }else if(left_neighbor(dict_keys, current_year) !== false){
        current_value = dict[left_neighbor(dict_keys, current_year)];
    }else{
        current_value = 0;
    }

    return current_value;
}

// Ищем всех соседей слева
function left_neighbor(list, val){
    var left_neigh = [];
    for(x in list){
        if(list[x] < val){
            left_neigh.push(list[x]);
        }
    }
    if(left_neigh.length == 0){
        return false;
    }else{
        return Math.max(...left_neigh);
    }
}


function add_market_card(market_id){
    var elem = document.createElement("div");
    elem.setAttribute("class", 'card mb-4 shadow-sm');
    elem.setAttribute("id", "market_"+market_id);
    
    if (market_id !== undefined){
        var market_name = MARKET[market_id].name;
        var current_specs = MARKET[market_id].specs[CURRENT_YEAR];
    } else {
    	var market_id = MARKET.length
        var market_name = 'Название '+market_id;
        var current_specs = 0;
        MARKET.push({ 'name':market_name, 'specs':{} });
        MARKET_SHARE.push([]);

        let newColor = getRandomColor();
        let newDataset = {
                            label: market_name,
                            backgroundColor: newColor,
                            borderColor: newColor,
                            data: [0],
                            fill: false
                        };
        config.data.datasets.push(newDataset);
        config.data.datasets[market_id+2].data = [];
        chart.update();
    }


    elem.innerHTML = '<div class="card-header">'+
                     '<h4 class="my-0 font-weight-normal" id="card_market_name_'+market_id+'">'+market_name+'</h4>'+
                     '</div><div class="card-body">'+
                     '<h1 class="card-title pricing-card-title" id="specs_market_'+market_id+'">'+current_specs+' спец '+
                     '<small class="text-muted" id="market_year_'+market_id+'">/ '+CURRENT_YEAR+'</small></h1>'+
                     '<ul class="list-unstyled mt-3 mb-4"><li>...</li></ul>'+
                     '<button type="button" class="btn btn-lg btn-block btn-outline-secondary" data-toggle="modal"'+
                     'data-target="#modal'+market_id+'">Настройки</button></div>';
    $( elem ).insertBefore( "#add_market_btn" );
    event.preventDefault();   	
    add_modal(market_id, market_name);
}


function add_modal(market_id, market_name){
    var elem = document.createElement("div");

    elem.innerHTML = '<div class="modal fade" id="modal'+market_id+'" tabindex="-1" role="dialog" aria-labelledby="modal'+market_id+'" aria-hidden="true">'+
                     '<div class="modal-dialog"><div class="modal-content"><div class="modal-header">'+
                     '<h5 class="modal-title" id="modal'+market_id+'">Настройки</h5>'+
                     '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                     '<span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+
                     '<h4 class="mb-3" id="modal_market_name_'+market_id+'">'+market_name+'</h4>'+

                     '<form id="market_settings_'+market_id+'" name="market-form" method="post"><div class="mb-3" >'+
                     '<input name="name" type="text" class="form-control mb-3" placeholder="Название рынка" id="header-elem-'+market_id+'"required></div>'+
                     '<button type="button" class="btn btn-outline-secondary" onclick="adder('+market_id+')">Добавить данные</button>'+
                     '<button type="button" class="btn btn-secondary mx-2" data-dismiss="modal">Закрыть</button>'+
                     '<button type="button" class="btn btn-primary" onclick="AcceptMarketChange( document.getElementById(\'market_settings_'+market_id+'\').elements, '+market_id+
                     ' )">Сохранить</button></form></div></div></div></div>';

    $( elem ).insertBefore( "#add_modal_place" );
    event.preventDefault();
}


function AcceptMarketChange(param, market_id){
	var new_market_name = param[0].value;

	var pp = [];
	for(x in param){
		if(x != 0 & param[x].value != undefined & param[x].value != "" ){
			pp.push( param[x].value );
		}
	}

	const a = pp;
	const b = {};

	for (let i = 0; i < a.length; i += 2) {
	  b[a[i]] = parseInt(a[i + 1])
	}

	// Меняем html + MARKET	
	MARKET[market_id].name = new_market_name;
	MARKET[market_id].specs = b;
	document.getElementById('card_market_name_'+market_id).innerHTML = new_market_name;
	document.getElementById('modal_market_name_'+market_id).innerHTML = new_market_name;

    config.data.datasets[market_id+2].label = new_market_name;
    config.data.datasets[market_id+2].data = [];
    chart.update();
}

function AcceptStaffChange(param){
    console.log(param);
    var pp = [];
    for(x in param){
        if(param[x].value != undefined & param[x].value != "" ){
            pp.push( param[x].value );
        }
    }
    const a = pp;
    const b = {};

    for (let i = 0; i < a.length; i += 2) {
      b[a[i]] = parseInt(a[i + 1])
    }

    // Меняем html + MARKET 
    STAFF = b;
    chart.update();
}


var i = 1;      
function adder(market_id){
    var elem = document.createElement("div");
    elem.setAttribute("class", "row mb-3");
    elem.innerHTML = '<div class="col">'+
				    '<input name="year" type="text" class="form-control" placeholder="Год" required></div><div class="col">'+
				    '<input name="staff" type="text" class="form-control" placeholder="Кол-во сотрудников" required></div>';
				    $( elem ).insertAfter( "#header-elem-"+market_id );
    event.preventDefault();
    i+=1;
}




function ExpencesCalculation(){

}

function ProfitCalculation(){

}