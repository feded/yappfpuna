from pyramid.view import view_config

#Ponemos nuestros View callables

@view_config(route_name='main',renderer="templates/main.pt")
def main_view(self):
    return {}

@view_config(context='pyramid.exceptions.NotFound',
             renderer='templates/notFound.pt')
def notfound_view(self):
    return {}

@view_config(route_name='crearProyecto',renderer="templates/crearProyecto.pt")
def crearProyecto_view(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        autor = request.POST.get('autor') 
        print autor + ' creo el proyecto ' + nombre
        
    return {}