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
		async function test(high, low) {
			guess = Math.floor((high - low) / 2) + low;
			console.log("High: " + high + " - Low: " + low);
			console.log("checking " + guess);
			if (guess == low) {
				final = guess+1;
				console.log("Final answer: " + final);
				wnd = window.open("/cart/change?line=1&quantity=0");
				wnd.close();
				await sleep(500);
				alert("There are " + final + " available");
				location.reload();
				// document.getElementsByClassName("title")[0].innerText = "THERE ARE " + final + " AVAILABLE.\n\n" + document.getElementsByClassName("title")[0].innerText;
				return;
			}
			document.getElementById('quantity').value = guess;
			document.getElementsByClassName('input-row')[2].children[0].click();
			await sleep(1000);
			if (document.getElementById("cart-summary-overlay")) {  // Guess was too low
				test(high, guess);
			} else {  // Guess was too high
				test(guess, low);
			}
		}
		wnd = window.open("/cart/change?line=1&quantity=0");
		wnd.close();
		document.getElementsByClassName('input-row')[0].children[1].type = "visible";
		document.getElementsByClassName('input-row')[2].children[0].dataset["limit"] = "false";
		document.getElementsByClassName("title")[0].innerHTML = "<div style='color:red'>PLEASE WAIT, CHECKING STOCK...\n\n</div>" + document.getElementsByClassName("title")[0].innerHTML
		test(30000, 0);
	} else if (document.location.href.indexOf('galactictoys') > -1) {
		document.getElementsByClassName('prd_in_stock')[0].innerHTML = /"inventory_quantity":(.*?),/g.exec(document.getElementsByClassName('wrapper main-content')[0].children[0].innerHTML)[1] + document.getElementsByClassName('prd_in_stock')[0].innerHTML;
	}
})();
