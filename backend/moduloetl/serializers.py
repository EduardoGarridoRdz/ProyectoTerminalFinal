# miapp/serializers.py
from rest_framework import serializers
from datetime import date  ## nuev
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from .models import Profesor, GradoAcademico, ProEdu, TipoProfesor


from .models import * 

""" <----------------------- ESTUDIANTES --------------------------> """
class CiudadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ciudad
        fields = '__all__'

class EgresadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Egresado
        fields = '__all__'

class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estado
        fields = '__all__'


class EstadoServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoServicio
        fields = '__all__'

class EstatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estatus
        fields = '__all__'

class EstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiante
        fields = '__all__'

class IdiomaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idioma
        fields = '__all__'

class NombreTallerSerializer(serializers.ModelSerializer):
    class Meta:
        model = NombreTaller
        fields = '__all__'

class PaisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pais
        fields = '__all__'

class PlanAcadSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanAcad
        fields = '__all__'

class PracticaProfSerializer(serializers.ModelSerializer):
    class Meta:
        model = PracticaProf
        fields = '__all__'

class ProEduSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProEdu
        fields = '__all__'

class ServicioSocialSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicioSocial
        fields = '__all__'

class SituacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Situacion
        fields = '__all__'

class TallerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Taller
        fields = '__all__'

class TipoIngresoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoIngreso
        fields = '__all__'

class TutoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutoria
        fields = '__all__'

class VinculacionAcadSerializer(serializers.ModelSerializer):
    class Meta:
        model = VinculacionAcad
        fields = '__all__'

class HistorialSituacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistorialSituacion
        fields = '__all__'

class HistorialEstatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistorialEstatus
        fields = '__all__'

""" <----------------------- PROFESORES --------------------------> """

class InformacionAdicionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = InformacionAdicional
        fields = '__all__'
        read_only_fields = ['id_informacion_adicional']

class EstudiosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudios
        fields = '__all__'
        read_only_fields = ['id_estudios']
        
class ProfesorSerializer(serializers.ModelSerializer):
    grado_academico_nombre = serializers.CharField(source='id_grado_academico.grado_academico', read_only=True)
    nombre_programa_educativo = serializers.CharField(source='id_programa_educativo.nombre_programa_educativo', read_only=True)
    tipo_profesor = serializers.CharField(source='id_tipo_profesor.tipo_profesor', read_only=True)
    nombre_departamento = serializers.CharField(source='id_departamento.nombre_departamento', read_only=True)

    class Meta:
        model = Profesor
        fields = '__all__'
        read_only_fields = ['id_profesor']

class ProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        fields = '__all__'

class TipoEstanciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoEstancia
        fields = '__all__'

class AsesoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asesoria
        fields = '__all__'

class EstanciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estancia
        fields = '__all__'

class TutoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutoria
        fields = '__all__'

class TipoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoProducto
        fields = '__all__'

class InvestigacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investigacion
        fields = '__all__'

class ExcursionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Excursion
        fields = '__all__'

class AsignaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignatura
        fields = '__all__'

class CapacitacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Capacitacion
        fields = '__all__'

class TipoCapacitacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoCapacitacion
        fields = '__all__'

class TipoEventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoEvento
        fields = '__all__'

class EventoSubcategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventoSubcategoria
        fields = '__all__'

class TipoProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoProyecto
        fields = '__all__'

class ProfesorProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfesorProyecto
        fields = '__all__'

class FaseProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FaseProyecto
        fields = '__all__'

class AsesoriaIntSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsesoriaInt
        fields = '__all__'

class AsesoriaExtSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsesoriaExt
        fields = '__all__'

class ProfesorEstanciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfesorEstancia
        fields = '__all__'

class ProfesorInvestigacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfesorInvestigacion
        fields = '__all__'

class TipoProfesorSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoProfesor
        fields = '__all__'

class EventoAcadSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventoAcad
        fields = '__all__'

class GradoAcademicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GradoAcademico
        fields = '__all__'
        
class GradoAsesoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = GradoAsesoria
        fields = '__all__'

class ActividadesinactivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actividadesinactivo
        fields = '__all__'

class DepartamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields = '__all__'

class ProgramaEducativoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramaEducativo
        fields = '__all__'

class SexoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sexo
        fields = '__all__'

class FormacionIntegralEventoSerializer(serializers.ModelSerializer):    
    class Meta:
        model = FormacionIntegralEvento
        fields = '__all__'
        read_only_fields = ['id_formacion_integral_evento']

class ActividadVinculacionSerializer(serializers.ModelSerializer):
    nombre_profesor = serializers.CharField(source='id_profesor.nombre_profesor', read_only=True)

    class Meta:
        model = ActividadVinculacion
        fields = '__all__'
        read_only_fields = ['id_actividad_vinculacion']

class ProyectoTesisSerializer(serializers.ModelSerializer):
    nombre_profesor = serializers.CharField(source='id_profesor.nombre_profesor', read_only=True)
    fase = serializers.CharField(source='id_fase_proyecto.fase', read_only=True)
    
    class Meta:
        model = ProyectoTesis
        fields = '__all__'
        read_only_fields = ['id_proyecto_tesis']

class FormularioCapacitacionSerializer(serializers.ModelSerializer):
    nombre_profesor = serializers.CharField(source='id_profesor.nombre_profesor', read_only=True)

    class Meta:
        model = FormularioCapacitacion
        fields = '__all__'
        read_only_fields = ['id_formulario_capacitacion']

class ProyectoInvestigacionSerializer(serializers.ModelSerializer):
    nombre_profesor = serializers.CharField(source='id_profesor.nombre_profesor', read_only=True)    
    
    class Meta:
        model = ProyectoInvestigacion
        fields = '__all__'
        read_only_fields = ['id_proyecto_investigacion']

class ProductoInvestigacionSerializer(serializers.ModelSerializer):
    nombre_profesor = serializers.CharField(source='id_profesor.nombre_profesor', read_only=True)    
    nombre_tipo_producto = serializers.CharField(source='id_tipo_producto.tipo_producto', read_only=True)
    
    class Meta:
        model = ProductoInvestigacion
        fields = '__all__'
        read_only_fields = ['id_producto_investigacion']

""" <----------------------- Usuarios --------------------------> """
class UsuarioSerializer(serializers.ModelSerializer):
    contrasena = serializers.StringRelatedField(source='id_contrasena.contrasena')
    tipo_usuario = serializers.StringRelatedField(source='id_tipo_usuario.tipo')
    departamento = serializers.StringRelatedField(source='id_departamento.nombre_departamento')
    class Meta:
        model = Usuario
        fields = ['id_usuario','nombre', 'apellido_pat', 'apellido_mat', 'correo', 'contrasena', 'tipo_usuario', 'departamento']

class TipoUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipousuarios
        fields = '__all__'

class DepartamentosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields = '__all__'

