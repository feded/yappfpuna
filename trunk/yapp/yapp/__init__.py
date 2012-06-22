from .models import DBSession
from pyramid.authentication import AuthTktAuthenticationPolicy
from pyramid.authorization import ACLAuthorizationPolicy
from pyramid.config import Configurator
from pyramid.session import UnencryptedCookieSessionFactoryConfig
from sqlalchemy import engine_from_config
from yapp.security import groupfinder
from pyramid_mailer.mailer import Mailer
import os
import vistas.proyectos
import vistas.privilegios
import vistas.roles
import vistas.fases
import vistas.recursos
import vistas.unidadtrabajo
import vistas.permisos



here = os.path.dirname(os.path.abspath(__file__))

def main(global_config, **settings):
    
    authn_policy = AuthTktAuthenticationPolicy(
        'sosecret', callback=groupfinder)
    authz_policy = ACLAuthorizationPolicy()
    
    
    """ This function returns a Pyramid WSGI application.
    """
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    my_session_factory = UnencryptedCookieSessionFactoryConfig('itsaseekreet')
    config = Configurator(settings=settings,
                          root_factory='yapp.models.root_factory.RootFactory',
                          session_factory=my_session_factory)
    config.set_authentication_policy(authn_policy)
    config.set_authorization_policy(authz_policy)
    
    mailer = Mailer()
    config.registry['mailer'] = Mailer.from_settings(settings)
    config.add_static_view('static', os.path.join(here, 'static'))
    config.add_route('login', '/')
#    config.add_route('index', '/index')
    config.add_route('readproyectos', '/readProyectos')
    config.add_route('createproyectos', '/createProyectos')
    config.add_route('updateproyectos', '/updateProyectos/{id}')
    config.add_route('deleteproyectos', '/deleteProyectos/{id}')
    config.add_route('obtenercrearfases', '/fases')
    config.add_route('actualizareliminarfases', '/fases/{id}')
    config.add_route('obtenercrearatributofase', '/atributofase')
    config.add_route('actualizareliminaratributofase', '/atributofase/{id}')
    config.add_route('obtenercreartipofase', '/tipofase')
    config.add_route('eliminartipofase', '/tipofase/{id}')
    config.add_route('obtenercrearrecursos', '/recursos')
    config.add_route('actualizareliminarrecursos', '/recursos/{id}')
    config.add_route('obtenercrearunidadtrabajo', '/unidadtrabajo')
    config.add_route('actualizareliminarunidadtrabajo', '/unidadtrabajo/{id}')
    config.add_route('obtenertrabajorecurso', '/unidadtrabajorecurso')
    config.add_route('asignarrecursos', '/asignarRecursos')
    config.add_route('tipos_recursos', '/tipo_recurso')
    config.add_route('logout', '/logout')
    config.add_route('crearProyecto', '/crearProyecto')
 
    config.add_route('roles', '/roles/{id_rol}')
    config.add_route('estados_roles', '/roles_estados')
    config.add_route('obtenerTipos', '/obtenerTipos')
    config.add_route('crearTipo', '/crearTipo')
    config.add_route('eliminarTipo', '/eliminarTipo/{id}')
    config.add_route('guardarTipo', '/guardarTipo/{id}')
    config.add_route('importarTipo', '/importarTipos')
    config.add_route('crearListarAtributos', '/atributoItem')
    config.add_route('editarEliminarAtributos', '/atributoItem/{id}')
    config.add_route('crearListarItems', '/item')
    config.add_route('editarEliminarItems', '/item/{id}')
    config.add_route('crearAtributo', '/crearAtributo')
    config.add_route('eliminarAtributo', '/eliminarAtributo')
    config.add_route('guardarAtributo', '/guardarAtributo')
    config.add_route('entidades_padre', '/entidades_padre/{id_entidad}')
    config.add_route('suscripciones', '/suscripciones/{id_suscripcion}')
    config.add_route('crearListarEsquemas', '/esquemas')
    config.add_route('editarEliminarEsquemas', '/esquemas/{id}')
    config.add_route('crearListarAtributosEsquemas', '/atributosEsquemas')
    config.add_route('editarEliminarAtributosEsquemas', '/atributosEsquemas/{id}')
    config.add_route('rolPrivilegios', '/rolPrivilegios/{id}')
    config.add_route('crearListarItemEsquemas', '/itemsEsquemas')
    config.add_route('editarEliminarItemEsquemas', '/itemsEsquemas/{id}')
    config.add_route('rolesfinales', '/rolesfinales/')
    config.add_route('notificaciones', '/notificaciones/')
    config.add_route('calculo_impacto', '/calculo_impacto')
    config.add_route('asignarUnidadItem' , '/unidadItem')
    config.add_route('editarUnidadItem' , '/unidadItem/{id}')
    
    config.add_route('asignarAtributoItem' , '/itemAtributo')
    config.add_route('editarAtributoItem' , '/itemAtributo/{id}')
    
    config.add_route('adjuntar' , '/adjuntar')
    
    #rutas volpe
    config.add_route('crearRol', '/crearRol')
    config.add_route('rol_privilegios', '/rol_privilegios/{id_privilegio}')
    config.add_route('privilegios', '/privilegios')
    
    #rutas Volpe 5 iteracion
    config.add_route('lineas_base', '/lineas_base')
    config.add_route('lineas_base_rest', '/lineas_base/{id}')
    #rutas Volpe 6 iteracion
    config.add_route('gantt', '/gantt')
    config.add_route('permisos', '/permisos')
    config.add_route('rol_permisos', '/rol_permisos')
    config.add_route('rol_permisos_rest', '/rol_permisos/{id}')
    
    config.scan()
#    config.scan("views")

    return config.make_wsgi_app()


