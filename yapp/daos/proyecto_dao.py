
'''
Created on Mar 31, 2012

@author: arturo
'''
from yapp.daos.base_dao import BaseDAO
from yapp.models.proyecto.proyecto import Proyecto
from yapp.models.roles.rol import Rol
from yapp.models.roles.rol_final import RolFinal
class ProyectoDAO(BaseDAO):
    def get_clase(self):
        return Proyecto

