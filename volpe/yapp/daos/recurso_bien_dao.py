from yapp.daos.base_dao import BaseDAO
from yapp.models.recurso.recurso_bien import RecursoBien

class RecursoBienDAO(BaseDAO):
    def get_clase(self):
        return RecursoBien;