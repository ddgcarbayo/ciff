$(document).ready(function(){
    function loadInfo(){
        $.getJSON('/world/mock.php',function(info){
            info.forEach(function(data){
                startLight(data.lat, data.lng, 5000, 0x6DAEE1);
            });
        });
    }

    setInterval(loadInfo,1500);
});