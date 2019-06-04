	var izquierda = false;
	var derecha = false;
	$( document ).ready(function() {	
		w4_open();
	});

	function clicktab() {
		if($("#"+this.name).length>0){
			$('#tab_'+this.name).click();
			return;
		}
		var tabs = $('.nav.nav-tabs');
		var id = $(".nav-tabs").children().length; 
	 	var tabId = this.name;
	 	var tab  = this;
	 	$.get(
	 		'/noticia/'+tabId,
	 		function(data){
	 			tabs.append('<li><a href="#' + tabId + '" id="tab_'+tabId+'">'+tab.text.substring(0,10)+'</a> <span> x </span></li>');
	 			var texto = "<p><h2><b>"+data["lead"]+"<b></h2></p><br><p>"+data["cuerpo"]+"</p>";
	 			$('.tab-content').append('<div class="tab-pane" id="' + tabId + '">'+texto+' </div>');
				$('#tab_'+tabId).click();
			}
	 	);
	 	$(".tab-content").scrollTop(0);
	};
	$("#cerrarLeida").click(w3_close);
	$("#abrirLeida").click(w3_open);
	$("#abrirxleer").click(w4_open);
	$("#cerrarxleer").click(w4_close);

	function w3_open() {
		document.getElementById("main").style.marginLeft = "15%";
		document.getElementById("mySidebar").style.width = "15%";
		document.getElementById("mySidebar").style.display = "block";
		if(izquierda){
			w3_close();
			izquierda = false;
	  	}else
	  		izquierda = true;
	}
	function w4_open() {
		document.getElementById("main").style.marginRight = "15%";
		document.getElementById("derecho").style.width = "15%";
		document.getElementById("derecho").style.right = "0";
		document.getElementById("derecho").style.display = "block";
		if(derecha){
			w4_close();
			derecha = false;
	  	}else
	  		derecha = true;
	}
	function w3_close() {
		document.getElementById("main").style.marginLeft = "0%";
		document.getElementById("mySidebar").style.display = "none";
		izquierda = false;
	}
	function w4_close() {
		document.getElementById("main").style.marginRight = "0%";
		document.getElementById("derecho").style.display = "none";
		derecha  = false;
	}
	$(".nav-tabs").on("click", "a", function (e) {
	    e.preventDefault();
	    if (!$(this).hasClass('add-contact')) {
	        $(this).tab('show');
	    }
	})
	.on("click", "span", function () {
	    var anchor = $(this).siblings('a');
	    $(anchor.attr('href')).remove();
	    $(this).parent().remove();
	    $(".nav-tabs li").children('a').first().click();
	});

	function getNoticias(tipo){
		var url,selector
		if(tipo == 0){
			url="/leidas";
			selector="#leidas";
		}
		else{
			url="/porLeer";
			selector = "#xleer";
		}
		$.get(
			'/noticias'+url, 
			function( data ) {
				var aux = "";
				for(var i=0;i<data.length;i++){
					aux+="<li>";
					aux+='<a href="#" class="w3-bar-item w3-button" name="'+data[i]["id"]+'">'+data[i]["titular"]+'</a>';
					aux+="</li>";
					clase="";
				}
				$(selector).html(aux);
				$(selector).find("a").click(clicktab);
			}
		);
	}
	
	setInterval(function(){
		getNoticias(1);
		getNoticias(0);
	}, 5000);
	getNoticias(1);
	getNoticias(0);