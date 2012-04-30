from yapp.daos.base_dao import BaseDAO
from yapp.models.recurso.recurso import Recurso

class RecursoDAO(BaseDAO):
    def get_clase(self):
        return Recurso