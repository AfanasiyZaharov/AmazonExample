var res = $('.s-result-item');
console.log(res);
console.log('onconsole');
var test = "123123123";
var forPopup = $('#bottomBar');


var forPopup2 = $('#searchTemplate');
//forPopup2.append('<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="modal-dialog" role="document"><div class="modal-content"> <div class="modal-header"><div class="modal-body">' +res[0].innerHTML + '</div></div></div></div></div')
var HTMLforPopUp1 = '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="modal-dialog" role="document"><div class="modal-content"> <div class="modal-header"><div class="modal-body">';
var HTMLforPopUp2 = '</div></div></div></div></div>';
/*forPopup2.append( '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>');
*/
var restext = HTMLforPopUp1;
for(var i = 0; i<res.length; i++){
	restext = restext + res[i].innerHTML;
};
//console.log(res[0].innerHTML);
//restext = restext + HTMLforPopUp2;
//$('body').append(restext);
//console.log(restext);
//console.log(res[0].baseURI);
var URL = res[0].baseURI;
var resMatch = URL.match('page=');
if(resMatch!=null){
	var index = URL.indexOf('page=');
	var pageNumber = URL.substring(index);
	pageNumber = pageNumber.substring(0,6);
	console.log(pageNumber);
	pageNumber = pageNumber.replace(/\D+/g,"")
	//console.log(pageNumber);
	var URLforAjax = URL.replace(/page=\d/g, "");
	var pageNumber1 = +pageNumber + 1;
	var pageNumber2 = +pageNumber + 2;
	pageNumber = '&page=' + pageNumber1;
	pageNumber2 = '&page=' + pageNumber2;
	console.log(pageNumber);
	var URLforAjax1 = URLforAjax + pageNumber;
	var URLforAjax2  = URLforAjax + pageNumber2;
	console.log(URLforAjax1);
	var HTML = "";

	$.ajax({
		url: URLforAjax1,
		success: function(html){
			console.log(URLforAjax1);
			HTML = HTML + getItensfromHTML(html);
			console.log('success1');
			$.ajax({
				url: URLforAjax2,
				success: function(html){
					console.log(URLforAjax2);
					HTML = HTML + getItensfromHTML(html);
					//console.log(HTML);
					console.log('success2');
					forPopup.append( ' <div class="container"><div class = "row"><button type="button" class="btn btn-default" data-toggle="modal" data-target="#myModal" >getInPopup</button></div></div>' );
					restext = restext + HTML+ HTMLforPopUp2;
					$('body').append(restext);
				},
				error: function(error){
					console.log(error);
				}
			})
		},
		error: function(error){
			console.log(error);
		}
	});
}else{
	var URLforAjax1 = URL + "&page=2";
	var URLforAjax2 = URL + "&page=3";
	var HTML = "";
	$.ajax({
		url: URLforAjax1,
		success: function(html){
			console.log(URLforAjax1);
			HTML = HTML + getItensfromHTML(html);
			console.log('success1');
			$.ajax({
				url: URLforAjax2,
				success: function(html){
					console.log(URLforAjax2);
					HTML = HTML + getItensfromHTML(html);
					//console.log(HTML);
					console.log('success2');
					forPopup.append( ' <div class="container"><div class = "row"><button type="button" class="btn btn-default" data-toggle="modal" data-target="#myModal" >getInPopup</button></div></div>' );
					restext = restext + HTML+ HTMLforPopUp2;
					$('body').append(restext);
				},
				error: function(error){
					console.log(error);
				}
			})
		},
		error: function(error){
			console.log(error);
		}
	});

}
	/*setTimeout(function(){
		restext = restext + HTML+ HTMLforPopUp2;
		$('body').append(restext);
		console.log('ready');
	}, 6500);
}*/


function getItensfromHTML(html){
		HTML = html;
		
		var indexA = HTML.indexOf('<div id="atfResults"');
		HTML =  HTML.substring(indexA);
		
		indexA = HTML.indexOf("P.now('A'");
			HTML = HTML.substring(0, indexA);
		indexA = HTML.indexOf('<div id="paRightContent"');
		var HTML1 = HTML.substring(0, indexA);
		
		indexA = HTML.indexOf('<div id="btfResults"');
		var HTML2 = HTML.substring(indexA);
		HTML = HTML1 + HTML2;
		indexA = HTML.indexOf('<script type="text/javascript">');
		HTML = HTML.substring(0, indexA);
		return HTML;

}



