from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import authenticate
from django.conf import settings
import jwt
import datetime
from .models import Usuario, Contrasena

@csrf_exempt
@api_view(['POST'])
def verificar_usuario(request):
    try:
        # Obtener datos del cuerpo de la petición
        data = json.loads(request.body)
        
        # Cambiar 'correo' por 'email' para coincidir con el frontend
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return JsonResponse(
                {'status': 'error', 'message': 'Email y contraseña son requeridos'},
                status=400
            )
        
        # Autenticar usuario
        try:
            user = Usuario.objects.get(correo_usuario = email)
            
            contraseña = Contrasena.objects.get(id_contrasena = user.id_contrasena.id_contrasena)

            if contraseña.contrasena != password:
                return JsonResponse(
                    {'status': 'error', 'message': 'Contraseña incorrecta'},
                    status=401
                )
        
        # Crear token JWT
            token_payload = {
                'user_id': user.id_usuario,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
                'iat': datetime.datetime.utcnow()
            }
            token = jwt.encode(token_payload, settings.SECRET_KEY, algorithm='HS256')
        
        # Datos de usuario para la respuesta
            
            return JsonResponse({
                'status': 'success',
                'token': token,
                'tipoUsuario': user.id_tipo_usuario.tipo,
            })
        
        except Usuario.DoesNotExist:
            return JsonResponse(
                {'status': 'error', 'message': 'El usuario no existe'},
                status=401
            )
        
    except Exception as e:
        return JsonResponse(
            {'status': 'error', 'message': str(e)},
            status=500
        )