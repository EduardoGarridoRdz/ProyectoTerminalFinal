from django.contrib import admin
from .models import *
# Registrar modelos aquí

"""" <--- Registro de modelos de ESTUDIANTES ---> """
admin.site.register(Estudiante)
admin.site.register(ServicioSocial)
admin.site.register(PracticaProf)
admin.site.register(Taller)
admin.site.register(VinculacionAcad)
admin.site.register(Egresado)
admin.site.register(Idioma)
admin.site.register(EstadoServicio)
admin.site.register(Usuario)
admin.site.register(HistorialSituacion)

""" <--- Registro de modelos de PROFESORES ---> """
admin.site.register(Profesor)
admin.site.register(Estudios)
admin.site.register(Actividadesinactivo)
admin.site.register(Proyecto)
admin.site.register(TipoEstancia)
admin.site.register(Capacitacion)
admin.site.register(TipoCapacitacion)
admin.site.register(EventoAcad)
admin.site.register(Departamento)
admin.site.register(GradoAcademico)
admin.site.register(ProEdu)
admin.site.register(TipoProfesor)
admin.site.register(ProfesorProyecto)
