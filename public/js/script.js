function validarSessao() {
    const data = JSON.parse(sessionStorage.getItem("@desafio")) || {};
    if (!data.token) {
        location = "login.html";
    } else {
        $("#usuarioLogado").html(`Usuário Autenticado: <strong>${data.nomeUsuario}</strong> <button type="button" onclick="sair()" class="btn btn-sm btn-text text-danger">(Sair)</button>`)
    }

}

function sair() {
    Swal.fire({
        text: 'Tem certeza que deseja sair?',
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar',
    }).then(result => {
        if (result.isConfirmed) {
            sessionStorage.removeItem("@desafio");
            location = "login.html";
        }
    });
}

$('#cadForm').submit(function (evt) {
    evt.preventDefault();
    const form = $("#cadForm").serialize();
    Swal.showLoading();
    $.ajax({
        type: "POST",
        url: "/api/auth/cadastro",
        data: form,
        error: function (e) {
            Swal.fire("Erro!", e.responseJSON.message, "error")
        }
    }).done(function (data) {
        if (data.id) {
            Swal.fire("Sucesso!", "Usuário criado.", "success");
            document.getElementById('cadForm').reset();
        }
    });
});


$('#loginForm').submit(function (evt) {
    evt.preventDefault();
    const form = $("#loginForm").serialize();
    Swal.showLoading();
    $.ajax({
        type: "POST",
        url: "/api/auth",
        data: form,
        error: function (e) {
            Swal.fire("Erro!", e.responseJSON.message, "error")
        }
    }).done(function (data) {
        if (data.token) {
            sessionStorage.setItem("@desafio", JSON.stringify(data));
            location = "index.html";
        }
    });
});

function getToken() {
    const data = JSON.parse(sessionStorage.getItem("@desafio")) || {};
    return data?.token;
}

$('#produtorForm').submit(function (evt) {
    evt.preventDefault();
    const form = $("#produtorForm").serialize();
    Swal.showLoading();
    $.ajax({
        type: "POST",
        url: "/api/produtor",
        data: form,
        headers: {
            authorization: `Bearer ${getToken()}`
        },
        error: function (e) {
            Swal.fire("Erro!", e.responseJSON.message, "error")
        }
    }).done(function (data) {
        if (data.idProdutor) {
            listProdutores()
            document.getElementById("produtorForm").reset();
            Swal.fire("Sucesso", "Produtor cadastrado.", "success")
        }
    });
});

$('#propriedadeForm').submit(function (evt) {
    evt.preventDefault();
    const form = $("#propriedadeForm").serialize();
    Swal.showLoading();
    $.ajax({
        type: "POST",
        url: "/api/propriedade",
        data: form,
        headers: {
            authorization: `Bearer ${getToken()}`
        },
        error: function (e) {
            Swal.fire("Erro!", e.responseJSON.message, "error")
        }
    }).done(function (data) {
        if (data.idPropriedadde) {
            listPropriedades()
            document.getElementById("propriedadeForm").reset();
            Swal.fire("Sucesso", "Propriedade cadastrada.", "success")
        }
    });
});


function listProdutores() {
    $.ajax({
        type: "GET",
        url: "/api/produtor",
        headers: {
            authorization: `Bearer ${getToken()}`
        },
        error: function (e) {
            Swal.fire("Erro!", e.responseJSON.message, "error")
        }
    }).done(function (data) {
        $("#produtorTable").html('')
        $("#select-produtores").html('')
        data.rows.forEach(item => {
            $("#produtorTable").append(`
                <tr>
                    <td>${item.idProdutor}</td>
                    <td>${item.nomeProdutor}</td>
                    <td>${item.cpfProdutor}</td>
                </tr>
            `);
            $("#select-produtores").append(`
                <option value="${item.idProdutor}">${item.nomeProdutor}</option>
            `);
        });
    });
}

function getProdutor() {
    const id = $("#idProdutor").val()
    if (!id) return listProdutores();
    Swal.showLoading();
    $.ajax({
        type: "GET",
        url: `/api/produtor/${id}`,
        headers: {
            authorization: `Bearer ${getToken()}`
        },
        error: function (e) {
            Swal.fire("Erro!", e.responseJSON.message, "error")
        }
    }).done(function (data) {
        $("#produtorTable").html(`
        <tr>
            <td>${data.idProdutor}</td>
            <td>${data.nomeProdutor}</td>
            <td>${data.cpfProdutor}</td>
        </tr>
    `)
        Swal.close();
    });
}

function getPropriedade() {
    const id = $("#idPropriedade").val()
    if (!id) return listPropriedades();
    Swal.showLoading();
    $.ajax({
        type: "GET",
        url: `/api/propriedade/${id}`,
        headers: {
            authorization: `Bearer ${getToken()}`
        },
        error: function (e) {
            Swal.fire("Erro!", e.responseJSON.message, "error")
        }
    }).done(function (data) {
        $("#propriedadesTable").html(`
        <tr>
            <td>${data.idPropriedadde}</td>
            <td>${data.nomePropriedade}</td>
            <td>${data.cadastroRural}</td>
            <td>${data.produtor_id} - ${data.produtor.nomeProdutor}</td>
        </tr>
        `)
        Swal.close();
    });
}

function listPropriedades() {
    $.ajax({
        type: "GET",
        url: "/api/propriedade",
        headers: {
            authorization: `Bearer ${getToken()}`
        },
        error: function (e) {
            Swal.fire("Erro!", e.responseJSON.message, "error")
        }
    }).done(function (data) {
        $("#propriedadesTable").html('')
        data.rows.forEach(item => {
            $("#propriedadesTable").append(`
                <tr>
                    <td>${item.idPropriedadde}</td>
                    <td>${item.nomePropriedade}</td>
                    <td>${item.cadastroRural}</td>
                    <td>${item.produtor_id} - ${item.produtor.nomeProdutor}</td>
                </tr>
            `)
        });
    });
}