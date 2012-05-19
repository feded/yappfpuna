from yapp.daos.base_dao import BaseDAO
from yapp.models.roles.permisos_roles import PermisosRoles

class PermisosRolesDAO(BaseDAO):
    def get_clase(self):
        return PermisosRoles