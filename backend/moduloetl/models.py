# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

class Actividadesinactivo(models.Model):
    id_actividad = models.AutoField(primary_key=True)
    id_profesor = models.ForeignKey('Profesor', models.DO_NOTHING, db_column='id_profesor')
    cartaautorizacion = models.BinaryField()
    institucion = models.CharField(max_length=255)
    cartaaceptacioninst = models.BinaryField()
    nombproyecto = models.CharField(max_length=255)
    fechainicio = models.DateField()
    fechafinal = models.DateField()
    cartareincorporacion = models.BinaryField()

    class Meta:
        managed = False
        db_table = 'actividadesInactivo'


class Asesoria(models.Model):
    id_asesoria = models.IntegerField(primary_key=True)
    tipo_asesoria = models.BooleanField()
    id_grado_asesoria = models.ForeignKey('GradoAsesoria', models.DO_NOTHING, db_column='id_grado_asesoria')
    id_fases_proyecto = models.ForeignKey('FaseProyecto', models.DO_NOTHING, db_column='id_fases_proyecto')
    institucion = models.CharField(max_length=255)
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()
    recursos = models.BooleanField()

    class Meta:
        managed = True
        db_table = 'asesoria'


class AsesoriaExt(models.Model):
    id_asesoria = models.OneToOneField(Asesoria, models.DO_NOTHING, db_column='id_asesoria', primary_key=True)
    id_profesor = models.ForeignKey('Profesor', models.DO_NOTHING, db_column='id_profesor')
    nombre_asesorado = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'asesoria_ext'


class AsesoriaInt(models.Model):
    id_asesoria = models.OneToOneField(Asesoria, models.DO_NOTHING, db_column='id_asesoria', primary_key=True)
    id_profesor = models.ForeignKey('Profesor', models.DO_NOTHING, db_column='id_profesor')
    id_estudiante = models.ForeignKey('Estudiante', models.DO_NOTHING, db_column='id_estudiante')

    class Meta:
        managed = False
        db_table = 'asesoria_int'


class Asignatura(models.Model):
    id_asignatura = models.AutoField(primary_key=True)
    nombre_asignatura = models.CharField(max_length=255)
    id_plan_acad = models.ForeignKey('PlanAcad', models.DO_NOTHING, db_column='id_plan_acad')
    clave = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'asignatura'

class Capacitacion(models.Model):
    id_capacitacion = models.AutoField(primary_key=True)
    id_profesor = models.ForeignKey('Profesor', models.DO_NOTHING, db_column='id_profesor')
    id_tipo_capacitacion = models.ForeignKey('TipoCapacitacion', models.DO_NOTHING, db_column='id_tipo_capacitacion')
    evento = models.CharField(max_length=30)
    sede = models.CharField(max_length=255)
    organizador = models.CharField(max_length=255)
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()

    class Meta:
        managed = False
        db_table = 'capacitacion'


class Ciudad(models.Model):
    id_ciudad = models.AutoField(primary_key=True)
    id_estado = models.ForeignKey('Estado', models.DO_NOTHING, db_column='id_estado')
    id_pais = models.ForeignKey('Pais', models.DO_NOTHING, db_column='id_pais')
    nombre_ciudad = models.CharField(max_length=50)

    class Meta:
        managed = True
        db_table = 'ciudad'


class Contrasena(models.Model):
    id_contrasena = models.AutoField(primary_key=True)
    contrasena = models.CharField(max_length=255)

    class Meta:
        managed = True
        db_table = 'contrasena'


class Departamento(models.Model):
    id_departamento = models.AutoField(primary_key=True)
    nombre_departamento = models.CharField(max_length=255)
    
    class Meta:
        managed = False
        db_table = 'departamento'

class ProgramaEducativo(models.Model):
    id_programa_educativo = models.AutoField(primary_key=True)
    nombre_programa_educativo = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre_programa_educativo
    
    class Meta:
        managed = False
        db_table = 'programa_educativo'
        
class Egresado(models.Model):
    id_egresado = models.AutoField(primary_key=True)
    id_estudiante = models.ForeignKey('Estudiante', models.DO_NOTHING, db_column='id_estudiante')
    email = models.CharField(max_length=50)
    telefono = models.CharField(max_length=10)
    telefono_casa = models.CharField(max_length=10)
    red_social = models.CharField(max_length=255)

    class Meta:
        managed = True
        db_table = 'egresado'


class Estado(models.Model):
    id_estado = models.AutoField(primary_key=True)
    nombre_estado = models.CharField(max_length=255)

    class Meta:
        managed = True
        db_table = 'estado'


class EstadoServicio(models.Model):
    id_estado = models.AutoField(primary_key=True)
    estado = models.CharField(max_length=15)

    class Meta:
        managed = True
        db_table = 'estado_servicio'


class Estancia(models.Model):
    id_estancia = models.AutoField(primary_key=True)
    id_tipo_estancia = models.ForeignKey('TipoEstancia', models.DO_NOTHING, db_column='id_tipo_estancia')
    id_ciudad = models.ForeignKey(Ciudad, models.DO_NOTHING, db_column='id_ciudad')

    class Meta:
        managed = False
        db_table = 'estancia'


class Estatus(models.Model):
    id_estatus = models.AutoField(primary_key=True)
    estatus = models.CharField(max_length=30)

    class Meta:
        managed = True
        db_table = 'estatus'


class Estudiante(models.Model):
    id_estudiante = models.AutoField(primary_key=True)
    matricula = models.CharField(unique=True, max_length=11)
    nombre = models.CharField(max_length=60)
    curp = models.CharField(max_length=20)
    direccion = models.CharField(max_length=60)
    email_personal = models.CharField(max_length=60)
    telefono = models.CharField(max_length=10)
    iems_procedencia = models.CharField(max_length=255)
    generacion = models.CharField(max_length=255)
    id_tipo_ingreso = models.ForeignKey('TipoIngreso', models.DO_NOTHING, db_column='id_tipo_ingreso')
    fecha_ingreso = models.DateField()
    discapacidad = models.BooleanField()
    nombre_discapacidad = models.CharField(max_length=255)
    id_pro_edu = models.ForeignKey('ProEdu', models.DO_NOTHING, db_column='id_pro_edu')
    id_situacion = models.ForeignKey('Situacion', models.DO_NOTHING, db_column='id_situacion')
    motivo_situacion = models.CharField(max_length=255)
    id_estatus = models.ForeignKey(Estatus, models.DO_NOTHING, db_column='id_estatus')
    beca = models.BooleanField()
    tipo_beca = models.CharField(max_length=255)
    creditos = models.FloatField()
    derecho_servicio_social = models.BooleanField()
    fecha_nac = models.DateField()
    sexo = models.BooleanField()
    hablante_indigena = models.BooleanField()
    nombre_lengua = models.CharField(max_length=255)
    promedio = models.FloatField()
    titulado = models.BooleanField()

    class Meta:
        managed = True
        db_table = 'estudiante'


class Estudios(models.Model):
    id_estudios = models.AutoField(primary_key=True)
    id_profesor = models.ForeignKey('Profesor', models.DO_NOTHING, db_column='id_profesor')
    grado_actual = models.CharField(max_length=255)
    grado_estudiando = models.CharField(max_length=255)
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()
    nombre_institucion = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'estudios'


class EventoAcad(models.Model):
    id_evento_acad = models.AutoField(primary_key=True)
    id_profesor = models.ForeignKey('Profesor', models.DO_NOTHING, db_column='id_profesor')
    id_tipo_evento = models.ForeignKey('TipoEvento', models.DO_NOTHING, db_column='id_tipo_evento')
    id_evento_subcategoria = models.ForeignKey('EventoSubcategoria', models.DO_NOTHING, db_column='id_evento_subcategoria')
    nombre_evento = models.CharField(max_length=255)
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()

    class Meta:
        managed = False
        db_table = 'evento_acad'


class EventoSubcategoria(models.Model):
    id_evento_subcategoria = models.AutoField(primary_key=True)
    subcategoria = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'evento_subcategoria'


class Excursion(models.Model):
    id_excursion = models.AutoField(primary_key=True)
    tipo_excursion = models.BooleanField()
    id_asignatura = models.ForeignKey(Asignatura, models.DO_NOTHING, db_column='id_asignatura')
    id_profesor = models.ForeignKey('Profesor', models.DO_NOTHING, db_column='id_profesor')
    destino = models.CharField(max_length=255)
    objetivo = models.CharField(max_length=255)
    evidencias = models.CharField()
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()

    class Meta:
        managed = False
        db_table = 'excursion'


class FaseProyecto(models.Model):
    id_fase_proyecto = models.AutoField(primary_key=True)
    fase = models.CharField(max_length=30)

    def __str__(self):
        return self.fase

    class Meta:
        managed = False
        db_table = 'fase_proyecto'


class GradoAcademico(models.Model):
    id_grado_academico = models.AutoField(primary_key=True)
    grado_academico = models.CharField(max_length=255)

    def __str__(self):
        return self.grado_academico
    
    class Meta:
        managed = False
        db_table = 'grado_academico'


class GradoAsesoria(models.Model):
    id_grado_asesoria = models.AutoField(primary_key=True)
    grado = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'grado_asesoria'


class Idioma(models.Model):
    id_idioma = models.AutoField(primary_key=True)
    estudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='estudiante')
    idioma = models.CharField(max_length=255)
    nivel = models.CharField(max_length=35)
    acreditado = models.BooleanField()
    asesorias = models.BooleanField()
    certificacion = models.CharField(max_length=60)
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()

    class Meta:
        managed = True
        db_table = 'idioma'


class Investigacion(models.Model):
    id_investigacion = models.AutoField(primary_key=True)
    tipo_producto = models.ForeignKey('TipoProducto', models.DO_NOTHING, db_column='tipo_producto')
    isbn = models.CharField(max_length=255)
    objeto_estudio = models.CharField(max_length=255)
    fecha_publicacion = models.DateField()
    numero_edicion = models.CharField(max_length=255)
    lugar_publicacion = models.CharField(max_length=255)
    nombre_institucion = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'investigacion'


class NombreTaller(models.Model):
    id_nombre_taller = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=40)
    class Meta:
        managed = True
        db_table = 'nombre_taller'


class Pais(models.Model):
    id_pais = models.AutoField(primary_key=True)
    nombre_pais = models.CharField(max_length=255)

    class Meta:
        managed = True
        db_table = 'pais'


class PlanAcad(models.Model):
    id_plan_acad = models.AutoField(primary_key=True)
    id_pro_edu = models.ForeignKey('ProEdu', models.DO_NOTHING, db_column='id_pro_edu')
    nombre_plan_acad = models.CharField(max_length=30)

    class Meta:
        managed = True
        db_table = 'plan_acad'


class PracticaProf(models.Model):
    id_practica_prof = models.AutoField(primary_key=True)
    id_estudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='id_estudiante')
    num_practica = models.IntegerField()
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()
    empresa = models.CharField(max_length=255)
    telefon_empresa = models.CharField(max_length=15)
    contratado = models.BooleanField()

    class Meta:
        managed = True
        db_table = 'practica_prof'


class ProEdu(models.Model):
    id_pro_edu = models.AutoField(primary_key=True)
    nombre_pro_edu = models.CharField(max_length=60)

    class Meta:
        managed = True
        db_table = 'pro_edu'


class Profesor(models.Model):
    id_profesor = models.AutoField(primary_key=True)
    nombre_profesor = models.CharField(max_length=30)
    apellido_pat_profesor = models.CharField(max_length=30)
    apellido_mat_profesor = models.CharField(max_length=30)
    correo_profesor = models.CharField(max_length=50)
    id_grado_academico = models.ForeignKey('GradoAcademico',models.DO_NOTHING,db_column='id_grado_academico')
    id_programa_educativo = models.ForeignKey('ProEdu', models.DO_NOTHING, db_column='id_programa_educativo')
    id_departamento = models.ForeignKey('Departamento', models.DO_NOTHING, db_column='id_departamento')
    jefe_departamento = models.BooleanField()
    id_tipo_profesor = models.CharField(max_length=25)
    activo = models.BooleanField()
    sexo = models.CharField(max_length=30)
    
    def __str__(self):
        return self.nombre_profesor

    class Meta:
        managed = True
        db_table = 'profesor'

class InformacionAdicional(models.Model):
    id_informacion_adicional = models.AutoField(primary_key=True)
    id_profesor = models.ForeignKey('Profesor', models.CASCADE, db_column='id_profesor', related_name='informacion_adicional')
    perfil_prodep = models.BooleanField(default=False)
    vigencia_prodep = models.CharField(max_length=50, blank=True, null=True)
    miembro_snii_seii = models.BooleanField(default=False)
    nivel_snii_seii = models.CharField(max_length=10, blank=True, null=True)
    anio_ingreso_snii_seii = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'informacion_adicional'

class Estudios(models.Model):
    id_estudios = models.AutoField(primary_key=True)
    id_profesor = models.ForeignKey('Profesor', models.CASCADE, db_column='id_profesor', related_name='estudios')
    grado_actual = models.CharField(max_length=255)
    grado_estudiando = models.CharField(max_length=255)
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()
    nombre_institucion = models.CharField(max_length=255)
    nombre_institucion_est = models.CharField(max_length=255)
    fecha_inicio_est = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'estudios'

class ProfesorEstancia(models.Model):
    id_estancia = models.OneToOneField(Estancia, models.DO_NOTHING, db_column='id_estancia', primary_key=True)
    id_profesor = models.ForeignKey(Profesor, models.DO_NOTHING, db_column='id_profesor')
    id_tipo_institucion = models.CharField(max_length=255)
    motivo = models.CharField(max_length=255)
    objetivo = models.CharField(max_length=255)
    resultados = models.CharField(max_length=255)
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()

    class Meta:
        managed = False
        db_table = 'profesor_estancia'


class ProfesorInvestigacion(models.Model):
    id_investigacion = models.OneToOneField(Investigacion, models.DO_NOTHING, db_column='id_investigacion', primary_key=True)
    id_profesor = models.ForeignKey(Profesor, models.DO_NOTHING, db_column='id_profesor')
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()

    class Meta:
        managed = False
        db_table = 'profesor_investigacion'


class ProfesorProyecto(models.Model):
    id_proyecto = models.OneToOneField('Proyecto', models.DO_NOTHING, db_column='id_proyecto', primary_key=True)
    id_profesor = models.ForeignKey(Profesor, models.DO_NOTHING, db_column='id_profesor')
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()

    class Meta:
        managed = False
        db_table = 'profesor_proyecto'


class Proyecto(models.Model):
    id_proyecto = models.AutoField(primary_key=True)
    nombre_proyecto = models.CharField(max_length=255)
    tipo_proyecto = models.ForeignKey('TipoProyecto', models.DO_NOTHING, db_column='tipo_proyecto')
    objetivo = models.CharField(max_length=255)
    etapa = models.CharField(max_length=255)
    financiamiento = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'proyecto'


class ServicioSocial(models.Model):
    id_servicio = models.AutoField(primary_key=True)
    id_estudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='id_estudiante')
    id_estado = models.ForeignKey(EstadoServicio, models.DO_NOTHING, db_column='id_estado')
    tipo_proyecto = models.BooleanField()
    clase_proyecto = models.CharField(max_length=40)
    nombre_proyecto = models.CharField(max_length=255)
    beneficiarios = models.CharField(max_length=255)
    evidencias = models.BinaryField()
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()
    horas_acreditadas = models.IntegerField()
    horas_pendientes = models.IntegerField()
    horas_proyecto = models.IntegerField()
    fecha_ultimo_reporte = models.DateField()

    class Meta:
        managed = True
        db_table = 'servicio_social'


class Situacion(models.Model):
    id_situacion = models.AutoField(primary_key=True)
    situacion = models.CharField(max_length=30)

    class Meta:
        managed = True
        db_table = 'situacion'


class Taller(models.Model):
    id_taller = models.AutoField(primary_key=True)
    id_estudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='id_estudiante')
    tipo_taller = models.BooleanField()
    id_nombre_taller = models.ForeignKey(NombreTaller, models.DO_NOTHING, db_column='id_nombre_taller')
    representante = models.BooleanField()
    selectivo = models.BooleanField()
    acreditado = models.BooleanField()
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()
    club = models.CharField(max_length=255)

    class Meta:
        managed = True
        db_table = 'taller'


class TipoCapacitacion(models.Model):
    id_tipo_capacitacion = models.AutoField(primary_key=True)
    tipo = models.CharField(max_length=15)

    class Meta:
        managed = False
        db_table = 'tipo_capacitacion'


class TipoEstancia(models.Model):
    id_tipo_estancia = models.AutoField(primary_key=True)
    tipo_estancia = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'tipo_estancia'


class TipoEvento(models.Model):
    id_tipo_evento = models.AutoField(primary_key=True)
    tipo_evento = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'tipo_evento'


class TipoIngreso(models.Model):
    id_tipo_ingreso = models.AutoField(primary_key=True)
    ingreso = models.CharField(max_length=255)

    class Meta:
        managed = True
        db_table = 'tipo_ingreso'


class TipoProducto(models.Model):
    id_tipo_producto = models.AutoField(primary_key=True)
    tipo_producto = models.CharField(max_length=255)

    def __str__(self):
        return self.tipo_producto
    
    class Meta:
        managed = False
        db_table = 'tipo_producto'


class TipoProfesor(models.Model):
    id_tipo_profesor = models.AutoField(primary_key=True)
    tipo_profesor = models.CharField(max_length=255)

    def __str__(self):
        return str(self.tipo_profesor)

    class Meta:
        managed = False
        db_table = 'tipo_profesor'

class TipoProyecto(models.Model):
    id_tipo_proyecto = models.AutoField(primary_key=True)
    tipo = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'tipo_proyecto'


class Tipousuarios(models.Model):
    id_tipo_usuario = models.AutoField(primary_key=True)
    tipo = models.CharField(max_length=255)

    class Meta:
        managed = True
        db_table = 'tipousuarios'


class Tutoria(models.Model):
    id_tutoria = models.AutoField(primary_key=True)
    tipo_tutoria = models.BooleanField()
    id_profesor = models.ForeignKey(Profesor, models.DO_NOTHING, db_column='id_profesor')
    id_estudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='id_estudiante')
    carta_asignacion = models.BinaryField()
    motivo_tutoria = models.CharField(max_length=255)
    atencion_seguimiento = models.CharField(max_length=255)
    evidencia = models.BinaryField()
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()

    class Meta:
        managed = True
        db_table = 'tutoria'


class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nombre_usuario = models.CharField(max_length=30)
    apellido_pat_usuario = models.CharField(max_length=30)
    apellido_mat_usuario = models.CharField(max_length=30)
    correo_usuario = models.CharField(max_length=40, unique=True)  # Cambiado a unique
    id_contrasena = models.ForeignKey('Contrasena', on_delete=models.DO_NOTHING, db_column='id_contrasena', blank=True, null=True)
    id_tipo_usuario = models.ForeignKey('Tipousuarios', on_delete=models.DO_NOTHING, db_column='id_tipo_usuario')
    id_departamento = models.ForeignKey('Departamento', on_delete=models.DO_NOTHING, db_column='id_departamento')
    
    def __str__(self):
        return self.nombre_usuario

    class Meta:
        managed: True
        db_table = 'usuario'  # Mantén el nombre de tabla original si es necesario



class VinculacionAcad(models.Model):
    id_vinculacion_acad = models.AutoField(primary_key=True)
    id_estudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='id_estudiante')
    institucion = models.CharField(max_length=255)
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()
    acreditado = models.BooleanField()
    beca = models.BooleanField()
    nombre_beca = models.CharField(max_length=255)
    tipo_vinculacion = models.BooleanField()
    huesped = models.BooleanField()
    id_ciudad = models.ForeignKey(Ciudad, models.DO_NOTHING, db_column='id_ciudad')

    class Meta:
        managed = True
        db_table = 'vinculacion_acad'

class PerfilAcademico(models.Model):
    id_profesor = models.OneToOneField('Profesor', on_delete=models.CASCADE, db_column='id_profesor')

    perfil_prodep = models.BooleanField(default=False)
    vigencia_prodep = models.CharField(max_length=50, blank=True, null=True)

    miembro_snii = models.BooleanField(default=False)
    nivel_snii = models.CharField(max_length=10, blank=True, null=True)
    año_ingreso_snii = models.IntegerField(blank=True, null=True)

    miembro_seii = models.BooleanField(default=False)
    nivel_seii = models.CharField(max_length=10, blank=True, null=True)
    año_ingreso_seii = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'perfil_academico'

    def __str__(self):
        return f"Perfil Académico de {self.id_profesor}"
    
class Sexo(models.Model):
    id_sexo = models.AutoField(primary_key=True)
    nombre_sexo = models.CharField(max_length=20, unique=True)
    
    def __str__(self):
        return self.nombre_sexo

    class Meta:
        managed = False
        db_table = 'sexo'

class FormacionIntegralEvento(models.Model):
    id_formacion_integral_evento = models.AutoField(primary_key=True)
    fecha_evento = models.DateField()
    fecha_final = models.DateField()
    nombre_evento = models.CharField(max_length=255)
    sede = models.CharField(max_length=255)
    objetivo = models.CharField(max_length=255)
    num_estudiantes = models.IntegerField()
    num_profesores = models.IntegerField()
    departamento_academico = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'formacion_integral_evento'

class ActividadVinculacion(models.Model):
    id_actividad_vinculacion = models.AutoField(primary_key=True)
    institucion_vinculada = models.CharField(max_length=255)
    objetivo_actividad = models.CharField(max_length=255)
    descripcion_actividad = models.CharField(max_length=255)
    fecha_vinculacion = models.DateField()
    fecha_final = models.DateField()
    resultado_vinculacion = models.CharField(max_length=255)
    id_profesor = models.ForeignKey('Profesor', models.DO_NOTHING, db_column='id_profesor')
    departamento_academico = models.CharField(max_length=255)
    

    class Meta:
        managed = False
        db_table = 'actividad_vinculacion'

class ProyectoTesis(models.Model):
    id_proyecto_tesis = models.AutoField(primary_key=True)
    nombre_proyecto = models.CharField(max_length=255)
    estudiantes_participantes = models.CharField(max_length=255)
    id_profesor = models.ForeignKey('Profesor', models.DO_NOTHING, db_column='id_profesor')
    id_fase_proyecto = models.ForeignKey('FaseProyecto', models.DO_NOTHING, db_column='id_fase_proyecto')
    departamento_academico = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'proyecto_tesis'

class FormularioCapacitacion(models.Model):
    id_formulario_capacitacion = models.AutoField(primary_key=True)
    id_profesor = models.ForeignKey('Profesor', models.DO_NOTHING, db_column='id_profesor')
    evento = models.CharField(max_length=255)
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()
    sede = models.CharField(max_length=255)
    organizador = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'formulario_capacitacion'

class ProyectoInvestigacion(models.Model):
    id_proyecto_investigacion = models.AutoField(primary_key=True)
    participantes = models.ForeignKey('Profesor', on_delete=models.DO_NOTHING, db_column='participantes')
    nombre_proyecto = models.CharField(max_length=255)
    objetivo = models.CharField(max_length=255)
    institucion_colaboradora = models.CharField(max_length=255)
    resultados_impactos = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'proyecto_investigacion'

class ProductoInvestigacion(models.Model):
    id_producto_investigacion = models.AutoField(primary_key=True)
    id_profesor = models.ForeignKey('Profesor', on_delete=models.DO_NOTHING, db_column='id_profesor')
    id_tipo_producto = models.ForeignKey('TipoProducto', on_delete=models.DO_NOTHING, db_column='id_tipo_producto')
    anio_periodo = models.CharField(max_length=255)
    nombre_producto = models.CharField(max_length=255)
    editorial = models.CharField(max_length=255)
    isbn = models.CharField(max_length=255)
    objeto_estudio = models.CharField(max_length=255)
    fecha_publicacion = models.DateField()
    numero_edicion = models.CharField(max_length=255)
    lugar_publicacion = models.CharField(max_length=255)
    institucion_colaboradora = models.CharField(max_length=255)
    hipervinculo_contrato = models.CharField(max_length=255)
    recurso_publico = models.CharField(max_length=255)
    recurso_privado = models.CharField(max_length=255)
    url_publicacion = models.CharField(max_length=255)
    justificacion_sin_isbn = models.CharField(max_length=255)
    nombre_revista = models.CharField(max_length=255)
    numero_revista = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'producto_investigacion'
        
class HistorialSituacion(models.Model):
    id_historial= models.AutoField(primary_key=True)
    id_estudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='id_estudiante')
    id_situacion = models.ForeignKey(Situacion, models.DO_NOTHING, db_column='id_situacion')
    fecha_situacion = models.DateField()

    class Meta:
        managed: True
        db_table = "historial_situacion"

class HistorialEstatus(models.Model):
    id_historial_estatus = models.AutoField(primary_key=True)
    id_estudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='id_estudiante')
    id_estatus = models.ForeignKey(Estatus, models.DO_NOTHING, db_column='id_estatus')
    fecha_estatus = models.DateField()
    class Meta:
        managed: True
        db_table = "historial_estatus"