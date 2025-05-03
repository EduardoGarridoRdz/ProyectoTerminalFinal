from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *
from django.views.decorators.csrf import csrf_exempt

""" <----------------------- ESTUDIANTES --------------------------> """
class CiudadViewSet(viewsets.ModelViewSet):
    queryset = Ciudad.objects.all()
    serializer_class = CiudadSerializer

class EgresadoViewSet(viewsets.ModelViewSet):
        queryset = Egresado.objects.all()
        serializer_class = EgresadoSerializer

class EstadoViewSet(viewsets.ModelViewSet):
        queryset = Estado.objects.all()
        serializer_class = EstadoSerializer

class EstadoServicioViewSet(viewsets.ModelViewSet):
        queryset = EstadoServicio.objects.all()
        serializer_class = EstadoServicioSerializer

class EstatusViewSet(viewsets.ModelViewSet):
        queryset = Estatus.objects.all()
        serializer_class = EstatusSerializer

class EstudianteViewSet(viewsets.ModelViewSet):
        queryset = Estudiante.objects.all()
        serializer_class = EstudianteSerializer

class IdiomaViewSet(viewsets.ModelViewSet):
        queryset = Idioma.objects.all()
        serializer_class = IdiomaSerializer

class NombreTallerViewSet(viewsets.ModelViewSet):
        queryset = NombreTaller.objects.all()
        serializer_class = NombreTallerSerializer

class PaisViewSet(viewsets.ModelViewSet):
        queryset = Pais.objects.all()
        serializer_class = PaisSerializer

class PlanAcadViewSet(viewsets.ModelViewSet):
        queryset = PlanAcad.objects.all()
        serializer_class = PlanAcadSerializer

class PracticaProfViewSet(viewsets.ModelViewSet):
        queryset = PracticaProf.objects.all()
        serializer_class = PracticaProfSerializer

class ProEduViewSet(viewsets.ModelViewSet):
        queryset = ProEdu.objects.all()
        serializer_class = ProEduSerializer

class ServicioSociaLViewSet(viewsets.ModelViewSet):
        queryset = ServicioSocial.objects.all()
        serializer_class = ServicioSocialSerializer

class SituacionViewSet(viewsets.ModelViewSet):
        queryset = Situacion.objects.all()
        serializer_class = SituacionSerializer

class TallerViewSet(viewsets.ModelViewSet):
        queryset = Taller.objects.all()
        serializer_class = TallerSerializer

class TutoriaViewSet(viewsets.ModelViewSet):
        queryset = Tutoria.objects.all()
        serializer_class = TutoriaSerializer

class TipoIngresoViewSet(viewsets.ModelViewSet):
      queryset = TipoIngreso.objects.all()
      serializer_class = TipoIngresoSerializer

class VinculacionAcadViewSet(viewsets.ModelViewSet):
        queryset = VinculacionAcad.objects.all()
        serializer_class = VinculacionAcadSerializer

class HistorialSituacionViewSet(viewsets.ModelViewSet):
        queryset = HistorialSituacion.objects.all()
        serializer_class = HistorialSituacionSerializer

class HistorialEstatusViewSet(viewsets.ModelViewSet):
      queryset = HistorialEstatus.objects.all()
      serializer_class = HistorialEstatusSerializer

""" <----------------------- PROFESORES --------------------------> """
class ProfesorViewSet(viewsets.ModelViewSet):
        queryset = Profesor.objects.all()
        serializer_class = ProfesorSerializer

class ProyectoViewSet(viewsets.ModelViewSet):
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer

class TipoEstanciaViewSet(viewsets.ModelViewSet):
    queryset = TipoEstancia.objects.all()
    serializer_class = TipoEstanciaSerializer

class AsesoriaViewSet(viewsets.ModelViewSet):
    queryset = Asesoria.objects.all()
    serializer_class = AsesoriaSerializer

class EstanciaViewSet(viewsets.ModelViewSet):
    queryset = Estancia.objects.all()
    serializer_class = EstanciaSerializer

class TutoriaViewSet(viewsets.ModelViewSet):
    queryset = Tutoria.objects.all()
    serializer_class = TutoriaSerializer

class TipoProductoViewSet(viewsets.ModelViewSet):
    queryset = TipoProducto.objects.all()
    serializer_class = TipoProductoSerializer

class InvestigacionViewSet(viewsets.ModelViewSet):
    queryset = Investigacion.objects.all()
    serializer_class = InvestigacionSerializer

class ExcursionViewSet(viewsets.ModelViewSet):
    queryset = Excursion.objects.all()
    serializer_class = ExcursionSerializer

class AsignaturaViewSet(viewsets.ModelViewSet):
    queryset = Asignatura.objects.all()
    serializer_class = AsignaturaSerializer

class CapacitacionViewSet(viewsets.ModelViewSet):
    queryset = Capacitacion.objects.all()
    serializer_class = CapacitacionSerializer

class TipoCapacitacionViewSet(viewsets.ModelViewSet):
    queryset = TipoCapacitacion.objects.all()
    serializer_class = TipoCapacitacionSerializer

class TipoEventoViewSet(viewsets.ModelViewSet):
    queryset = TipoEvento.objects.all()
    serializer_class = TipoEventoSerializer

class EventoSubcategoriaViewSet(viewsets.ModelViewSet):
    queryset = EventoSubcategoria.objects.all()
    serializer_class = EventoSubcategoriaSerializer

class TipoProyectoViewSet(viewsets.ModelViewSet):
    queryset = TipoProyecto.objects.all()
    serializer_class = TipoProyectoSerializer

class ProfesorProyectoViewSet(viewsets.ModelViewSet):
    queryset = ProfesorProyecto.objects.all()
    serializer_class = ProfesorProyectoSerializer

class FaseProyectoViewSet(viewsets.ModelViewSet):
    queryset = FaseProyecto.objects.all()
    serializer_class = FaseProyectoSerializer

class AsesoriaIntViewSet(viewsets.ModelViewSet):
    queryset = AsesoriaInt.objects.all()
    serializer_class = AsesoriaIntSerializer

class AsesoriaExtViewSet(viewsets.ModelViewSet):
    queryset = AsesoriaExt.objects.all()
    serializer_class = AsesoriaExtSerializer

class ProfesorEstanciaViewSet(viewsets.ModelViewSet):
    queryset = ProfesorEstancia.objects.all()
    serializer_class = ProfesorEstanciaSerializer

class ProfesorInvestigacionViewSet(viewsets.ModelViewSet):
    queryset = ProfesorInvestigacion.objects.all()
    serializer_class = ProfesorInvestigacionSerializer

class TipoProfesorViewSet(viewsets.ModelViewSet):
    queryset = TipoProfesor.objects.all()
    serializer_class = TipoProfesorSerializer

class EventoAcadViewSet(viewsets.ModelViewSet):
    queryset = EventoAcad.objects.all()
    serializer_class = EventoAcadSerializer

class GradoAcademicoViewSet(viewsets.ModelViewSet):
    queryset = GradoAcademico.objects.all()
    serializer_class = GradoAcademicoSerializer

class EstudiosViewSet(viewsets.ModelViewSet):
    queryset = Estudios.objects.all()
    serializer_class = EstudiosSerializer

class GradoAsesoriaViewSet(viewsets.ModelViewSet):
    queryset = GradoAsesoria.objects.all()
    serializer_class = GradoAsesoriaSerializer

class ActividadesinactivoViewSet(viewsets.ModelViewSet):
    queryset = Actividadesinactivo.objects.all()
    serializer_class = ActividadesinactivoSerializer

class ProgramaEducativoViewSet(viewsets.ModelViewSet):
    queryset = ProgramaEducativo.objects.all()
    serializer_class = ProgramaEducativoSerializer

class SexoViewSet(viewsets.ModelViewSet):
    queryset = Sexo.objects.all()
    serializer_class = SexoSerializer

class InformacionAdicionalViewSet(viewsets.ModelViewSet):
    queryset = InformacionAdicional.objects.all()
    serializer_class = InformacionAdicionalSerializer

class FormacionIntegralEventoViewSet(viewsets.ModelViewSet):
    queryset = FormacionIntegralEvento.objects.all()
    serializer_class = FormacionIntegralEventoSerializer

class ActividadVinculacionViewSet(viewsets.ModelViewSet):
    queryset = ActividadVinculacion.objects.all()
    serializer_class = ActividadVinculacionSerializer

class ProyectoTesisViewSet(viewsets.ModelViewSet):
    queryset = ProyectoTesis.objects.all()
    serializer_class = ProyectoTesisSerializer

class FormularioCapacitacionViewSet(viewsets.ModelViewSet):
    queryset = FormularioCapacitacion.objects.all()
    serializer_class = FormularioCapacitacionSerializer

class ProyectoInvestigacionViewSet(viewsets.ModelViewSet):
    queryset = ProyectoInvestigacion.objects.all()
    serializer_class = ProyectoInvestigacionSerializer

class ProductoInvestigacionViewSet(viewsets.ModelViewSet):
    queryset = ProductoInvestigacion.objects.all()
    serializer_class = ProductoInvestigacionSerializer

""" <----------------------- Usuarios --------------------------> """
class UsuarioViewSet(viewsets.ModelViewSet):
      queryset = Usuario.objects.all()
      serializer_class = UsuarioSerializer

class TipoUsuarioViewSet(viewsets.ModelViewSet):
      queryset = Tipousuarios.objects.all()
      serializer_class = TipoUsuarioSerializer

class DepartamentosViewSet(viewsets.ModelViewSet):
      queryset = Departamento.objects.all()
      serializer_class = DepartamentosSerializer