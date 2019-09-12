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
		async function test() {
			window.open('https://shop.funko.com/cart/add?id=' + document.getElementsByClassName('product-form__variants no-js')[0].children[0].value + '&quantity=1').close()
			await sleep(500);
			wind = window.open('https://shop.funko.com/cart/change?id=' + document.getElementsByClassName('product-form__variants no-js')[0].children[0].value + '&quantity=99999999999');
			await sleep(1000);
			count = wind.document.getElementsByClassName('js-qty')[0].children[0].value;
			wind.close();
			await sleep(500);
			alert(count + " available.");
			window.open('https://shop.funko.com/cart/change?id=' + document.getElementsByClassName('product-form__variants no-js')[0].children[0].value + '&quantity=0').close();
		}
		test();
	} else if (document.location.href.indexOf('galactictoys') > -1) {
		document.getElementsByClassName('prd_in_stock')[0].innerHTML = /"inventory_quantity":(.*?),/g.exec(document.getElementsByClassName('wrapper main-content')[0].children[0].innerHTML)[1] + document.getElementsByClassName('prd_in_stock')[0].innerHTML;
	}
})();
