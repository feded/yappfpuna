'''
Created on Mar 31, 2012

@author: arturo
'''
from yapp.daos.base_dao import BaseDAO
from yapp.models.roles.rol import Rol
class RolDAO(BaseDAO):
    def get_clase(self):
        return Rol;
