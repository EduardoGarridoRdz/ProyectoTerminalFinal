from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Profesor, Proyecto, Capacitacion, EventoAcad, FaseProyecto, TipoProyecto
from django.utils.dateparse import parse_date

# PROYECTO DE INVESTIGACION
@api_view(['POST'])
def guardar_proyecto_investigacion(request):
    data = request.data
    try:
        profesor = Profesor.objects.get(nombre=data['nombreProfesor'])
        tipo = TipoProyecto.objects.get(tipo=data['tipoProyecto'])

        proyecto = Proyecto.objects.create(
            nombre_proyecto=data['proyectoNombre'],
            tipo_proyecto=tipo,
            objetivo=data.get('resultadosImpactos', '-')
        )

        # Aquí podrías guardar en ProfesorProyecto si es necesario

        return Response({"mensaje": "Proyecto guardado correctamente"}, status=201)
    except Profesor.DoesNotExist:
        return Response({"error": "Profesor no encontrado"}, status=404)
    except TipoProyecto.DoesNotExist:
        return Response({"error": "Tipo de proyecto no válido"}, status=400)


# FORMACION INTEGRAL (eventos internos)
@api_view(['POST'])
def guardar_evento_formacion_integral(request):
    data = request.data
    try:
        profesor = Profesor.objects.first()  # Opcional si necesitas asociar a un profe
        evento = EventoAcad.objects.create(
            nombre_evento=data['nombreEvento'],
            fecha_inicio=parse_date(data['fechaEvento']),
            fecha_final=parse_date(data['fechaEvento']),
            id_profesor=profesor  # opcional
        )
        return Response({"mensaje": "Evento académico guardado"}, status=201)
    except Exception as e:
        return Response({"error": str(e)}, status=400)


# FORMULARIO DE CAPACITACION
@api_view(['POST'])
def guardar_capacitacion(request):
    data = request.data
    try:
        profesor = Profesor.objects.get(nombre=data['nombreProfesor'])
        capacitacion = Capacitacion.objects.create(
            id_profesor=profesor,
            evento=data['evento'],
            sede=data['sede'],
            organizador=data['organizador'],
            fecha_inicio=parse_date(data['fechaInicio'])
        )
        return Response({"mensaje": "Capacitación guardada"}, status=201)
    except Profesor.DoesNotExist:
        return Response({"error": "Profesor no encontrado"}, status=404)


# FORMULARIO VINCULACION
@api_view(['POST'])
def guardar_actividad_vinculacion(request):
    data = request.data
    try:
        # Se puede guardar como evento_acad o crear un nuevo modelo si quieres
        evento = EventoAcad.objects.create(
            nombre_evento=data['descripcionActividad'],
            fecha_inicio=parse_date(data['fechaVinculacion']),
            fecha_final=parse_date(data['fechaVinculacion']),
        )
        return Response({"mensaje": "Actividad de vinculación guardada"}, status=201)
    except Exception as e:
        return Response({"error": str(e)}, status=400)
