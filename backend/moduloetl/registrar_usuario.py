from rest_framework.decorators import api_view
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Usuario, Contrasena, Tipousuarios, Departamento

@csrf_exempt
@api_view(['POST'])
def crear_usuario(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            try:
                Correo = Usuario.objects.get(correo = data['correo'])
                return HttpResponse(
                    json.dumps({'status': 'error', 'message': 'Correo ya registrado'}),
                    content_type='application/json')
                
            except:
                    

                usuarioComprobacion = Usuario.objects.filter(
                    nombre_usuario = data['nombre'],
                    apellido_pat_usuario = data['apellido_pat'],
                    apellido_mat_usuario = data['apellido_mat'],
                    correo_usuario = data['correo'],
                    id_tipo_usuario = Tipousuarios.objects.get(tipo = data['tipo_usuario']),
                    id_departamento = Departamento.objects.get(nombre_departamento = data['departamento'])
                ).exists()

                if not usuarioComprobacion:
                    contraseña = Contrasena(contrasena = data['contrasena'])

                    usuario = Usuario(
                        nombre_usuario = data['nombre'],
                        apellido_pat_usuario = data['apellido_pat'],
                        apellido_mat_usuario = data['apellido_mat'],
                        correo_usuario = data['correo'],
                        id_contrasena = contraseña,
                        id_tipo_usuario = Tipousuarios.objects.get(tipo = data['tipo_usuario']),
                        id_departamento = Departamento.objects.get(nombre_departamento = data['departamento'])
                    )
                    contraseña.save()
                    usuario.save()
            
                    return HttpResponse(
                        json.dumps({'status': 'success', 'message': 'Usuario registrado correctamente'}),
                        content_type='application/json')
            
            return HttpResponse(
                json.dumps({'status': 'error', 'message': 'El usuario ya existe'}),
                content_type='application/json',
            )

        except Exception as e:
            print(e)
            return HttpResponse(
                json.dumps({'status': 'error', 'message': str(e)}),
                content_type='application/json',
                status=400
            )