from .models import DBSession
from pyramid.config import Configurator
from sqlalchemy import engine_from_config
import os


here = os.path.dirname(os.path.abspath(__file__))

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    config = Configurator(settings=settings)
#    config.add_static_view('static', 'static', cache_max_age=3600)
#    config.add_route('home', '/')
    config.add_static_view('static', os.path.join(here, 'static'))
    config.add_route('main', '/main')
    config.add_route('login', '/')
    config.add_route('login', '/login')
    config.add_route('crearProyecto', '/crearProyecto')
    config.add_route('crearRol', '/crearRol')
    config.scan()
#    config.scan("views")
    return config.make_wsgi_app()

