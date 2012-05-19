from yapp.daos.base_dao import BaseDAO
from yapp.models.roles.permisos import Permisos

class PermisosDAO(BaseDAO):
    def get_clase(self):
        return Permisos