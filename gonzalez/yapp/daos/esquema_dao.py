from yapp.daos.base_dao import BaseDAO
from yapp.models.esquema.esquema import Esquema

class EsquemaDAO(BaseDAO):
    def get_clase(self):
        return Esquema