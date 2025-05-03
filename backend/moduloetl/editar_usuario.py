from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from .models import Usuario, Contrasena, Tipousuarios, Departamento
import json


@csrf_exempt
@api_view(['POST', 'PUT', 'DELETE'])
def editar_usuario(request):
    try:

        if request.method == 'POST':
            datos = json.loads(request.body)
            Correo = datos['correo']
            

            if not Correo:
                return Response(
                    {'status': 'error', 'message': 'El correo es obligatorio'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            try:
                usuario = Usuario.objects.get(correo_usuario=Correo)

                datos = {
                    'id': usuario.id_usuario,
                    'nombre': usuario.nombre_usuario,
                    'apellido_pat': usuario.apellido_pat_usuario,
                    'apellido_mat': usuario.apellido_mat_usuario,
                    'correo': usuario.correo_usuario,
                    'contrasena': usuario.id_contrasena.contrasena,
                    'tipo_usuario': usuario.id_tipo_usuario.tipo,
                    'departamento': usuario.id_departamento.nombre_departamento,
                }
                return Response(
                    {'status': 'success', 'data': datos},
                    status=status.HTTP_200_OK
                )
            
            except Usuario.DoesNotExist:
                return Response(
                    {'status': 'error', 'message': 'Usuario no encontrado'},
                    status=status.HTTP_404_NOT_FOUND
                )
        
        elif request.method == 'PUT':
            
            datos = json.loads(request.body)
            Correo = datos['data']['correo']
            

            if not Correo:
                
                return Response(
                    {'status': 'error', 'message': 'El correo es obligatorio'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            try:
                usuario = Usuario.objects.get(correo_usuario=Correo)
                usuario.nombre_usuario = datos['data']['nombre']
                usuario.apellido_pat_usuario = datos['data']['apellido_pat']
                usuario.apellido_mat_usuario = datos['data']['apellido_mat']
                usuario.correo_usuario = datos['data']['correo']
                
                contrasena = Contrasena.objects.get(id_contrasena = usuario.id_contrasena.id_contrasena)
                contrasena.contrasena = datos['data']['contrasena']
                contrasena.save()
                usuario.id_tipo_usuario = Tipousuarios.objects.get(tipo=datos['data']['tipo_usuario'])
                usuario.id_departamento = Departamento.objects.get(nombre_departamento=datos['data']['departamento'])
                usuario.save()
                
                return Response(
                    {'status': 'success', 'message': 'Usuario actualizado correctamente'},
                    status=status.HTTP_200_OK
                )


            except Usuario.DoesNotExist:
                return Response(
                    {'status': 'error', 'message': 'Usuario no encontrado'},
                    status=status.HTTP_404_NOT_FOUND
                )

        elif request.method == 'DELETE':
            datos = json.loads(request.body)
            Correo = datos['data']['correo']

            if not Correo:
                return Response(
                    {'status': 'error', 'message': 'El correo es obligatorio'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:
                usuario = Usuario.objects.get(correo_usuario=Correo)
                contrasena = Contrasena.objects.get(id_contrasena = usuario.id_contrasena.id_contrasena)
                
                usuario.delete()
                contrasena.delete()
                return Response(
                    {'status': 'success', 'message': 'Usuario eliminado correctamente'},
                    status=status.HTTP_200_OK
                )

            except Usuario.DoesNotExist:
                return Response(
                    {'status': 'error', 'message': 'Usuario no encontrado'},
                    status=status.HTTP_404_NOT_FOUND
                )

    except Exception as e:
        return Response(
            {'status': 'error', 'message': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )        