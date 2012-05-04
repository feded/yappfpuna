from yapp.daos.base_dao import BaseDAO
from yapp.models.recurso.recurso import Recurso
from yapp.models.recurso.tipo_recurso import TipoRecurso

class RecursoDAO(BaseDAO):
    def get_clase(self):
        return Recurso

class TipoRecursoDAO(BaseDAO):
    def get_clase(self):
        return TipoRecurso