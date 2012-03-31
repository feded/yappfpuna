from yapp.daos.base_dao import BaseDAO
from yapp.models.roles.rol_final import RolFinal

class RolFinalDAO(BaseDAO):
    def get_clase(self):
        return RolFinal;
