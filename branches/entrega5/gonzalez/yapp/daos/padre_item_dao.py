from yapp.daos.base_dao import BaseDAO
from yapp.models.item.padre_item import PadreItem

class PadreItemDAO(BaseDAO):
    def get_clase(self):
        return PadreItem

