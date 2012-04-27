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
                          session_factory = my_session_factory)
    config.set_authentication_policy(authn_policy)
    config.set_authorization_policy(authz_policy)
    
    mailer = Mailer()
    config.registry['mailer'] = Mailer.from_settings(settings)
    config.add_static_view('static', os.path.join(here, 'static'))
    config.add_route('login', '/')
    config.add_route('index', '/index')
    config.add_route('readproyectos', '/readProyectos')
    config.add_route('createproyectos', '/createProyectos')
    config.add_route('updateproyectos', '/updateProyectos')
    config.add_route('deleteproyectos', '/deleteProyectos')
    config.add_route('readfases', '/readFases')
    config.add_route('createfases', '/createFases')
    config.add_route('logout', '/logout')
    config.add_route('crearProyecto', '/crearProyecto')
    config.add_route('crearRol', '/crearRol')
    config.add_route('privilegios', '/privilegios/{id_privilegio}')
    config.add_route('entidades', '/entidades')
    config.add_route('roles', '/roles/{id_rol}')
    config.add_route('estados_roles', '/roles_estados')
    config.add_route('obtenerTipos', '/obtenerTipos')
    config.add_route('crearTipo', '/crearTipo')
    config.add_route('eliminarTipo', '/eliminarTipo')
    config.add_route('guardarTipo', '/guardarTipo')
    config.add_route('obtenerAtributos', '/atributoItem/lista')
    config.add_route('crearAtributo', '/crearAtributo')
    config.add_route('eliminarAtributo', '/eliminarAtributo')
    config.add_route('guardarAtributo', '/guardarAtributo')
    config.add_route('entidades_padre','/entidades_padre')
    config.add_route('suscripciones','/suscripciones/{id_suscripcion}')
    config.scan()
#    config.scan("views")

    return config.make_wsgi_app()


