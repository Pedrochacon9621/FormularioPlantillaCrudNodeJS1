$(function () {
    $('#btn_mostrarTodos').on('click', function (){
        $.ajax({
            url: '/seleccionarTodos',
            success: function (personas) {
                let tbody = $('#tbody');
                tbody.empty();
               personas.forEach(persona =>{
                tbody.append(`
                <tr>
                <td class="id">${persona.id}</td>
                <td>
                    <input type="text" class="nombre" value="${persona.nombre}">
                </td>
                <td>
                    <input type="text" class="apellido" value="${persona.apellido}">
                </td>
                <td>
                    <input type="text" class="cedula" value="${persona.cedula}">
                </td>
                <td>
                    <button class="delete-button">Eliminar</button>
                    <button class="update-button">Actualizar</button>
                </td>
            </tr>
                `)
               })
            }
        })
    });

    $('#tabla1').on('click', '.update-button', function () {
        let row = $(this).closest('tr');
        let id = row.find('.id').text();
        let nombre = row.find(".nombre").val();
        let apellido = row.find(".apellido").val();
        let cedula =row.find(".cedula").val();

        $.ajax({
            url: '/actualizar/' + id,
            method: 'PUT',
            data:{
                nombre: nombre,
                apellido: apellido,
                cedula: cedula
            },
            success: function () {
                
                //$('#btn_mostrarTodos').click();
            }
        })
    });

    $('#tabla1').on('click', '.delete-button', function () {
        let row = $(this).closest('tr');
        let id = row.find('.id').text();

        $.ajax({
            url: '/eliminar/' + id,
            method: 'DELETE',
            success: function () {
                $('#btn_mostrarTodos').click();
            }
        })
    })

    $('#form_cedula').on('submit', function (e) {
       e.preventDefault();
       let cedula = $('#cedulaB').val();
       let url = `/buscarCedula?cedula=${cedula}`;
        
        $.ajax({
            url: url,
            success: function (responses) {
                
                let tbody = $('#tbody');
                tbody.empty();
               responses.forEach( response=>{
                tbody.append(`
                <tr>
                <td class="id">${response.id}</td>
                <td>
                    <input type="text" class="nombre" value="${response.nombre}">
                </td>
                <td>
                    <input type="text" class="apellido" value="${response.apellido}">
                </td>
                <td>
                    <input type="text" class="cedula" value="${response.cedula}">
                </td>
                <td>
                    <button class="delete-button">Eliminar</button>
                    <button class="update-button">Actualizar</button>
                </td>
            </tr>
                `)
               })

                
            }
        })
    })
})