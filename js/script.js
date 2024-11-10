jQuery(document).ready(function() {

    var btnBuscarCiudad = $("#btnBuscarCiudad");

    btnBuscarCiudad.on("click", function(){

        const valorInputCiudad = $("#inputCiudad").val();
        var apiKeyOpenWeather = "011ad86f0b5114dd5b213d5e4e98531b";
        console.log("el valor del input es: " + valorInputCiudad);
        var latitud = 0;
        var longitud = 0;
        var tiempo = 0;
        var humedad = 0;
        var temperaturaMaxima = 0;
        var temperaturaMinima = 0;
        var descripcion;

        $.ajax({
            // la URL para la petición a la api de GEOCODING
            url : `http://api.openweathermap.org/geo/1.0/direct?q=${valorInputCiudad}&limit=1&appid=${apiKeyOpenWeather}`,

            // especifica si será una petición POST o GET
            type : 'GET',

            // el tipo de información que se espera de respuesta
            dataType : 'json',

            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(response) {
                console.log("Usando console.DIR:");
                console.dir(response);//RESPONSE es un array
                console.log("Usando console.LOG:");
                console.log(response);

                for(var valorDeCadaItem of response){//valorDecadaItem iria tomando CADA VALUE (es decir el OBJETO) del array (index: value), NO los index de cada objeto

                    console.log(valorDeCadaItem);
                    console.log("Lo de arriba es el valordecadaitem");

                    for(var propiedadDeCadaItem in valorDeCadaItem){
                        //console.log(propiedad);
                        //console.log("Nombre PROPIEDAD:" + propiedadDeCadaItem + " Valor de esa propiedad: " + valorDeCadaItem[propiedadDeCadaItem]);

                        if(valorDeCadaItem[propiedadDeCadaItem] == "London") {
                            console.log("Nombre: " + valorDeCadaItem[propiedadDeCadaItem]);

                            latitud = valorDeCadaItem["lat"];
                            longitud = valorDeCadaItem["lon"];

                            console.log(latitud)
                            console.log(longitud);

                            var latitudFormat = `${Math.floor(latitud)}.${Math.floor((latitud - Math.floor(latitud)) * 100)}`;
                            var longitudFormat = `${Math.floor(longitud)}.${Math.floor((longitud - Math.floor(longitud)) * 100)}`;
                            console.log(latitudFormat);
                            console.log(longitudFormat);
                        }


                    }
                };


                $.ajax({//Este ajax seria para usar la API OPENWEATHER
                    url: `https://api.openweathermap.org/data/2.5/forecast?lat=${latitud}&lon=${longitud}&appid=011ad86f0b5114dd5b213d5e4e98531b&units=metric`,
        
                    type: 'GET',
        
                    dataType : 'json',
        
                    success: function(response2) {
                        console.log("Usando console.DIR:");
                        console.dir(response2);//RESPONSE es un array
                        console.log("Usando console.LOG:");
                        console.log(response2);

                        for(var propiedad in response2) {
                            if(propiedad == "list"){
                                
                                for(var propiedad2 in response2[propiedad][0]){

                                    if(propiedad2 == "weather") {
                                        console.log(response2[propiedad][0][propiedad2][0]["main"]);
                                        descripcion = response2[propiedad][0][propiedad2][0]["main"];
                                        console.log(descripcion);
                                    }

                                    if(propiedad2 == "main"){
                                        
                                        console.log("abajo");
                                        console.log(response2[propiedad][0][propiedad2]);

                                        tiempo = response2[propiedad][0][propiedad2]["feels_like"];
                                        humedad = response2[propiedad][0][propiedad2]["humidity"];
                                        temperaturaMaxima = response2[propiedad][0][propiedad2]["temp_max"];
                                        temperaturaMinima = response2[propiedad][0][propiedad2]["temp_min"];

                                        console.log(tiempo);
                                        console.log(humedad);
                                        console.log(temperaturaMaxima);
                                        console.log(temperaturaMinima);
                                        
                                        
                                    }

                                }
                                
                            }
                        }



                        contenido = `
                        <div class="card" style="width: 18rem;">
                            
                            <div class="card-body">
                                <h5 class="card-title">${valorInputCiudad}</h5>
                                <p class="card-text">
                                <strong>Condición:</strong> ${descripcion}<br>
                                <strong>Temperatura:</strong> ${tiempo} °C<br>
                                <strong>Humedad:</strong> ${humedad}%<br>
                                <strong>Temp. Máxima:</strong> ${temperaturaMaxima}°C<br>
                                <strong>Temp. Mínima:</strong> ${temperaturaMinima}°C
                                </p>
                            </div>
                            </div>
                        
                        `;

                        $("#resultadoTiempo").append(contenido);
                    },
        
                    //código a ejecutar si la petición falla;
                    error : function(xhr, status) {
                        alert('Disculpe, existió un problema');
                    },
        
                    //código a ejecutar sin importar si la petición falló o no
                    complete : function(xhr, status) {
                        alert('Petición realizada');
                    }
        
                });


            },

            // código a ejecutar si la petición falla;
            error : function(xhr, status) {
                alert( 'Disculpe, existió un problema' );
            },

            // código a ejecutar sin importar si la petición falló o no
            complete : function(xhr, status) {
                alert( 'Petición realizada a la Api GEOCODING' );
            }
        });

        


        
    });



});