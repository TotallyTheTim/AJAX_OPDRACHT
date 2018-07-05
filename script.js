function showUser(str,type) {
    // console.log(type);
    if(type =="list"){
        if (str == "") {
            document.getElementById("txtHint").innerHTML = "Je moet wel wat intypen hé!";
            return;
        } else {
            askAjax(str, type);
        }
    } else if (type =="info") {
        askAjax(str, type);
    }


}

function askAjax(str, type) {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // document.getElementById("txtHint").innerHTML = this.responseText;
             console.log(this.responseText);
            let obj = JSON.parse(this.responseText);
            // document.getElementById("txtHint").innerHTML = myArr[1];
            if (type=="list") {

                loopID(obj);

            } else if (type=="info") {
                showInfoCountry(obj);
            }
        }
    };
    xmlhttp.open("GET","ajax.php?e="+ type + "&q="+str,true);
    xmlhttp.send();

}

function showInfoCountry(obj){
    out = "";
    document.getElementById("txtHint").innerHTML = "" +
        "Code: " + obj.Code;
}

function loopID(arr){
    out = "";
    i = 0;
    for (i = 0; i < arr.length; i++) {
        out += "<span onclick='showUser(\"" + arr[i] + "\",\"info\")'>" + (i+1) + ". " + arr[i] + "</span><br>";
        document.getElementById("txtHint").innerHTML =  out;
    }
    // console.log(i)
}
