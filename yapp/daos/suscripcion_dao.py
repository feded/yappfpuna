'''
Created on Apr 21, 2012

@author: arturo
'''
from yapp.daos.base_dao import BaseDAO
from yapp.models.suscripcion.suscripcion import Suscripcion

class SuscripcionDAO(BaseDAO):
    def get_clase(self):
        return Suscripcion