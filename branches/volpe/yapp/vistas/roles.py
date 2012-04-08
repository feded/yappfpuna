'''
Created on Apr 7, 2012

@author: arturo
'''
from pickle import Pickler
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
        for entidad in entidades:
            lista.append(RolesLindos(entidad._id, entidad._nombre, entidad._email))
            
        p = Pickler(False, None)
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


    
class RolesLindos:
    def __init__(self, ide, name, email):
        self.id = ide;
        self.name = name;
        self.email = email;
        
def info(var):
    print "----CLASE----"
    print var.__class__
    print "---METODOS---"
    print dir (var)
    print "--ATRIBUTOS--"
    print var
    print "-------------"