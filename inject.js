// this is the code which will be injected into a given page...

(function() {
	if (document.location.href.indexOf('hottopic.com') > -1 || document.location.href.indexOf('boxlunch.com') > -1) {
		document.getElementsByClassName('low-inventory-message-pdp')[0].style.display = 'block';
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
	} else if (document.location.href.indexOf('emp.co.uk') > -1) {
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
	} else if (document.location.href.indexOf('funko-shop') > -1) {
		function sleep(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}
		async function demo(amount, multiple) {
			console.log("Checking starting with " + amount + " and decreasing by " + multiple);
			while(true) {
				console.log("checking " + amount);
				document.getElementById('quantity').value = amount;
				document.getElementsByClassName('input-row')[2].children[0].click();
				await sleep(1000);
				text = document.getElementsByClassName("simple-popup")[0].innerHTML;
				console.log(text);
				if (document.getElementById("cart-summary-overlay")) {
					break;
				}
				amount = amount - multiple;
			}
			justAbove = amount + multiple;
			if (amount == 0) {
				amount = 1;
			}
			if (multiple > 1) {
				if (multiple < 100) {
					demo(justAbove, 1);
				} else {
					demo(justAbove, multiple/5);
				}
			}
			wnd = window.open("/cart/change?line=1&quantity=0");
			wnd.close();
			await sleep(500);
			//alert("There are between " + amount + " and " + justAbove + " available");
			console.log("There are " + amount + " available.");
			//location.reload();
		}
		document.getElementsByClassName('input-row')[0].children[1].type = "visible";
		document.getElementsByClassName('input-row')[2].children[0].dataset["limit"] = "false";
		demo(15000, 1000);
	}
})();
