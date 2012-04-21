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
from yapp.models.roles.rol import Rol
from yapp.models.roles.rol_estado import RolEstado
from yapp.models.roles.rol_final import RolFinal
import json

#@view_config(route_name='suscripciones')
def get_suscripciones(request):
    return {}
        

    
def info(var):
    print "----CLASE----"
    print var.__class__
    print "---METODOS---"
    print dir (var)
    print "--ATRIBUTOS--"
    print var
    print "-------------"

