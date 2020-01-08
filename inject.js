// this is the code which will be injected into a given page...

(function() {
	if (document.location.href.indexOf('hottopic.com') > -1 || document.location.href.indexOf('boxlunch.com') > -1) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", document.location.href, false );
		xmlHttp.send( null );
		var text = ""
		var html = xmlHttp.responseText;
		var re = /stock&quot;:([0-9]+),/g;
		do {
		    m = re.exec(html);
		    if (m) {
		        text = text + m[1] + " available online.</br>";
		    }
		} while (m);
		alert(text);
	} else if (document.location.href.indexOf('target.com') > -1) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", document.location.href, false );
		xmlHttp.send( null );
		var text = ""
		var html = xmlHttp.responseText;
		var re = /online_available_to_promise_quantity":(.*?),/g;
		var m;
		do {
		    m = re.exec(html);
		    if (m) {
		        text = text + m[1] + " available online.</br>";
		    }
		} while (m);
		alert(text);
//		document.getElementsByClassName('h-margin-b-tight styles__ShippingHeading-s1n8m629-1 pOnoh')[0].innerHTML = text + document.getElementsByClassName('h-margin-b-tight styles__ShippingHeading-s1n8m629-1 pOnoh')[0].innerHTML
	} else if (document.location.href.indexOf('emp.') > -1) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", document.location.href, false );
		xmlHttp.send( null );
		var text = ""
		var html = xmlHttp.responseText;
		var re = /data-available="(.*?)"/g;
		var m;
		do {
		    m = re.exec(html);
		    if (m) {
		        text = text + m[1] + " available online.</br>";
		    }
		} while (m);
		document.getElementsByClassName('product-variations')[0].style.fontSize = '18px';
		document.getElementsByClassName('product-variations')[0].innerHTML = text;
	} else if (document.location.href.indexOf('funko') > -1) {
		function sleep(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}
		async function get_status(count, id) {
			status = 0;
			p = jQuery.post('/cart/add.js', {quantity: count, id: id}, function f() {status=1;});
			await sleep(1000);
			return status;
		}
		async function test(high, low, id, title) {
			guess = Math.floor((high - low) / 2) + low;
			console.log("High: " + high + " - Low: " + low);
			console.log("checking " + guess);
			document.getElementsByClassName("product-single__title")[0].innerHTML = "<div style='color:red'>PLEASE WAIT, CHECKING STOCK...\n\n</div>" 
			+ "<div>Checking " + guess + "\n\n</div>" 
			+ title;
			if (guess == low) {
				final = guess+1;
				console.log("Final answer: " + final);
				wnd = window.open("/cart/change?line=1&quantity=0");
				setTimeout(function(){
				   wnd.close(); 
				}, 100);
				await sleep(500);
				alert("There are " + final + " available");
				location.reload();
				return;
			}
			p = jQuery.post('/cart/add.js', {quantity: guess, id: id});
			await sleep(1000);
			if (p.status == 200) {  // Guess was too low
				test(high, guess, id, title);
			} else {  // Guess was too high
				test(guess, low, id, title);
			}
		}
		wnd = window.open("/cart/change?line=1&quantity=0");
		wnd.close();
		title = document.getElementsByClassName("product-single__title")[0].innerHTML;
		document.getElementsByClassName("product-single__title")[0].innerHTML = "<div style='color:red'>PLEASE WAIT, CHECKING STOCK...\n\n</div>" + title;
		id = document.getElementsByClassName('product-form__variants no-js')[0].children[0].value
		test(30000, 0, id, title);
	} else if (document.location.href.indexOf('galactictoys') > -1) {
		document.getElementsByClassName('prd_in_stock')[0].innerHTML = /"inventory_quantity":(.*?),/g.exec(document.getElementsByClassName('wrapper main-content')[0].children[0].innerHTML)[1] + document.getElementsByClassName('prd_in_stock')[0].innerHTML;
	}
})();
