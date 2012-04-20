from yapp.daos.base_dao import BaseDAO
from yapp.models.tipo_item.tipo_item import TipoItem 
class TipoItemDAO(BaseDAO):
    def get_clase(self):
        return TipoItem