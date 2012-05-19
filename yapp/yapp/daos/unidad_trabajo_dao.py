from yapp.daos.base_dao import BaseDAO
from yapp.models.unidad_trabajo.unidad_trabajo import UnidadTrabajo

class UnidadTrabajoDAO(BaseDAO):
    def get_clase(self):
        return UnidadTrabajo