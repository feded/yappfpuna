'''
Created on Apr 7, 2012

@author: arturo
'''
from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.security import forget
from pyramid.view import view_config
from yapp.daos.proyecto_dao import ProyectoDAO
import json

@view_config(route_name='proyectos')
def get_proyectos(request):
    print request.method;
#    print request.json_body;
    if (request.method == 'GET'):
        rd = ProyectoDAO()
        entidades = rd.get_all()
        lista = [];
        p = Pickler()
        for entidad in entidades:
            lista.append(p.flatten(entidad))
            
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'proyectos':j_string})
        return Response(a_ret)

#@view_config(route_name='estados_roles')
#def get_estado_roles(request):
#    if (request.method == 'GET'):
#        re = RolEstadoDAO()
#        entidades = re.get_query().all()
#        lista = [];
#        p = Pickler(False, None)
#        for entidad in entidades:
#            lista.append(p.flatten(entidad))
#            
#        j_string = p.flatten(lista)
#        a_ret = json.dumps({'sucess': 'true', 'estados':j_string})
#        print a_ret
#        return Response(a_ret)
        
    
#
#        
#def info(var):
#    print "----CLASE----"
#    print var.__class__
#    print "---METODOS---"
#    print dir (var)
#    print "--ATRIBUTOS--"
#    print var
#    print "-------------"
