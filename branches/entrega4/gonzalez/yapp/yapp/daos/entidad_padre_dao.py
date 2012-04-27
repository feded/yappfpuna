'''
Created on Apr 21, 2012

@author: arturo
'''
from yapp.daos.base_dao import BaseDAO
from yapp.models.entidad_padre import EntidadPadre

class EntidadPadreDAO(BaseDAO):
    def get_clase(self):
        return EntidadPadre