from yapp.daos.base_dao import BaseDAO
from yapp.models.unidad_trabajo.unidad_trabajo_recurso import UnidadTrabajo_Recurso

class UnidadTrabajoRecursoDAO(BaseDAO):
    def get_clase(self):
        return UnidadTrabajo_Recurso