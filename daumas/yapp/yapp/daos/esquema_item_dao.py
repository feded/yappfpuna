from yapp.daos.base_dao import BaseDAO
from yapp.models.esquema.esquema_item import EsquemaItem

class EsquemaItemDAO(BaseDAO):
    def get_clase(self):
        return EsquemaItem