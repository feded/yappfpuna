from .models import DBSession
from pyramid_mailer.mailer import Mailer
from pyramid.session import UnencryptedCookieSessionFactoryConfig
from pyramid.authentication import AuthTktAuthenticationPolicy
from pyramid.authorization import ACLAuthorizationPolicy
from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from yapp.security import groupfinder
import os



here = os.path.dirname(os.path.abspath(__file__))

def main(global_config, **settings):
    
    authn_policy = AuthTktAuthenticationPolicy(
        'sosecret', callback=groupfinder)
    authz_policy = ACLAuthorizationPolicy()
    
    
    """ This function returns a Pyramid WSGI application.
    """
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    mailer = Mailer()
    my_session_factory = UnencryptedCookieSessionFactoryConfig('itsaseekreet')
    config = Configurator(settings=settings,
                          root_factory='yapp.models.root_factory.RootFactory', 
                          session_factory = my_session_factory)
    config.set_authentication_policy(authn_policy)
    config.set_authorization_policy(authz_policy)
    
    config.registry['mailer'] = Mailer.from_settings(settings)
    
    
#    config.add_static_view('static', 'static', cache_max_age=3600)
#    config.add_route('home', '/')
    config.add_static_view('static', os.path.join(here, 'static'))
    config.add_route('main', '/main')
    config.add_route('login', '/login')
    config.add_route('logout', '/logout')
    config.add_route('crearProyecto', '/crearProyecto')
    config.add_route('crearRol', '/crearRol')
    config.scan()
#    config.scan("views")

    return config.make_wsgi_app()


