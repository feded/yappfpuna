from yapp.daos.base_dao import BaseDAO
from yapp.models.item.archivo import Archivo

class ArchivoDAO(BaseDAO):
    def get_clase(self):
        return Archivo