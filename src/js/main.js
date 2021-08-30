var apod = (function() {

    return {

        randomDate: function(start, end) {

            let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      
            //Format the date
            let d = date.getDate();
            let m = date.getMonth() + 1; //In JS months start at 0
            let y = date.getFullYear();
      
            //Change the month and day strings so that they match the documented format.
            if(m < 10){
              m = '0'+m
            }
      
            if(d < 10){
              d = '0'+d
            }
      
            return `${y}-${m}-${d}`;
          },

        //Injects the results of the API call into the DOM
        buildDOM: function(result) {
            document.getElementById("apodTitle").innerHTML = result.title;
            
            if(result.media_type ==='video') {
                document.getElementById("apodVideo").display ="block";
                document.querySelector("#apodVideo").style="position: relative"
                document.querySelector("#apodVideo > iframe").src = result.url;
            }else{
                document.getElementById("apodImg").display ="block";
                document.querySelector("#apodVideo").style="position: absolute"
                document.getElementById("apodImg").src = result.url;
            }

            document.getElementById("apodCopyright").innerHTML = result.copyright;
            document.getElementById("apodDate").innerHTML = result.date;
            document.getElementById("apodDesc").innerHTML = result.explanation;
        },

        //Executes an AJAX call to an API.
        getRequest: function() {
            let _this = this;
            //let date = "2013-06-06";
            let date = this.randomDate(new Date(1995, 5, 16), new Date());
            let url = "https://api.nasa.gov/planetary/apod?api_key=23sDEcylCGYXq6gZBEBnPxMgdY735ERpHMqXhpzi&date=" + date;

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (data) {
                _this.buildDOM(data);
            }).catch(function (data) {
                console.log(data);
            });
        },

        //Initialization method.
        init: function() {
            this.getRequest();
        },
    }

})();
apod.init();

document.getElementById('btnRandApod').addEventListener('click',function(){
    apod.getRequest();
}, false);