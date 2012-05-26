'''
Created on May 18, 2012

@author: arturo
'''
from yapp.daos.base_dao import BaseDAO
from yapp.models.linea_base.linea_base import LineaBase

class LineaBaseDAO(BaseDAO):
    def get_clase(self):
        return LineaBase