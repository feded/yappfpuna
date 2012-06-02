'''
Created on May 4, 2012

@author: arturo
'''
from yapp.daos.base_dao import BaseDAO
from yapp.models.roles.entidad import Entidad
class EntidadDAO(BaseDAO):
    def get_clase(self):
        return Entidad