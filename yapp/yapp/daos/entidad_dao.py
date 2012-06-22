'''
Created on May 4, 2012

@author: arturo
'''
from yapp.daos.base_dao import BaseDAO
from yapp.models.roles.privilegio import Privilegio
class PrivilegioDAO(BaseDAO):
    def get_clase(self):
        return Privilegio