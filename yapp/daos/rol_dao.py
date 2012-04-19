'''
Created on Mar 31, 2012

@author: arturo
'''
from yapp.daos.base_dao import BaseDAO
from yapp.models.roles.rol import Rol
from yapp.models.roles.rol_final import RolFinal
from yapp.models.roles.rol_estado import RolEstado
class RolDAO(BaseDAO):
    def get_clase(self):
        return Rol

class RolFinalDAO(BaseDAO):
    def get_clase(self):
        return RolFinal
    
class RolEstadoDAO(BaseDAO):
    def get_clase(self):
        return RolEstado