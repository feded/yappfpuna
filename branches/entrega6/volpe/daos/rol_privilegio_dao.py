from yapp.daos.base_dao import BaseDAO
from yapp.models.roles.rol_privilegio import RolPrivilegio
class RolPrivilegioDAO(BaseDAO):
    def get_clase(self):
        return RolPrivilegio

