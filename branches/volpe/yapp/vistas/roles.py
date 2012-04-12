'''
Created on Apr 7, 2012

@author: arturo
'''
from jsonpickle.pickler import Pickler
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.security import forget
from pyramid.view import view_config
from yapp.daos.rol_dao import RolFinalDAO
import json

@view_config(route_name='roles')
def get_roles(request):
    if (request.method == 'GET'):
        rd = RolFinalDAO()
        entidades = rd.get_query().all()
        lista = [];
        p = Pickler(False, None)
        for entidad in entidades:
            lista.append(p.flatten(entidad))
            
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'users':j_string})
        print a_ret
        return Response(a_ret)
    if (request.method == 'POST'):
        info(request)
        info(request.POST)
        info(request.GET)
        print "------"
        print request.json_body
        return Response(json.dumps({"sucess": True}))


    
#class RolesLindos:
#    def __init__(self, ide, name, email, esFinal):
#        self.id = ide;
#        self.name = name;
#        self.email = email;
#        self.esFinal = esFinal;
        
def info(var):
    print "----CLASE----"
    print var.__class__
    print "---METODOS---"
    print dir (var)
    print "--ATRIBUTOS--"
    print var
    print "-------------"