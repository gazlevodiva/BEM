var MARKET = [{ 'name':'Украина', 
                'specs':{2020:5, 2021:6, 2022:8, 2023:15},
                    },
              { 'name':'Россия', 
                'specs':{2020:12, 2021:16, 2022:17, 2023:18},
                    },
            ];

var STAFF = {2020:50, 2021:55, 2022:65, 2023:5, 2024: 10};
















var START_YEAR = 2020;
var CURRENT_YEAR = 2020;

window.onload = function(){
    for (mar_id in MARKET){
        add_market_card(mar_id);
    }
}


function add_market_card(market_id){
    var elem = document.createElement("div");
    elem.setAttribute("class", 'card mb-4 shadow-sm');
    elem.setAttribute("id", "market_"+market_id);
    
    if (market_id >=0){
        var market_name = MARKET[market_id].name;        
    } else {
        var market_name = 'Название '+market_id;
    }

    elem.innerHTML = '<div class="card-header">'+
                     '<h4 class="my-0 font-weight-normal">'+market_name+'</h4>'+
                     '</div><div class="card-body">'+
                     '<h1 class="card-title pricing-card-title" id="specs_market_'+market_id+'">'+MARKET[market_id].specs[CURRENT_YEAR]+' спец '+
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
                     '<h4 class="mb-3" id="modal_market_name">'+market_name+'</h4>'+
                     '<form name="market_settings" onsubmit="check_market_settings()"><div class="mb-3">'+
                     '<label for="username">Название рынка</label><div class="input-group">'+
                     '<input type="text" class="form-control" id="market" placeholder="Введите название" required="" value="'+market_name+'">'+
                     '</div></div><div class="mb-3" id="header-elem"><label>2020</label><input type="text" class="form-control" id="" required></div>'+
                     '<button class="btn btn-outline-secondary" onclick="adder()">Добавить дату</button>'+
                     '<button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>'+
                     '<button type="submit" class="btn btn-primary">Сохранить</button></form></div></div></div></div>';

    $( elem ).insertBefore( "#add_modal_place" );
    event.preventDefault();
}

function getlast(dict){
    if (dict[CURRENT_YEAR] === undefined) {
        current_value = Object.values(dict)[Object.values(dict).length-1];
    }else{
        current_value = dict[CURRENT_YEAR];
    }
    return current_value;
}


var i = 1;      
function adder(){
    var elem = document.createElement("div");
    elem.setAttribute("class", "mb-3");
    elem.innerHTML = '<label>'+(CURRENT_YEAR+i)+'</label>'+
    '<input type="text" class="form-control" id="" required>';
    $( elem ).insertAfter( "#header-elem" );
    event.preventDefault();
    i+=1;
}