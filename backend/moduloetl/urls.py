# miapp/urls.py
from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from .views import *
from .procesamiento import RecibirArchivo
from .formato_archivo import FormatoArchivo
from .models import Usuario
from . import views_formulario
from .registrar_usuario import crear_usuario
from .editar_usuario import editar_usuario
from .verificar_login import verificar_usuario

router = routers.DefaultRouter()

""" <----------------------- ESTUDIANTES --------------------------> """
router.register(r'ciudad', CiudadViewSet)
router.register(r'egresado', EgresadoViewSet)
router.register(r'estado', EstadoViewSet)
router.register(r'estadoServicio', EstadoServicioViewSet)
router.register(r'estatus', EstatusViewSet)
router.register(r'estudiante', EstudianteViewSet)
router.register(r'idioma', IdiomaViewSet)
router.register(r'nombreTaller', NombreTallerViewSet)
router.register(r'pais', PaisViewSet)
router.register(r'planAcad', PlanAcadViewSet)
router.register(r'practicaProf', PracticaProfViewSet)
router.register(r'proEdu', ProEduViewSet)
router.register(r'servicioSocial', ServicioSociaLViewSet)
router.register(r'situacion', SituacionViewSet)
router.register(r'taller', TallerViewSet)
router.register(r'tutoria', TutoriaViewSet)
router.register(r'tipoingreso', TipoIngresoViewSet)
router.register(r'vinculacionAcad', VinculacionAcadViewSet)
router.register(r'historialSituacion', HistorialSituacionViewSet)
router.register(r'historialEstatus', HistorialEstatusViewSet)


""" <----------------------- PROFESORES --------------------------> """
router.register(r'profesor', ProfesorViewSet)
router.register(r'proyectos', ProyectoViewSet)
router.register(r'tipo_estancia', TipoEstanciaViewSet)
router.register(r'asesorias', AsesoriaViewSet)
router.register(r'estancias', EstanciaViewSet)
router.register(r'tipo_producto', TipoProductoViewSet)
router.register(r'investigaciones', InvestigacionViewSet)
router.register(r'excursiones', ExcursionViewSet)
router.register(r'asignaturas', AsignaturaViewSet)
router.register(r'capacitaciones', CapacitacionViewSet)
router.register(r'tipo_capacitacion', TipoCapacitacionViewSet)
router.register(r'tipo_evento', TipoEventoViewSet)
router.register(r'evento_subcategoria', EventoSubcategoriaViewSet)
router.register(r'tipo_proyecto', TipoProyectoViewSet)
router.register(r'profesor_proyecto', ProfesorProyectoViewSet)
router.register(r'fase_proyecto', FaseProyectoViewSet)
router.register(r'asesoria_int', AsesoriaIntViewSet)
router.register(r'asesoria_ext', AsesoriaExtViewSet)
router.register(r'profesor_estancia', ProfesorEstanciaViewSet)
router.register(r'profesor_investigacion', ProfesorInvestigacionViewSet)
router.register(r'tipo_profesor', TipoProfesorViewSet)
router.register(r'evento_academico', EventoAcadViewSet)
router.register(r'grado_academico', GradoAcademicoViewSet)
router.register(r'estudios', EstudiosViewSet)
router.register(r'grado_asesoria', GradoAsesoriaViewSet)
router.register(r'actividades_inactivo', ActividadesinactivoViewSet)
router.register(r'programa_educativo', ProgramaEducativoViewSet)
router.register(r'sexo', SexoViewSet)
router.register(r'informacion_adicional', InformacionAdicionalViewSet)
router.register(r'formacion_integral_evento', FormacionIntegralEventoViewSet)
router.register(r'actividad_vinculacion', ActividadVinculacionViewSet)
router.register(r'proyecto_tesis', ProyectoTesisViewSet)
router.register(r'formulario_capacitacion', FormularioCapacitacionViewSet)
router.register(r'proyecto_investigacion', ProyectoInvestigacionViewSet)
router.register(r'producto_investigacion', ProductoInvestigacionViewSet)

""" <----------------------- Usuarios --------------------------> """
router.register(r'usuario', UsuarioViewSet)
router.register(r'tipoUsuario', TipoUsuarioViewSet)
router.register(r'departamentos', DepartamentosViewSet)

urlpatterns = [
    path('', include(router.urls)), 
    path('ProcesarExcel/', RecibirArchivo),
    path('FormatoArchivo/', FormatoArchivo),
    path(r'CrearUsuario/', crear_usuario),  # URL para crear usuario
    path(r'EditarUsuario/', editar_usuario),  # URL para editar usuario
    path(r'VerificarUsuario/', verificar_usuario),
    #Profesores
    path("capacitacion/", views_formulario.guardar_capacitacion),
    path("proyectos-investigacion/", views_formulario.guardar_proyecto_investigacion),
    path("formacion-integral/", views_formulario.guardar_evento_formacion_integral),
    path("vinculacion/", views_formulario.guardar_actividad_vinculacion),
 ]