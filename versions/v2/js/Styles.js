var Market = [];
var id = 0;

function add_market(){
    var elem = document.createElement("div");
    elem.innerHTML = ' <div class="card mb-4 shadow-sm"><div class="card-header"><h4 class="my-0 font-weight-normal">Название '+id+'</h4></div>'+
    '<div class="card-body"><h1 class="card-title pricing-card-title">0 спец <small class="text-muted">/ 2020</small></h1><ul class="list-unstyled mt-3 mb-4">'+
    '<li>...</li></ul><button type="button" class="btn btn-lg btn-block btn-outline-secondary " data-toggle="modal" data-target="#exampleModal">Настройки</button></div></div>';
    $( elem ).insertBefore( "#add_market_btn" );
    event.preventDefault();
    Market.push({'id':id, 
    			'name':name, 
    			'res':[],
    		});
   	id+=1;
}
