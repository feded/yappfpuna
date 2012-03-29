import os

from wsgiref.simple_server import make_server
from pyramid.config import Configurator

#obtenemos la ubicacion de nuestro proyecto
here = os.path.dirname(os.path.abspath(__file__))

def main():
    #configuramos el registro de la aplicacion
    config = Configurator()
    config.add_route('main', '/main')
    config.add_route('crearProyecto', '/crearProyecto')
    config.add_static_view('static', os.path.join(here, 'static'))
    #scaneamos views.py por objetos marcados con @view_config
    config.scan("views")
    #comiteamos sentencias de configuracion pendiente, mandamos el 
    #evento ApplicationCreated a los listeners, agregamos la configuracion y
    #creamos una aplicacion WSGI
    app = config.make_wsgi_app()
    return app

if __name__ == '__main__':
    app = main()
    server = make_server('0.0.0.0', 8080, app) 
    #hacemos correr nuestro servidor
    server.serve_forever()