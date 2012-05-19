from yapp.daos.base_dao import BaseDAO
from yapp.models.esquema.atributo_esquema import AtributoEsquema

class AtributoEsquemaDAO(BaseDAO):
    def get_clase(self):
        return AtributoEsquema